import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CardsAPI } from '../../api/cards'
import PaginationButtons from '../common/PaginationButtons'
import AddNewCard from './AddNewCard'
import ListCard from './ListCard'

const PAGE_SIZE = 6 * 4 - 1

const ListOfCards = () => {
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
                <AddNewCard />
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
