import { observer } from 'mobx-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Container, Form, Modal, Overlay, Row, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CreateCardStore from '../../stores/createCardStore'
import './CreateNewCard.css'
import './dashboardGlobal.css'
import { CARDS_ROUTE, getCardsRoute } from '../../utils/routes'
import { FormattedMessage, useIntl } from 'react-intl'
import { useQuery } from '../../utils/hooks'
import CommonDialog from '../../components/common/CommonDialog'
import { USER_ROLES } from '../../utils/constants'
import { mainContext } from '../../context/mainContext'
import { organizationsAPI } from '../../api/organizations'
import Property from '../../components/dashboard/Property'
import { CardsAPI } from '../../api/cards'

const createCardStore = new CreateCardStore()

const CreateNewCard = observer(() => {
    const baseStore = useContext(mainContext)

    const { Consumer } = mainContext
    const intl = useIntl()
    const targetSaveButton = useRef(null)
    const [showTooltip, setShowTooltip] = useState(false)
    const placeholder = intl.formatMessage({ id: 'placeholderNewCard' })
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [nameOfCard, setNameOfCard] = useState('')
    const nav = useNavigate()
    const [showDialog, setShowDialog] = useState(false)
    const [owners, setOwners] = useState([{}])
    const [properties, setProperties] = useState([{}])

    const handleAddNewProperties = (id, name, isLink) => {
        console.log('data is', id, name, isLink)

        createCardStore.addNewProperties(name, id)

        handleClose()
    }

    const handleOrganizationChange = (event) => {
        createCardStore.setOrganizationOption(event.target.value)

        organizationsAPI.getOwnersById(createCardStore.organizationOption).then((res) => setOwners(res.data))
    }

    useEffect(() => {
        createCardStore.refreshCreatingCard()
        createCardStore.setOrganiztionAndOwner().then(() => {
            organizationsAPI.getOwnersById(createCardStore.organizationOption).then((res) => setOwners(res.data))
        })
        CardsAPI.getCardsProperties().then((res) => {
            setProperties(res.data)
        })
    }, [])
    useEffect(() => {}, [createCardStore.saved])
    const query = useQuery()

    return (
        <Container>
            <Row>
                <Col md="9">
                    <Row className="mb-4 d-flex align-items-center">
                        <Col md="4">
                            <div
                                className="route-link"
                                onClick={() => {
                                    setShowDialog(true)
                                    if (createCardStore.saved) nav(CARDS_ROUTE)
                                }}>
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
                                    <span>
                                        <FormattedMessage id="buttonBackToCards" />
                                    </span>
                                </div>
                            </div>
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
                                    <h1>{query.get('template')}</h1>

                                    <Form.Group className="mb-4 d-flex align-items-center flex-row">
                                        <Form.Label className="me-2 col-xl-2 col-sm-3">
                                            <FormattedMessage id="nameOfCard" />
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={placeholder}
                                            value={nameOfCard}
                                            onChange={(event) => {
                                                setNameOfCard(event.target.value)
                                                createCardStore.changeNameOfCard(event.target.value)
                                            }}
                                        />
                                    </Form.Group>
                                    {/* Сущность должна быть добавлена в задаче с темплейтами */}
                                    <Form.Group className="mb-4 d-flex align-items-center flex-row d-none">
                                        <Form.Label className="me-2 col-xl-2 col-sm-3">
                                            <FormattedMessage id="enity" />
                                        </Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option disabled>Выберите сущность предмета из реального мира</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Form.Select>
                                    </Form.Group>

                                    {createCardStore.observingArray.map((el, index) => {
                                        return (
                                            <Property key={el.id} element={el} index={index} store={createCardStore} className={el.hidden ? 'd-none' : ''} />
                                        )
                                    })}
                                </div>
                            </Form>
                            <button
                                disabled={createCardStore.observingArray.filter(el => !el.hidden).length == properties.length}
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
                            {createCardStore.userRole == USER_ROLES.admin && (
                                <Form>
                                    <Form.Group className="mb-2">
                                        <Form.Check
                                            id={'preventDeletion'}
                                            type={'checkbox'}
                                            label={<FormattedMessage id="preventDelete" />}
                                            onClick={() => {
                                                createCardStore.toggleProhibitUpdate()
                                                createCardStore.setSaved(false)
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Select
                                        id={'chooseOrganization'}
                                        className="mb-2"
                                        defaultValue="null"
                                        value={createCardStore.organizationOption}
                                        onChange={(e) => {
                                            handleOrganizationChange(e)
                                        }}>
                                        <option value="null" disabled>
                                            <FormattedMessage id="organization" />
                                        </option>
                                        {baseStore.organizations.map((el) => {
                                            if (el.id == createCardStore.organizationOption) {
                                                return (
                                                    <option defaultValue={el.id} key={el.id} value={el.id} selected>
                                                        {el.name}
                                                    </option>
                                                )
                                            }
                                            return (
                                                <option key={el.id} value={el.id}>
                                                    {el.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>
                                    <Form.Select
                                        id={'chooseOwner'}
                                        className="mb-2"
                                        defaultValue="null"
                                        onChange={(e) => {
                                            createCardStore.setOwnerOption(e.target.value)
                                        }}>
                                        <option value="null" disabled>
                                            <FormattedMessage id="owner" />
                                        </option>
                                        {owners.map((el) => {
                                            if (el.id == createCardStore.ownerOption) {
                                                return (
                                                    <option defaultValue={el.id} key={el.id} value={el.id} selected>
                                                        {el.name}
                                                    </option>
                                                )
                                            }

                                            return (
                                                <option key={el.id} value={el.id}>
                                                    {el.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form>
                            )}

                            <button
                                className="dashboard-button"
                                disabled={createCardStore.saved}
                                ref={targetSaveButton}
                                onMouseOver={() => setShowTooltip(true)}
                                onMouseOut={() => setShowTooltip(false)}
                                onClick={async () => {
                                    await createCardStore.saveCard()
                                    // nav(`${getCardsRoute(createCardStore.cardId)}?id=${createCardStore.cardId}`)
                                    nav(`${getCardsRoute(createCardStore.cardId)}`)
                                }}>
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
                                <span>
                                    <FormattedMessage id="buttonToSave" />
                                </span>
                            </button>

                            {createCardStore.saved && (
                                <Overlay target={targetSaveButton.current} show={showTooltip} placement="right">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}>
                                            <FormattedMessage id="newCardWarningModalText" />
                                        </Tooltip>
                                    )}
                                </Overlay>
                            )}
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
                    <div className="create-new-card__add-new-property mb-3">
                        {properties.map((el) => {
                            return (
                                <Form.Group
                                    className="mb-4 d-flex align-items-center flex-row create-new-card__new-property"
                                    onClick={(e) => {
                                        handleAddNewProperties(el.id, el.name, el.isLink)
                                    }}
                                    role="button">
                                    <Form.Label
                                        className="me-2 new-property__label"
                                        role="button">
                                        <FormattedMessage id={el.name} />
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={placeholder}
                                        role="button"
                                    />
                                </Form.Group>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>
            {!createCardStore.saved && (
                <CommonDialog
                    formattesMessageTitleId={'saveBeforeExit'}
                    show={showDialog}
                    handleSubmit={async () => {
                        await createCardStore.saveCard()
                        nav(CARDS_ROUTE)
                    }}
                    handleClose={() => nav(CARDS_ROUTE)}
                    setShow={setShowDialog}
                />
            )}
        </Container>
    )
})

export default CreateNewCard
