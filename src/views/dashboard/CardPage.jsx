import React, { useContext, useEffect, useRef, useState } from 'react'
import './CardPage.css'
import { Col, Container, Form, Modal, Overlay, Row, Tooltip } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import './dashboardGlobal.css'
import { observer } from 'mobx-react'
import CardStore from '../../stores/cardStore'
import { CARDS_ROUTE, getCardById, DYNAMIC_ID, CARDS_CREATE_ROUTE } from '../../utils/routes'
import { FormattedMessage, useIntl } from 'react-intl'
import { CardsAPI } from '../../api/cards'
import { USER_ROLES } from '../../utils/constants'
import Property from '../../components/dashboard/Property'
import { mainContext } from '../../context/mainContext'
import { organizationsAPI } from '../../api/organizations'
import CommonDialog from '../../components/common/CommonDialog'

const cardStore = new CardStore()

const CardPage = observer(() => {
    const baseStore = useContext(mainContext)
    const intl = useIntl()
    const placeholder = intl.formatMessage({ id: 'placeholderNewCard' })
    const [nameOfCard, setNameOfCard] = useState('')
    const [showAddingProp, setShowAddingProp] = useState(false)
    const [show, setShow] = useState(false)
    const [showSureCancel, setShowSureCancel] = useState(false)
    const [showSaveModal, setShowSaveModal] = useState(false)
    const target = useRef(null)
    const { [DYNAMIC_ID]: id } = useParams()
    const nav = useNavigate()
    const [owners, setOwners] = useState([{}])
    const [properties, setProperties] = useState([{}])

    const handleSave = async () => {
        await cardStore.saveProperties()
        setShowSaveModal(true)

        if (location.href.includes(CARDS_CREATE_ROUTE)) {
            nav(`${getCardById(cardStore.cardInfo.id)}`)
        }
    }

    const handleAddNewProperties = (id, name) => {
        cardStore.addNewProperties(name, id)

        setShowAddingProp(false)
    }

    const handleOrganizationChange = (event) => {
        cardStore.setOrganizationOption(event.target.value)

        organizationsAPI.getOwnersById(cardStore.organizationOption).then((res) => setOwners(res.data))
    }

    useEffect(() => {
        if (id) {
            cardStore.getPropertiesFromCardById(id)

            CardsAPI.getCardByid(id).then((res) => {
                setNameOfCard(res.data.name)

                cardStore.setOriginNameOfCard(nameOfCard)
                cardStore.setCardInfo(res.data)
            })
        }

        cardStore.setOrganiztionAndOwner().then(() => {
            organizationsAPI.getOwnersById(cardStore.organizationOption).then((res) => setOwners(res.data))
        })
    }, [id])

    useEffect(() => {
        CardsAPI.getCardsProperties().then((res) => {
            setProperties(res.data)
        })
    }, [])

    useEffect(() => {}, [cardStore.changed])

    return (
        <Container>
            <Row>
                <Col md="9">
                    <Row className="mb-4 d-flex align-items-center">
                        <Col md="4">
                            <a
                                className="route-link"
                                onClick={(e) => {
                                    if (!cardStore.changed) {
                                        cardStore.reset()
                                        nav(CARDS_ROUTE)
                                        return
                                    }

                                    setShowSureCancel(true)
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
                            </a>
                        </Col>

                        <Col md="8">
                            <h3 className="current-card__current-title">
                                {location.href.includes(CARDS_CREATE_ROUTE) ? (
                                    <FormattedMessage id="newCard" />
                                ) : (
                                    nameOfCard
                                )}
                            </h3>
                        </Col>
                    </Row>

                    <Row className="justify-content-center">
                        <Col>
                            <Form>
                                <div className="current-card__properties offset-md-1">
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
                                                cardStore.changeNameOfCard(event.target.value)
                                            }}
                                        />
                                    </Form.Group>

                                    {cardStore.observingArray.map((element, index) => {
                                        return (
                                            <Property
                                                element={element}
                                                index={index}
                                                store={cardStore}
                                                className={element.hidden ? 'd-none' : ''}
                                            />
                                        )
                                    })}
                                </div>

                                <Overlay target={target.current} show={show} placement="right">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}>
                                            <FormattedMessage id="tooltipAllPropertiesAlreadyAdded" />
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </Form>

                            <button
                                disabled={
                                    cardStore.observingArray.filter((el) => !el.hidden).length === properties.length
                                }
                                className="create-new-card__button dashboard-button d-flex align-items-center offset-md-1 "
                                ref={target}
                                onMouseOver={() => {
                                    if (
                                        cardStore.observingArray.filter((el) => !el.hidden).length == properties.length
                                    ) {
                                        setShow(true)
                                    }
                                }}
                                onMouseOut={() => setShow(false)}
                                onClick={(event) => {
                                    setShowAddingProp(true)
                                }}>
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
                    <div className="current-card__save-alert">
                        <div className="save-alert">
                            {cardStore.hasEmptyProperties && (
                                <p>
                                    <FormattedMessage id="changeCardWarningModalText" />
                                </p>
                            )}
                            {cardStore.userRole == USER_ROLES.admin && (
                                <Form>
                                    <Form.Group className="mb-2">
                                        <Form.Check
                                            id={'preventDeletion'}
                                            type={'checkbox'}
                                            label={<FormattedMessage id="preventDelete" />}
                                            defaultChecked={cardStore.cardInfo.preventDelete}
                                            onClick={() => {
                                                cardStore.togglePreventDelete()
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Select
                                        id={'chooseOrganization'}
                                        className="mb-2"
                                        value={cardStore.organizationOption}
                                        onChange={(e) => {
                                            handleOrganizationChange(e)
                                        }}>
                                        <option value="null" disabled>
                                            <FormattedMessage id="organization" />
                                        </option>
                                        {baseStore.organizations.map((el, index) => {
                                            return (
                                                <option key={index} value={el.id}>
                                                    {el.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>

                                    <Form.Select
                                        id={'chooseOwner'}
                                        className="mb-2"
                                        value={cardStore.ownerOption}
                                        onChange={(e) => {
                                            cardStore.setOwnerOption(e.target.value)
                                        }}>
                                        <option value="null" disabled>
                                            <FormattedMessage id="owner" />
                                        </option>
                                        {owners.map((el, index) => {
                                            return (
                                                <option key={index} value={el.id}>
                                                    {el.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form>
                            )}

                            <button className="dashboard-button" disabled={!cardStore.changed} onClick={handleSave}>
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
                        </div>
                    </div>
                </Col>
            </Row>

            <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
                <Modal.Body>
                    <FormattedMessage id="changed" />
                </Modal.Body>
            </Modal>

            {/* Add new property */}
            <Modal show={showAddingProp} onHide={() => setShowAddingProp(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="addPropertyTitle" />
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="create-new-card__add-new-property mb-3">
                        {properties.map((el) => {
                            const cardHasProp = cardStore.observingArray
                                .filter((prop) => !prop.hidden)
                                .some((prop) => prop.propertyId === el.id)

                            let propClassName = 'mb-4 d-flex align-items-center flex-row create-new-card__new-property'
                            let propLabelClassName = 'me-2 new-property__label'

                            if (cardHasProp) {
                                propClassName += ' cursor-not-allowed'
                                propLabelClassName += ' cursor-not-allowed'
                            }

                            return (
                                <Form.Group
                                    className={propClassName}
                                    onClick={(e) => {
                                        if (cardHasProp) return
                                        handleAddNewProperties(el.id, el.name, el.isLink)
                                    }}
                                    role="button">
                                    <Form.Label className={propLabelClassName}>
                                        <FormattedMessage id={el.name} />
                                    </Form.Label>
                                    <Form.Control type="text" placeholder={placeholder} disabled={cardHasProp} />
                                </Form.Group>
                            )
                        })}
                    </div>
                </Modal.Body>
            </Modal>

            <CommonDialog
                formattesMessageTitleId={'sureCancel'}
                show={showSureCancel}
                handleSubmit={() => {
                    nav(CARDS_ROUTE)
                }}
                handleClose={() => {
                    cardStore.saveProperties().then((res) => nav(CARDS_ROUTE))
                }}
                setShow={setShowSureCancel}
            />
        </Container>
    )
})

export default CardPage
