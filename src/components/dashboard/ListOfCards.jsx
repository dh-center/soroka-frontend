import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CardsAPI } from '../../api/cards'
import AddNewCard from './AddNewCard'
import ListCard from './ListCard'

function ListOfCards() {
    const [cards, setCards] = useState({ results: [] })
    useEffect(() => {
        CardsAPI.getCardsList()
            .then((res) => setCards(res.data))
            .catch((er) => console.log(er))
    }, [])

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
        </Container>
    )
}

export default ListOfCards
