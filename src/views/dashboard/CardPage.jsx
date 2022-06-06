import React, { useContext, useEffect, useRef, useState } from 'react'
import './CardPage.css'
import { Col, Container, Form, Modal, Overlay, Row, Tooltip } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import './dashboardGlobal.css'
import { observer } from 'mobx-react'
import CardStore from '../../stores/cardStore'
import { CARDS_ROUTE, getCreateCardRoute, getCardsRoute } from '../../utils/routes'
import { FormattedMessage, useIntl } from 'react-intl'
import { CardsAPI } from '../../api/cards'
import { USER_ROLES } from '../../utils/constants'
import Property from '../../components/dashboard/Property'
import { mainContext } from '../../context/mainContext'
import { organizationsAPI } from '../../api/organizations'

const cardStore = new CardStore()

const CardPage = observer(() => {
    const baseStore = useContext(mainContext)
    const intl = useIntl()
    const placeholder = intl.formatMessage({ id: 'placeholderNewCard' })
    const [nameOfCard, setNameOfCard] = useState('')
    const [showAddingProp, setShowAddingProp] = useState(false)
    const [show, setShow] = useState(false)
    const [showSaveModal, setShowSaveModal] = useState(false)
    const [cardInfo, setCardInfo] = useState({})
    const target = useRef(null)
    const { id } = useParams()
    const nav = useNavigate()
    const [owners, setOwners] = useState([{}])
    const [userId, setUserId] = useState('1')
    const [properties, setProperties] = useState([{}])

    const handleSave = async () => {
        await cardStore.saveProperties()
        setShowSaveModal(true)

        if (location.href.includes(getCreateCardRoute())) {
            nav(`${getCardsRoute(cardStore.cardInfo.id)}`)
        }
    }

    const handleAddNewProperties = (id, name, isLink) => {
        cardStore.addNewProperties(
            name,
            id
        )

        setShowAddingProp(false)
    }

    const handleOrganizationChange = (event) => {
        cardStore.setOrganizationOption(event.target.value)

        organizationsAPI.getOwnersById(cardStore.organizationOption).then(
            (res) => setOwners(res.data)
        )        
    }

    useEffect(() => {
        cardStore.setOrganiztionAndOwner().then(() => {
            organizationsAPI.getOwnersById(cardStore.organizationOption).then(
                (res) => setOwners(res.data)
            )
        })

        if (id) {
            cardStore.getPropertiesFromCardById(id)

            CardsAPI.getCardByid(id).then((res) => {
                setCardInfo(res.data)
                setUserId(res.data.userId)

                setNameOfCard(res.data.name)

                cardStore.setOriginNameOfCard(nameOfCard)
                cardStore.setCardInfo(res.data)
            })
        }
    }, [id])
    useEffect(
        () =>
            {CardsAPI.getCardsProperties().then((res) => {
                setProperties(res.data)
            })},
        []
    )

    useEffect(() => {}, [cardStore.saved])

    return (
        <Container>
            <Row>
                <Col md="9">
                    <Row className="mb-4 d-flex align-items-center">
                        <Col md="4">
                            <Link className="route-link" to={CARDS_ROUTE} onClick={(e) => {
                                cardStore.reset()
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
                            </Link>
                        </Col>

                        <Col md="8">
                            <h3 className="current-card__current-title">
                                {!location.href.includes(getCreateCardRoute()) && nameOfCard}
                                {location.href.includes(getCreateCardRoute()) && <FormattedMessage id="newCard" />}
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
                                                element={element} index={index} store={cardStore}
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
                                disabled={cardStore.observingArray.filter(el => !el.hidden).length === properties.length}
                                className="create-new-card__button dashboard-button d-flex align-items-center offset-md-1 "
                                ref={target}
                                onMouseOver={() => {
                                    if (cardStore.observingArray.filter(el => !el.hidden).length == properties.length) {
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
                                            onClick={() => {
                                                cardStore.setProhibitUpdate()
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Select
                                        id={'chooseOrganization'}
                                        className="mb-2"
                                        defaultValue="null"
                                        value={cardStore.organizationOption}
                                        onChange={(e) => {
                                            handleOrganizationChange(e)
                                        }}>
                                        <option value="null" disabled>
                                            <FormattedMessage id="organization" />
                                        </option>
                                        {baseStore.organizations.map((el) => {
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
                                            cardStore.setOwnerOption(e.target.value)
                                        }}>
                                        <option value="null" disabled>
                                            <FormattedMessage id="owner" />
                                        </option>
                                        {owners.map((el) => {
                                            if (el.id == userId) {
                                                return (
                                                    <option
                                                        defaultValue={el.id}
                                                        key={el.id}
                                                        value={el.id}
                                                        selected>
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
                                disabled={!cardStore.saved}
                                onClick={handleSave}>
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
                    <FormattedMessage id="saved" />
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
                            return (
                                <Form.Group
                                    className="mb-4 d-flex align-items-center flex-row create-new-card__new-property"
                                    onClick={(e) => {
                                        handleAddNewProperties(el.id, el.name, el.isLink)
                                    }}
                                    role="button">
                                    <Form.Label
                                        className="me-2 new-property__label"
                                        role="button"
                                    >
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
        </Container>
    )
})

export default CardPage
