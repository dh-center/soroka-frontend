import { useEffect, useState } from 'react'
import { Badge, Card, Container } from 'react-bootstrap'
import { CardImage } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { getCardById } from 'utils/urls'

type ListCardProps = {
    id: number
    name: string
    isFilled: boolean
    cover: string | null
}

const ListCard = ({ id, name, isFilled = true, cover = null }: ListCardProps) => {
    const navigate = useNavigate()
    const [cardCover, setCardCover] = useState<string>('')

    useEffect(() => {
        try {
            if (cover) {
                const fileJSON = JSON.parse(cover)
                setCardCover(
                    fileJSON.url.replace(
                        'https://localhost/restapi/v1/',
                        'https://soroka.f128.science/restapi/v1/files/by-id/'
                    )
                )
            }
        } catch (e) {
            console.warn('Не удалось преобразовать строку в JSON')
        }
    }, [cover])

    return (
        <Card onClick={() => navigate(getCardById(id))} role="button">
            {cardCover ? (
                <Card.Img
                    variant="top"
                    className="position-relative"
                    style={{ height: '150px', objectFit: 'cover' }}
                    src={cardCover}
                />
            ) : (
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
            )}

            <Card.Footer>{name}</Card.Footer>
        </Card>
    )
}

export default ListCard
