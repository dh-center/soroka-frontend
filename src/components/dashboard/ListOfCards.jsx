import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CARDS_ROUTE, CREATE_ROUTE, getCardsRoute, getCreateCardRoute } from '../../api/routes'
import ListCard from './ListCard'
import './ListOfCards.css'

const exampleList = [
    {
        id:0,
        titleOfCard: 'Музей “Петергоф”',
        isComplete: false
    },
    {
        id:1,
        titleOfCard: 'Музей “Петергоф 2”',
        isComplete: true
    }
]

function ListOfCards() {
    return (
        <Container>
            <Row>
                <Col md="3" className="list-of-cards__card me-3 mb-2">
                    <Link className="route-link" to={getCreateCardRoute()}>
                        <div className="list-of-cards__create-new-card">
                            <svg class="bi" width="32" height="32" fill="currentColor">
                                <use xlinkHref="bootstrap-icons.svg#heart-fill" />
                            </svg>

                            <h3 className="list-of-cards__title">Добавить новую карточку</h3>
                        </div>
                    </Link>
                </Col>

                {exampleList.map((element) => {
                    return (
                        <Col md="3" className="list-of-cards__card me-3">
                            <Link className="route-link" to={getCardsRoute(element.id)}>
                                <ListCard
                                    key={element.id}
                                    titleOfCard={element.titleOfCard}
                                    isComplete={element.isComplete}
                                    className=""
                                />
                            </Link>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default ListOfCards
