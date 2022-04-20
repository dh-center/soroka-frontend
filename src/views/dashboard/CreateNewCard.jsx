import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CreateNewPropertiesObservable from '../../stores/createNewPropertyObservable'
import './CreateNewCard.css'
import './dashboardGlobal.css'
import { CARDS_ROUTE } from '../../utils/routes'

const createNewProperties = new CreateNewPropertiesObservable()

const CreateNewCard = observer(() => {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAddNewProperties = (e) => {
        console.log(e.currentTarget.innerText)
        createNewProperties.addNewProperties(e.currentTarget.innerText)
        handleClose()
    }
    return (
        <Container>
            <Row>
                <Col md="9">
                    <Row className="mb-4 d-flex align-items-center">
                        <Col md="4">
                            <Link to={CARDS_ROUTE} className="route-link">
                                <div className="dashboard-button back-to-list">
                                    <svg
                                        width="26"
                                        height="24"
                                        viewBox="0 0 26 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.7076 12L3.99284 12" stroke="black" strokeLinecap="round" />
                                        <path
                                            d="M10.2311 6L3.99281 12L10.2311 18"
                                            stroke="black"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span>Назад к карточкам</span>
                                </div>
                            </Link>
                        </Col>
                        <Col md="8">
                            <h3 className="create-new-card__current-title">Новая карточка</h3>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <Form>
                                <div className="create-new-card__properties offset-md-1">
                                    <Form.Group className="mb-4 d-flex align-items-center flex-row">
                                        <Form.Label className="me-2 col-xl-2 col-sm-3">Название</Form.Label>
                                        <Form.Control type="text" placeholder="Новая карточка" />
                                    </Form.Group>
                                    <Form.Group className="mb-4 d-flex align-items-center flex-row">
                                        <Form.Label className="me-2 col-xl-2 col-sm-3">Сущность</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Выберите сущность предмета из реального мира</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {createNewProperties.arrayWithNewProperties.map((el) => {
                                        return (
                                            <Form.Group className="mb-4 d-flex align-items-center flex-row">
                                                <Form.Label className="me-2 col-xl-2 col-sm-3">{el.name}</Form.Label>
                                                <Form.Control type="text" placeholder="Новая карточка" />
                                            </Form.Group>
                                        )
                                    })}
                                </div>
                            </Form>
                            <button
                                onClick={handleShow}
                                className="create-new-card__button dashboard-button d-flex align-items-center offset-md-3">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 12H4" stroke="black" strokeLinecap="round" />
                                    <path d="M12 4V20" stroke="black" strokeLinecap="round" />
                                </svg>
                                <span>Добавить свойство</span>
                            </button>
                        </Col>
                    </Row>
                </Col>
                <Col md="3">
                    <div className="create-new-card__save-alert">
                        <div className="save-alert">
                            <p>Добавьте любые нужные свойства, заполните карточку и сохраните</p>
                            <button className="dashboard-button" disabled={!createNewProperties.isUserAddNewProperties}>
                                <svg
                                    width="26"
                                    height="24"
                                    viewBox="0 0 26 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18.1459 3C18.4044 3 18.6529 3.10008 18.8391 3.27926L22.7076 7L22.7076 20C22.7076 20.5523 22.2599 21 21.7076 21L4.99284 21C4.44056 21 3.99284 20.5523 3.99284 20L3.99284 4C3.99284 3.44772 4.44055 3 4.99284 3L18.1459 3Z"
                                        stroke="black"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <rect
                                        x="8.1517"
                                        y="13"
                                        width="10.3971"
                                        height="8"
                                        stroke="black"
                                        strokeLinejoin="round"
                                    />
                                    <rect
                                        x="9.19141"
                                        y="3"
                                        width="8.31769"
                                        height="5"
                                        stroke="black"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span>Сохранить</span>
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Нажмите на нужное свойство, чтобы добавить его</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="create-new-card__add-new-property">
                        <Form.Group
                            className="mb-4 d-flex align-items-center flex-row"
                            onClick={handleAddNewProperties}
                            role="button">
                            <Form.Label className="me-2">Название</Form.Label>
                            <Form.Control type="text" placeholder="Новая карточка" disabled />
                        </Form.Group>
                        <Form.Group
                            className="mb-4 d-flex align-items-center flex-row"
                            onClick={handleAddNewProperties}
                            role="button">
                            <Form.Label className="me-2">Название</Form.Label>
                            <Form.Control type="text" placeholder="Новая карточка" disabled />
                        </Form.Group>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    )
})

export default CreateNewCard
