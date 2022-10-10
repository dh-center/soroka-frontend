import React from 'react'
import { Badge, Card, Container } from 'react-bootstrap'
import { CardImage } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { getCardById } from 'utils/urls'

type ListCardProps = {
    id: number
    name: string
    isFilled: boolean
}

const ListCard = ({ id, name, isFilled = true }: ListCardProps) => {
    const navigate = useNavigate()

    return (
        <Card onClick={() => navigate(getCardById(id))} role="button">
            <Card.Img as={Container} variant="top" className="position-relative">
                <div style={{ height: '150px', backgroundColor: 'white' }}></div>
                <CardImage size={48} color="black" className="position-absolute top-50 start-50 translate-middle" />
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
    )
}

export default ListCard
