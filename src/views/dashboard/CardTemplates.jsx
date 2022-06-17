import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CARDS_CREATE_ROUTE } from '../../utils/routes'

function CardTemplates({
    listOfTemplates = [
        {
            id: 0,
            template: 'game'
        },
        {
            id: 1,
            template: 'people'
        },
        {
            id: 2,
            template: 'document'
        },
        {
            id: 3,
            template: 'game'
        },
        {
            id: 4,
            template: 'people'
        },
        {
            id: 5,
            template: 'document'
        }
    ]
}) {
    return (
        <Container className="card-templates">
            <Row className="d-flex justify-content-start">
                {listOfTemplates.map((el) => {
                    return (
                        <Col key={el.id} md={'2'} className="me-3 mb-3">
                            <Card body>
                                <Link
                                    to={`${CARDS_CREATE_ROUTE}?template=${el.template}`}
                                    className="d-flex justify-content-center p-4">
                                    {el.template}
                                </Link>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default CardTemplates
