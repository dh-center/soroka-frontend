import React, { useRef, useState } from 'react'
import './CardPage.css'
import { Button, Col, Container, Form, Modal, Overlay, Row, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './dashboardGlobal.css'
import { observer } from 'mobx-react'
import { makeAutoObservable } from 'mobx'
import SaveAlert from '../../components/dashboard/SaveAlert'
import PropertiesObservable from '../../stores/propertiesObservable'
import { CARDS_ROUTE } from '../../api/routes'

const propertiesObserver = new PropertiesObservable()

const CardPage = observer(() => {
    const [show, setShow] = useState(false)
    const target = useRef(null)
    return (
        <Container>
            <Row>
                <Col md="9">
                    <Row className="mb-4 d-flex align-items-center">
                        <Col md="4">
                            <Link className="route-link" to={CARDS_ROUTE}>
                                <div className="dashboard-button back-to-list">
                                    <svg
                                        width="26"
                                        height="24"
                                        viewBox="0 0 26 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.7076 12L3.99284 12" stroke="black" stroke-linecap="round" />
                                        <path
                                            d="M10.2311 6L3.99281 12L10.2311 18"
                                            stroke="black"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                    <span>Назад к карточкам</span>
                                </div>
                            </Link>
                        </Col>
                        <Col md="8">
                            <h3 className="current-card__current-title">Новая карточка</h3>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <Form>
                                <div className="current-card__properties offset-md-1">
                                    {propertiesObserver.observingArray.map((element) => {
                                        if (element.type == 'text') {
                                            return (
                                                <Form.Group className="mb-4 d-flex align-items-center flex-row">
                                                    <Form.Label className="me-2 col-xl-2 col-sm-3">
                                                        {element.name}
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        style={{ height: '84px' }}
                                                        type="text"
                                                        placeholder=""
                                                        value={element.value}
                                                        onChange={(event) => {
                                                            console.log('wwww')
                                                            propertiesObserver.changeValue(
                                                                element.id,
                                                                event.target.value
                                                            )
                                                        }}
                                                    />
                                                </Form.Group>
                                            )
                                        } else if (element.type == 'select') {
                                            return (
                                                <Form.Group className="mb-4 d-flex align-items-center flex-row">
                                                    <Form.Label className="me-2 col-xl-2 col-sm-3">
                                                        {element.name}
                                                    </Form.Label>
                                                    <Form.Select aria-label="Default select example">
                                                        <option>{element.value}</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            )
                                        }
                                    })}
                                </div>
                                <button
                                    className="create-new-card__button dashboard-button d-flex align-items-center offset-md-1 dashboard-button--disabled "
                                    ref={target}
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 12H4" stroke="black" stroke-linecap="round" />
                                        <path d="M12 4V20" stroke="black" stroke-linecap="round" />
                                    </svg>
                                    <span>Добавить свойство</span>
                                </button>
                                <Overlay target={target.current} show={show} placement="right">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}>
                                            Все возможные свойства уже добавлены
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </Form>
                        </Col>
                    </Row>
                </Col>
                <Col md="3">
                    <div className="current-card__save-alert">
                        <div className="save-alert">
                            {propertiesObserver.hasEmptyProperties && (
                                <p>Эта карточка заполнена не до конца: в ней есть пустые поля.</p>
                            )}
                            <button
                                className="dashboard-button"
                                disabled={propertiesObserver.isUserNotChangedProperties}>
                                <svg
                                    width="26"
                                    height="24"
                                    viewBox="0 0 26 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M18.1459 3C18.4044 3 18.6529 3.10008 18.8391 3.27926L22.7076 7L22.7076 20C22.7076 20.5523 22.2599 21 21.7076 21L4.99284 21C4.44056 21 3.99284 20.5523 3.99284 20L3.99284 4C3.99284 3.44772 4.44055 3 4.99284 3L18.1459 3Z"
                                        stroke="black"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <rect
                                        x="8.1517"
                                        y="13"
                                        width="10.3971"
                                        height="8"
                                        stroke="black"
                                        stroke-linejoin="round"
                                    />
                                    <rect
                                        x="9.19141"
                                        y="3"
                                        width="8.31769"
                                        height="5"
                                        stroke="black"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <span>Сохранить</span>
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
})

export default CardPage
