import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
                <Col md="3" className="list-of-cards__card">
                    <Link className="route-link" to={'/NewCard'}>
                        <div className="list-of-cards__create-new-card">
                            <svg
                                className="list-of-cards__svg"
                                width="70"
                                height="70"
                                viewBox="0 0 70 70"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M49.5833 35H20.4167" stroke="black" stroke-linecap="round" />
                                <path d="M35 49.5833V20.4167" stroke="black" stroke-linecap="round" />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M35 64.1667C51.1083 64.1667 64.1667 51.1083 64.1667 35C64.1667 18.8917 51.1083 5.83334 35 5.83334C18.8917 5.83334 5.83334 18.8917 5.83334 35C5.83334 51.1083 18.8917 64.1667 35 64.1667Z"
                                    stroke="black"
                                />
                            </svg>
                            <h3 className="list-of-cards__title">Добавить новую карточку</h3>
                        </div>
                    </Link>
                </Col>

                {exampleList.map((element) => {
                    return (
                        <Col md="3" className='list-of-cards__card'>
                            <Link className='route-link' to={`/yourCards/${element.id}`}>
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
