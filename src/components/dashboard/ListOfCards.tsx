import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CardsAPI } from '../../api/cards'
import PaginationButtons from '../common/PaginationButtons'
import AddNewCard from './AddNewCard'
import ListCard from './ListCard'
import FloatingActionButton from '../common/FloatingActionButton/FloatingActionButton'
import { Plus } from 'react-bootstrap-icons'
import { CARDS_CREATE_ROUTE, CARDS_TEMPLATES_ROUTE } from '../../utils/urls'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const PAGE_SIZE = 6 * 4 - 1

const ListOfCards = () => {
    const navigate = useNavigate()
    // todo: add page query
    const [cards, setCards] = useState({ results: [], total: 0 })
    const [page, setPage] = useState(0)

    useEffect(() => {
        CardsAPI.getCardsList({ offset: page * PAGE_SIZE, limit: PAGE_SIZE })
            .then((res) => setCards(res.data))
            .catch((er) => console.log(er))
    }, [page])

    return (
        <Container>
            <Row xs={1} sm={3} md={4} lg={5} xl={6} className="g-2">
                {cards.results.length === 0 ? (
                    <FormattedMessage
                        id="emptyCardList"
                        values={{
                            p: (chunks) => (
                                <p
                                    style={{
                                        textAlign: 'center',
                                        padding: '4rem 0 8rem 0',
                                        width: '100%',
                                        minHeight: '70vh'
                                    }}>
                                    {chunks}
                                </p>
                            )
                        }}
                    />
                ) : (
                    cards.results.map(({ id, name, isFilled }) => (
                        <Col key={id}>
                            <ListCard id={id} name={name} isFilled={isFilled} />
                        </Col>
                    ))
                )}
            </Row>
            {cards.results.length !== 0 && (
                <Row>
                    <Col className="d-flex justify-content-center mt-3">
                        <PaginationButtons page={page} total={cards.total} pageSize={PAGE_SIZE} setPage={setPage} />
                    </Col>
                </Row>
            )}

            <FloatingActionButton
                className="floating-add-card-button rounded-circle outline-primary"
                onClick={({ altKey }) => navigate(altKey ? CARDS_CREATE_ROUTE : CARDS_TEMPLATES_ROUTE)}>
                <Plus size={48} className="position-absolute top-50 start-50 translate-middle" />
            </FloatingActionButton>
        </Container>
    )
}

export default ListOfCards
