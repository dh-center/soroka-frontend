import { Badge, Card, Container } from 'react-bootstrap'
import { CardImage } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import { getCardById } from 'utils/urls'
import './ListCard.css'

type ListCardProps = {
    id: number
    name: string
    isFilled: boolean
    cover: string | null
}

const ListCard = ({ id, name, isFilled = true, cover = null }: ListCardProps) => {
    const navigate = useNavigate()

    let cardCover = ''
    if (cover) {
        try {
            const fileCover = JSON.parse(cover)
            cardCover = fileCover.url
        } catch (e) {
            console.warn('There is a problem with cover:', cover)
        }
    }

    const badgeElement = !isFilled && (
        <Container className="position-absolute bottom-0 start-0 p-2 d-flex justify-content-end">
            <Badge bg="warning" text="dark">
                <FormattedMessage id="notFilled" />
            </Badge>
        </Container>
    )

    return (
        <Card onClick={() => navigate(getCardById(id))} role="button">
            {cardCover ? (
                <>
                    <Card.Img as={Container} variant="top" className="position-relative p-0">
                        <img className="position-relative list-card w-100" src={cardCover} alt="" />
                        {badgeElement}
                    </Card.Img>
                </>
            ) : (
                <Card.Img as={Container} variant="top" className="position-relative">
                    <div className="list-card"></div>
                    <CardImage size={48} color="black" className="position-absolute top-50 start-50 translate-middle" />
                    {badgeElement}
                </Card.Img>
            )}

            <Card.Footer>{name}</Card.Footer>
        </Card>
    )
}

export default ListCard
