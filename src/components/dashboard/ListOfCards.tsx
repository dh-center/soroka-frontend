import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { CardsAPI } from '../../api/cards'
import PaginationButtons from '../common/PaginationButtons'
import AddNewCard from './AddNewCard'
import ListCard from './ListCard'
import { useStore } from '../../stores/rootStore'

const PAGE_SIZE = 6 * 4 - 1
const DEFAULT_ORGANIZATION_FILTER_VALUE = 'any'

const ListOfCards = () => {
    // todo: add page query
    const [cards, setCards] = useState({ results: [], total: 0 })
    const [page, setPage] = useState(0)
    const { baseStore } = useStore()
    const [currentOrganization, setCurrentOrganization] = useState<string | number>(DEFAULT_ORGANIZATION_FILTER_VALUE)

    useEffect(() => {
        setPage(0)
    }, [currentOrganization])

    const getCardsByParameters = (organizationId: number | string, offset: number, limit: number) => {
        if (organizationId === DEFAULT_ORGANIZATION_FILTER_VALUE) {
            CardsAPI.getCardsList({ offset, limit })
                .then((res) => setCards(res.data))
                .catch((error) => console.log(error))
        } else if (!Number.isNaN(organizationId)) {
            CardsAPI.getCardsByOrganizationId({ offset, limit }, +organizationId)
                .then((res) => setCards(res.data))
                .catch((error) => console.error(error))
        }
    }

    useEffect(() => {
        getCardsByParameters(currentOrganization, page * PAGE_SIZE, PAGE_SIZE)
    }, [currentOrganization, page])

    const intl = useIntl()

    return (
        <Container>
            <Row xs={1} sm={3} md={4} lg={8} xl={10} className="mb-3">
                <Form.Select onChange={(e) => setCurrentOrganization(e.target.value)}>
                    <option value={DEFAULT_ORGANIZATION_FILTER_VALUE}>
                        {intl.formatMessage({ id: 'allOrganizations' })}
                    </option>
                    {baseStore.organizations.map((item) => (
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
