import React, { useRef } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Login.css'
import './auth.css'
import { REGISTRATION_ROUTE } from '../../api/routes'
import { FormattedMessage } from "react-intl";

function Login() {
    const password = useRef(null)

    const passwordButtonHandler = (event) => {
        if (password.current.getAttribute('type') == 'password') {
            password.current.setAttribute('type', 'text')
        } else {
            password.current.setAttribute('type', 'password')
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={'4'}>
                    {/* <div className="container login"> */}
                    <span className="login__span">
                        <FormattedMessage id={"loginTitle"} />
                    </span>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <input
                                type="text"
                                placeholder="Почта или телефон"
                                className="login__input login__email login__password-wrap__password
"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <div class="input-group flex-nowrap">
                                <input
                                    ref={password}
                                    type="password"
                                    placeholder="Пароль"
                                    className="login__input login__password-wrap__password"
                                />

                                <div class="input-group-prepend">
                                    <svg
                                        className="login__password-wrap__svg "
                                        id="addon-wrapping"
                                        onClick={passwordButtonHandler}
                                        width="22"
                                        height="10"
                                        viewBox="0 0 22 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M19 1C19 1 18.6797 1.66735 18 2.51445M11 6C9.39201 6 8.04786 5.58775 6.94861 5M11 6C12.608 6 13.9521 5.58775 15.0514 5M11 6V9.5M3 1C3 1 3.35367 1.73682 4.10628 2.64476M6.94861 5L4 8M6.94861 5C5.6892 4.32661 4.75124 3.42285 4.10628 2.64476M15.0514 5L17.5 8M15.0514 5C16.3818 4.28865 17.3535 3.32023 18 2.51445M4.10628 2.64476L1 4M18 2.51445L21 4"
                                            stroke="black"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Form.Group>
                        <div className="login__submit">
                            <Button className="login__submit__button">Войти</Button>
                            <Link to={REGISTRATION_ROUTE} className={'link'}>
                                Регистрация
                            </Link>
                        </div>

                        <div className="login__wrong-auth">
                            Неправильный логин или пароль. <br /> Попробуйте ещё раз, а в крайнем случае напишите
                            администратору: hvost@soroka.app
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
