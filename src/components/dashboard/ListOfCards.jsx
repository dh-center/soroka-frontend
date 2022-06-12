import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { CardsAPI } from '../../api/cards'
import { CARDS_CREATE_ROUTE } from '../../utils/routes'
import ListCard from './ListCard'
import './ListOfCards.css'

function ListOfCards() {
    const [cards, setCards] = useState([])

    useEffect(() => {
        CardsAPI.getCardsList()
            .then((res) => setCards(res.data))
            .catch((er) => console.log(er))
    }, [])

    return (
        <Container>
            <Row>
                <Col md="3" className="list-of-cards__card me-3 mb-2">
                    <Link className="route-link" to={CARDS_CREATE_ROUTE}>
                        <div className="list-of-cards__create-new-card">
                            <svg className="bi" width="32" height="32" fill="currentColor">
                                <use xlinkHref="bootstrap-icons.svg#heart-fill" />
                            </svg>

                            <h3 className="list-of-cards__title">
                                <FormattedMessage id="addNewCard" />
                            </h3>
                        </div>
                    </Link>
                </Col>

                {cards.map((element, index) => {
                    return (
                        <Col md="3" className="list-of-cards__card me-3" key={element.id}>
                            <ListCard key={element.id} titleOfCard={element.name} className="" element={element} />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default ListOfCards
