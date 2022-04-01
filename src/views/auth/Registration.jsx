import { useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Registration.css'
import './auth.css'
function Registration() {
    const passwordFirstRef = useRef(null)
    const passwordSecondRef = useRef(null)

    const passwordButtonHandler = (event) => {
        if (passwordFirstRef.current.getAttribute('type') == 'password') {
            passwordFirstRef.current.removeAttribute('type')
            passwordFirstRef.current.setAttribute('type', 'text')
            passwordSecondRef.current.removeAttribute('type')
            passwordSecondRef.current.setAttribute('type', 'text')
        } else {
            passwordFirstRef.current.removeAttribute('type')
            passwordFirstRef.current.setAttribute('type', 'password')
            passwordSecondRef.current.removeAttribute('type')
            passwordSecondRef.current.setAttribute('type', 'password')
        }
    }
    return (
        <div className="container registration">
            <span className="registration__span">Вход</span>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <input
                        type="text"
                        placeholder="Почта или телефон"
                        className="registration__password-wrap__password p-3"
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <div className="registration__password-wrap">
                        <input
                            ref={passwordFirstRef}
                            type="password"
                            placeholder="Пароль"
                            className="registration__password-wrap__password"
                        />
                        <svg
                            className="registration__password-wrap__svg"
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
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <div className="registration__password-wrap">
                        <input
                            ref={passwordSecondRef}
                            type="password"
                            placeholder="Повторите пароль"
                            className="registration__password-wrap__password"
                        />
                        <svg
                            className="registration__password-wrap__svg"
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
                </Form.Group>
                <div className="registration__submit">
                    <Button className="registration__submit__button">Войти</Button>
                    <Link className="link" to={'/login'}>
                        Я уже зарегистрировался
                    </Link>
                </div>
            </Form>
        </div>
    )
}

export default Registration
