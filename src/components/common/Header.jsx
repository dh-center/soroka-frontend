import React, { useState } from 'react'
import { Col, Container, Row, Modal } from 'react-bootstrap'

function Header({ avatarSrc, userName = 'Имя пользователя' }) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    return (
        <Container>
            <Row className="justify-content-between align-items-center header p-2 mb-3">
                <Col md="5">
                    <div className="header__user-info d-flex align-items-center">
                        <div className="header__avatar">
                            {avatarSrc ? (
                                <img src={avatarSrc} />
                            ) : (
                                <svg
                                    width="48"
                                    height="48"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_176_863)">
                                        <path
                                            d="M7.33337 40.6666C7.33337 34.4166 15.6667 34.4166 19.8334 30.2499C21.9167 28.1666 15.6667 28.1666 15.6667 17.7499C15.6667 10.8062 18.4438 7.33325 24 7.33325C29.5563 7.33325 32.3334 10.8062 32.3334 17.7499C32.3334 28.1666 26.0834 28.1666 28.1667 30.2499C32.3334 34.4166 40.6667 34.4166 40.6667 40.6666"
                                            stroke="black"
                                            stroke-linecap="round"
                                        />
                                    </g>
                                    <path
                                        d="M24 47C11.2975 47 1 36.7025 1 24H-1C-1 37.8071 10.1929 49 24 49V47ZM47 24C47 36.7025 36.7025 47 24 47V49C37.8071 49 49 37.8071 49 24H47ZM24 1C36.7025 1 47 11.2975 47 24H49C49 10.1929 37.8071 -1 24 -1V1ZM24 -1C10.1929 -1 -1 10.1929 -1 24H1C1 11.2975 11.2975 1 24 1V-1Z"
                                        fill="black"
                                    />
                                    <defs>
                                        <clipPath id="clip0_176_863">
                                            <path
                                                d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24Z"
                                                fill="white"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            )}
                        </div>
                        <h2 className="header__user-name">{userName}</h2>
                    </div>
                </Col>

                <Col md="2">
                    <button className="dashboard-button" onClick={handleShow}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15 4V20H4L4 4L15 4Z"
                                stroke="black"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path d="M12.5 12H21.5" stroke="black" stroke-linecap="round" />
                            <path d="M18.5 15L21.5 12L18.5 9" stroke="black" stroke-linecap="round" />
                        </svg>
                        <span>Выйти</span>
                    </button>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="save-before-exit d-flex flex-column align-items-center ">
                        <p>Сохранить перед выходом?</p>
                        <div className="save-before-exit__buttons d-flex alig-items-center">
                            <button className="dashboard-button m-1" onClick={handleClose}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 13L10 16L17 9" stroke="black" stroke-linecap="round" />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="black"
                                    />
                                </svg>
                                <span>Да</span>
                            </button>

                            <button className="dashboard-button m-1" onClick={handleClose}>
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 34 34"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.5355 20.5357L13.4645 13.4647" stroke="black" stroke-linecap="round" />
                                    <path d="M13.4645 20.5357L20.5355 13.4647" stroke="black" stroke-linecap="round" />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M9.92893 24.0711C13.8342 27.9764 20.1658 27.9764 24.0711 24.0711C27.9763 20.1659 27.9763 13.8342 24.0711 9.92898C20.1658 6.02373 13.8342 6.02373 9.92893 9.92898C6.02369 13.8342 6.02369 20.1659 9.92893 24.0711Z"
                                        stroke="black"
                                    />
                                </svg>
                                <span>Нет</span>
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default Header
