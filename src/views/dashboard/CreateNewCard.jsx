import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormLabel, Modal, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import CreateCardStore from '../../stores/createCardStore'
import './CreateNewCard.css'
import './dashboardGlobal.css'
import SaveAlert from '../../components/dashboard/SaveAlert'
import { CARDS_ROUTE } from '../../utils/routes'
import { FormattedMessage, useIntl } from 'react-intl'
import { injectIntl, intlShape } from 'react-intl'
import { templatesAPI } from '../../api/templates'

const createCardStore = new CreateCardStore()

function useQuery() {
    const { search } = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
}

const CreateNewCard = observer(({ userIsAdmin = true }) => {
    const intl = useIntl()

    const placeholder = intl.formatMessage({ id: 'placeholderNewCard' })

    const [show, setShow] = useState(false)
    const [templateProperties, setTemplateProperties] = useState([])
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleAddNewProperties = (e) => {
        createCardStore.addNewProperties(e.currentTarget.innerText)
        handleClose()
    }

    const query = useQuery()

    useEffect(() => {
        templatesAPI
            .getTemplateById(query.get('template'))
            .then((res) => setTemplateProperties(res.data.propertiesList))
            .catch((e) => console.log(e))
    }, [])

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
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M22.7076 12L3.99284 12" stroke="black" strokeLinecap="round" />
                                        <path
                                            d="M10.2311 6L3.99281 12L10.2311 18"
                                            stroke="black"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span>
                                        <FormattedMessage id="buttonBackToCards" />
                                    </span>
                                </div>
                            </Link>
                        </Col>
                        <Col md="8">
                            <h3 className="create-new-card__current-title">
                                <FormattedMessage id="newCard" />
                            </h3>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col>
                            <Form>
                                <div className="create-new-card__properties offset-md-1">
                                    <Form.Group className="mb-4 d-flex align-items-center flex-row">
                                        <Form.Label className="me-2 col-xl-2 col-sm-3">
                                            <FormattedMessage id="nameOfCard" />
                                        </Form.Label>
                                        <Form.Control type="text" placeholder={placeholder} />
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
                                    {templateProperties.length === 0 && <h2>Загрузка свойств шаблона</h2>}
                                    {templateProperties.map((el) => {
                                        return (
                                            <Form.Group className="mb-4 d-flex align-items-center flex-row">
                                                <Form.Label className="me-2 col-xl-2 col-sm-3">{el.name}</Form.Label>
                                                <Form.Control type="text" placeholder={el.name} />
                                            </Form.Group>
                                        )
                                    })}
                                    {createCardStore.arrayWithNewProperties.map((el) => {
                                        return (
                                            <Form.Group className="mb-4 d-flex align-items-center flex-row">
                                                <Form.Label className="me-2 col-xl-2 col-sm-3">{el.name}</Form.Label>
                                                <Form.Control type="text" placeholder={placeholder} />
                                            </Form.Group>
                                        )
                                    })}
                                </div>
                            </Form>
                            <button
                                onClick={handleShow}
                                className="create-new-card__button dashboard-button d-flex align-items-center offset-md-3"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M20 12H4" stroke="black" strokeLinecap="round" />
                                    <path d="M12 4V20" stroke="black" strokeLinecap="round" />
                                </svg>
                                <span>
                                    <FormattedMessage id="buttonAddProperty" />
                                </span>
                            </button>
                        </Col>
                    </Row>
                </Col>
                <Col md="3">
                    <div className="create-new-card__save-alert">
                        <div className="save-alert">
                            <p>
                                <FormattedMessage id="newCardWarningModalText" />
                            </p>
                            {userIsAdmin && (
                                <Form>
                                    <Form.Group className="mb-2">
                                        <Form.Check
                                            id={'preventDeletion'}
                                            type={'checkbox'}
                                            label={'Запретить удаление'}
                                            onClick={() => {
                                                createCardStore.toggleProhibitUpdate()
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Select
                                        id={'chooseOrganization'}
                                        className="mb-2"
                                        onClick={(e) => {
                                            createCardStore.setOrganizationOption(e.target.value)
                                        }}
                                    >
                                        <option>Организация</option>
                                        <option value="One">One</option>
                                        <option value="Two">Two</option>
                                        <option value="Three">Three</option>
                                    </Form.Select>
                                    <Form.Select
                                        id={'chooseOwner'}
                                        className="mb-2"
                                        onClick={(e) => {
                                            createCardStore.setOwnerOption(e.target.value)
                                        }}
                                    >
                                        <option>Владелец</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form>
                            )}

                            <button className="dashboard-button" disabled={!createCardStore.isUserAddNewProperties}>
                                <svg
                                    width="26"
                                    height="24"
                                    viewBox="0 0 26 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
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
                                <span>
                                    <FormattedMessage id="buttonToSave" />
                                </span>
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="addPropertyTitle" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="create-new-card__add-new-property">
                        <Form.Group
                            className="mb-4 d-flex align-items-center flex-row"
                            onClick={handleAddNewProperties}
                            role="button"
                        >
                            <Form.Label className="me-2">Название</Form.Label>
                            <Form.Control type="text" placeholder={placeholder} disabled />
                        </Form.Group>
                        <Form.Group
                            className="mb-4 d-flex align-items-center flex-row"
                            onClick={handleAddNewProperties}
                            role="button"
                        >
                            <Form.Label className="me-2">Название</Form.Label>
                            <Form.Control type="text" placeholder={placeholder} disabled />
                        </Form.Group>
                    </div>
                </Modal.Body>
            </Modal>
        </Container>
    )
})

export default CreateNewCard
