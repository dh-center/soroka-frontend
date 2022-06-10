import { Col, Container, Row } from 'react-bootstrap'
import './InviteLink.css'
import { useNavigate, useParams } from "react-router-dom";
import { authStore } from "../../App";

function InviteLink() {
    const nav = useNavigate()

    const { token } = useParams();

    const acceptTermsOfRules = async () => {
        const user = await authStore.acceptsTermsOfUse(true)

        if (user.hasAcceptTermsOfUse) {
            await nav(`/registration/${token}`)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <p className="invite-link__text">
                        Здравствуйте, Музей Старинных предметов! Вас пригласили участвовать в коллективном сборе данных
                        в рамках Ассамблеи петровских музеев в роли автора. Собирать данные будем здесь, в новом
                        приложении “Сорока”, которое создаёт ИТМО. А показывать и рассказывать — на сайте проекта
                        Wunderkammer. Нам не терпится увидеть уникальные объекты и истории, о которых знаете только вы,
                        но, прежде всего, необходимы юридические формальности. Пожалуйста, внимательно прочтите
                        пользовательское соглашение. В нём детально описано, как будут использоваться полученные
                        материалы. Также у нас есть “перевод” соглашения — упрощённое объяснение каждого пункта. Нажимая
                        кнопку продолжить, вы соглашаетесь с пользовательским соглашением и подтверждаете, что являетесь
                        представителем музея, который имеет право на подобные обязательства
                    </p>
                    <button className={'invite-link__button'} onClick={acceptTermsOfRules}>Продолжить</button>
                </Col>
            </Row>
        </Container>
    )
}

export default InviteLink
