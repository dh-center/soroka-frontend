import React, { useState } from 'react'
import { Col, Container, Row, Modal } from 'react-bootstrap'
import { LANGUAGES } from '../../utils/constants'
import { FormattedMessage } from 'react-intl'
import { observer } from 'mobx-react'
import CommonDialog from './CommonDialog'
import { useNavigate } from 'react-router-dom'

const Header = observer(({ avatarSrc, baseStore, authStore }) => {
    const [smShow, setSmShow] = useState(false)
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const nav = useNavigate()

    return (
        <Container>
            <Row className="justify-content-between align-items-center header p-2 mb-3">
                <Col md="5">
                    {authStore.currentUser && (
                        <div className="header__user-info d-flex align-items-center">
                            <div className="header__avatar">
                                {avatarSrc ? (
                                    <img src={avatarSrc} alt={''} />
                                ) : (
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_176_863)">
                                            <path
                                                d="M7.33337 40.6666C7.33337 34.4166 15.6667 34.4166 19.8334 30.2499C21.9167 28.1666 15.6667 28.1666 15.6667 17.7499C15.6667 10.8062 18.4438 7.33325 24 7.33325C29.5563 7.33325 32.3334 10.8062 32.3334 17.7499C32.3334 28.1666 26.0834 28.1666 28.1667 30.2499C32.3334 34.4166 40.6667 34.4166 40.6667 40.6666"
                                                stroke="black"
                                                strokeLinecap="round"
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
                            <h2 className="header__user-name">{authStore.currentUser.name}</h2>
                        </div>
                    )}
                </Col>

                <Col lg="3" md="4" className="d-flex">
                    <button className="dashboard-button me-1" onClick={handleShow}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15 4V20H4L4 4L15 4Z"
                                stroke="black"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path d="M12.5 12H21.5" stroke="black" strokeLinecap="round" />
                            <path d="M18.5 15L21.5 12L18.5 9" stroke="black" strokeLinecap="round" />
                        </svg>
                        <span>
                            <FormattedMessage id="exit" />
                        </span>
                    </button>
                    <button className="dashboard-button" onClick={() => setSmShow(true)}>
                        <span>
                            <FormattedMessage id="changeLanguage" />
                        </span>
                    </button>
                </Col>
            </Row>

            <CommonDialog
                formattesMessageTitleId={'doYouSure'}
                show={show}
                handleSubmit={() => {
                    setShow(false)
                    nav('/')
                    authStore.logout()
                }}
                setShow={setShow}
                authStore={authStore}
            />

            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        <FormattedMessage id="changingLanguage" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {LANGUAGES.map((el, index) => {
                        return (
                            <button
                                className="dashboard-button mb-2"
                                key={index}
                                onClick={() => {
                                    baseStore.setUiLang(el.code)
                                    setSmShow(false)
                                }}
                            >
                                <span>{el.name}</span>
                            </button>
                        )
                    })}
                </Modal.Body>
            </Modal>
        </Container>
    )
})

export default Header
