import React, { useEffect, useState } from 'react'
import { Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { CardsAPI } from '../../api/cards'
import { organizationsAPI } from '../../api/organizations'
import PaginationButtons from '../common/PaginationButtons'
import AddNewCard from './AddNewCard'
import ListCard from './ListCard'
import { Organization } from '../../stores/baseStore'

const PAGE_SIZE = 6 * 4 - 1

const ListOfCards = () => {
    // todo: add page query
    const [cards, setCards] = useState({ results: [], total: 0 })
    const [page, setPage] = useState(0)
    const [organizations, setOrganizations] = useState<Organization[]>([])
    const [currentOrganization, setCurrentOrganization] = useState<string | number>('any')

    useEffect(() => {
        organizationsAPI
            .getOrganizations()
            .then((res) => setOrganizations(res.data))
            .catch((error) => console.error(error))
    }, [])

    useEffect(() => {
        if (currentOrganization === 'any') {
            CardsAPI.getCardsList({ offset: page * PAGE_SIZE, limit: PAGE_SIZE })
                .then((res) => {
                    setCards(res.data), console.log(res, 'res')
                })
                .catch((error) => console.log(error))
        } else if (!Number.isNaN(currentOrganization)) {
            CardsAPI.getCardsByOrganizationId({ offset: page * PAGE_SIZE, limit: PAGE_SIZE }, +currentOrganization)
                .then((res) => setCards(res.data))
                .catch((error) => console.error(error))
        }
    }, [currentOrganization, page])

    const intl = useIntl()

    return (
        <Container>
            <Row xs={1} sm={3} md={4} lg={8} xl={10} className="mb-3">
                <Form.Select onChange={(e) => setCurrentOrganization(e.target.value)}>
                    <option value="any">{intl.formatMessage({ id: 'allOrganizations' })}</option>
                    {organizations.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </Form.Select>
            </Row>
            <Row xs={1} sm={3} md={4} lg={5} xl={6} className="g-2">
                <Col>
                    <AddNewCard />
                </Col>
                {cards.results.map(({ id, name, isFilled }) => (
                    <Col key={id}>
                        <ListCard id={id} name={name} isFilled={isFilled} />
                    </Col>
                ))}
            </Row>
            <Row>
                <Col className="d-flex justify-content-center mt-3">
                    <PaginationButtons page={page} total={cards.total} pageSize={PAGE_SIZE} setPage={setPage} />
                </Col>
            </Row>
        </Container>
    )
}

export default ListOfCards
