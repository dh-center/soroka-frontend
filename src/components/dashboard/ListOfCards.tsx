import { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'react-bootstrap-icons'
import CardsAPI from 'api/cards'
import { useStore } from 'stores/rootStore'
import FloatingActionButton from 'components/common/FloatingActionButton/FloatingActionButton'
import PaginationButtons from '../common/PaginationButtons'
import ListCard from './ListCard'
import { CARDS_CREATE_ROUTE, CARDS_TEMPLATES_ROUTE } from '../../utils/urls'
import { DEFAULT_ORGANIZATION_FILTER_VALUE, USER_ROLES } from '../../utils/constants'

const PAGE_SIZE = 6 * 4

const ListOfCards = () => {
    const navigate = useNavigate()
    // todo: add page query
    const [cards, setCards] = useState({ results: [], total: 0 })
    const [page, setPage] = useState(0)
    const { authStore, baseStore } = useStore()
    const [currentOrganization, setCurrentOrganization] = useState<string | number>(DEFAULT_ORGANIZATION_FILTER_VALUE)

    useEffect(() => {
        setPage(0)
    }, [currentOrganization])

    useEffect(() => {
        CardsAPI.getCardsByParameters(currentOrganization, page * PAGE_SIZE, PAGE_SIZE)
            .then((res) => setCards(res.data))
            .catch((error) => console.error(error))
    }, [currentOrganization, page])

    const intl = useIntl()

    const hasCards = cards.results.length !== 0

    return (
        <Container>
            {(authStore.currentUser?.userRole === USER_ROLES.admin ||
                authStore.currentUser?.userRole === USER_ROLES.editor) && (
                <Row xs={1} sm={3} md={4} lg={8} xl={10} className="mb-3">
                    <Form.Select onChange={(e) => setCurrentOrganization(e.target.value)} className="w-auto">
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
            )}

            <Row xs={1} sm={3} md={4} lg={5} xl={6} className="g-2">
                {hasCards ? (
                    cards.results.map(({ id, name, isFilled, cover }) => (
                        <Col key={id}>
                            <ListCard id={id} name={name} isFilled={isFilled} cover={cover} />
                        </Col>
                    ))
                ) : (
                    <p className="text-center w-100">
                        <FormattedMessage id="emptyCardList" />
                    </p>
                )}
            </Row>
            {hasCards && (
                <Row>
                    <Col className="d-flex justify-content-center mt-3">
                        <PaginationButtons page={page} total={cards.total} pageSize={PAGE_SIZE} setPage={setPage} />
                    </Col>
                </Row>
            )}

            <FloatingActionButton
                onClick={({ altKey }) => navigate(altKey ? CARDS_CREATE_ROUTE : CARDS_TEMPLATES_ROUTE)}>
                <Plus size={48} />
            </FloatingActionButton>
        </Container>
    )
}

export default ListOfCards
