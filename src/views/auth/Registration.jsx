import React, { useEffect, useRef } from "react";
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './Registration.css'
import './auth.css'
import { LOGIN_ROUTE } from '../../utils/routes'
import { FormattedMessage, useIntl } from "react-intl";
import { authStore } from "../../App";

function Registration() {
    const password = useRef(null)
    const repeatPassword = useRef(null)

    const intl = useIntl()
    const placeholderPassword = intl.formatMessage({ id: 'placeholderPassword' })
    const placeholderRepeatPassword = intl.formatMessage({ id: 'placeholderRepeatPassword' })
    const signUpButton = intl.formatMessage({ id: 'signUpButton' })

    const nav = useNavigate()

    const { token } = useParams();


    const passwordButtonHandler = () => {
        const value = password.current.getAttribute('type') === 'password' ? 'text' : 'password'
        password.current.setAttribute('type', value)
        repeatPassword.current.setAttribute('type', value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.current.value !== repeatPassword.current.value) return

        const passwordSuccessfullyCreated = await authStore.setUserPassword(token,{
            password: password.current.value,
            rePassword: password.current.value
        })

        if (passwordSuccessfullyCreated) {
            nav('/login')
        }
    }

    useEffect(() => {
        if (token) {
            authStore.getUserData(token).then(user => {
                if (!user.hasAcceptTermsOfUse) {
                    nav(`/invite/${token}`)
                }
            })
        }
    }, [])

    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={'4'}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <div className="input-group flex-nowrap">
                                <input
                                    ref={password}
                                    type="password"
                                    placeholder={placeholderPassword}
                                    className="login__input login__password-wrap__password"
                                    required={true}
                                />

                                <div className="input-group-prepend">
                                    <svg
                                        className="login__password-wrap__svg "
                                        id="addon-wrapping"
                                        onClick={passwordButtonHandler}
                                        width="22"
                                        height="10"
                                        viewBox="0 0 22 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19 1C19 1 18.6797 1.66735 18 2.51445M11 6C9.39201 6 8.04786 5.58775 6.94861 5M11 6C12.608 6 13.9521 5.58775 15.0514 5M11 6V9.5M3 1C3 1 3.35367 1.73682 4.10628 2.64476M6.94861 5L4 8M6.94861 5C5.6892 4.32661 4.75124 3.42285 4.10628 2.64476M15.0514 5L17.5 8M15.0514 5C16.3818 4.28865 17.3535 3.32023 18 2.51445M4.10628 2.64476L1 4M18 2.51445L21 4"
                                            stroke="black"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <div className="input-group flex-nowrap">
                                <input
                                    ref={repeatPassword}
                                    type="password"
                                    placeholder={placeholderRepeatPassword}
                                    className="registration__input registration__password-wrap__password"
                                    required={true}
                                />

                                <div className="input-group-prepend">
                                    <svg
                                        className="login__password-wrap__svg "
                                        id="addon-wrapping"
                                        onClick={passwordButtonHandler}
                                        width="22"
                                        height="10"
                                        viewBox="0 0 22 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19 1C19 1 18.6797 1.66735 18 2.51445M11 6C9.39201 6 8.04786 5.58775 6.94861 5M11 6C12.608 6 13.9521 5.58775 15.0514 5M11 6V9.5M3 1C3 1 3.35367 1.73682 4.10628 2.64476M6.94861 5L4 8M6.94861 5C5.6892 4.32661 4.75124 3.42285 4.10628 2.64476M15.0514 5L17.5 8M15.0514 5C16.3818 4.28865 17.3535 3.32023 18 2.51445M4.10628 2.64476L1 4M18 2.51445L21 4"
                                            stroke="black"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Form.Group>

                        <div className="registration__submit">
                            <input
                                type={'submit'}
                                className="registration__submit-button"
                                value={signUpButton}
                            />

                            <Link className="link" to={LOGIN_ROUTE}>
                                <FormattedMessage id="alreadyRegistered" />
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Registration
