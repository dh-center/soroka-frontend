import { useEffect } from 'react'
import { Badge, Card, Container } from 'react-bootstrap'
import { CardImage } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { getCardById } from 'utils/urls'
import CardsAPI from 'api/cards'

type ListCardProps = {
    id: number
    name: string
    isFilled: boolean
    cover: string | null
}

const ListCard = ({ id, name, isFilled = true, cover = null }: ListCardProps) => {
    const navigate = useNavigate()

    console.log(cover, 'cover')
    useEffect(() => {
        try {
            if (cover) {
                const fileJSON = JSON.parse(cover)
                console.log(fileJSON, 'js')
                CardsAPI.uploadFileById(fileJSON.id, fileJSON.name).then((res) => console.log(res, 'res'))
            }
        } catch (e) {
            console.warn('Не удалось преоьразовать строку в JSON')
        }
    }, [])

    return (
        <Card onClick={() => navigate(getCardById(id))} role="button">
            <Card.Img as={Container} variant="top" className="position-relative">
                <div style={{ height: '150px', backgroundColor: 'white' }}></div>
                {cover === null ? (
                    <CardImage size={48} color="black" className="position-absolute top-50 start-50 translate-middle" />
                ) : (
                    <img src="" alt="card cover" />
                )}

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
