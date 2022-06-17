import React from 'react'
import { Badge, Card, Container } from 'react-bootstrap'
import { CardImage } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { getCardById } from '../../utils/routes'

const ListCard = ({ id, name, isFilled = true }) => {
    return (
        <Link className="route-link" to={`${getCardById(id)}`}>
            <Card>
                <Card.Img as={Container} variant="top" className="position-relative">
                    <div style={{ height: '150px', backgroundColor: 'white' }}></div>
                    <CardImage size={48} className="position-absolute top-50 start-50 translate-middle" />
                    {!isFilled && (
                        <Container className="position-absolute bottom-0 start-0 p-2 d-flex justify-content-end">
                            <Badge bg="warning" text="dark">
                                <FormattedMessage id="notFilled" />
                            </Badge>
                        </Container>
                    )}
                </Card.Img>
                <Card.Footer>{name}</Card.Footer>
            </Card>
        </Link>
    )
}

export default ListCard
