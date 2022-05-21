import React, { useEffect, useRef, useState } from 'react'
import './CardPage.css'
import { Col, Container, Form, Modal, Overlay, Row, Tooltip } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import './dashboardGlobal.css'
import { observer } from 'mobx-react'
import ChangeCardStore from '../../stores/changeCardStore'
import { CARDS_ROUTE } from '../../utils/routes'
import { FormattedMessage, useIntl } from 'react-intl'
import { CardsAPI } from '../../api/cards'
import CommonDialog from '../../components/common/CommonDialog'
import { USER_ROLES } from '../../utils/constants'
import Property from '../../components/dashboard/Property'

const changeCardStore = new ChangeCardStore()

const CardPage = observer(() => {
    const intl = useIntl()
    const placeholder = intl.formatMessage({ id: 'placeholderNewCard' })

    // const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [nameOfCard, setNameOfCard] = useState()
    const [show, setShow] = useState(false)
    const [showSaveModal, setShowSaveModal] = useState(false)
    const [cardInfo, setCardInfo] = useState({})
    const [showDialogModal, setShowDialogModal] = useState(false)
    const [propertieDeleted, setPropertieDeleted] = useState(false)
    const [propertieId, setPropertieId] = useState(1)
    const target = useRef(null)
    const { id } = useParams()

    const handleSave = () => {
        changeCardStore.saveProperties()
        setShowSaveModal(true)
        changeCardStore.isUserNotChangedProperties = true
    }

    async function handleDelete() {
        await CardsAPI.deleteFilledPropertiesByCardId(cardInfo.id, {
            filledPropertyId: propertieId
        })
        setPropertieDeleted(!propertieDeleted)
    }

    useEffect(() => {
        console.log(changeCardStore.observingArray)
        changeCardStore.getPropertiesFromCardById(id)
        changeCardStore.setOrganiztionAndOwner()
        CardsAPI.getCardByid(id).then((res) => {
            setCardInfo(res.data)
            setNameOfCard(res.data.name)
            changeCardStore.setCardInfo(res.data)
        })
    }, [])

    useEffect(() => {
        changeCardStore.getPropertiesFromCardById(id)
    }, [propertieDeleted])

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
                            <h3
                                className="current-card__current
                            -title">
                                {changeCardStore.nameOfCard}
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
                                            value={changeCardStore.nameOfCard}
                                            onChange={(event) => changeCardStore.changeNameOfCard(event.target.value)}
                                        />
                                    </Form.Group>
                                    {changeCardStore.observingArray.map((element, index) => {
                                        // if (element.type == 'text') {
                                        return (
                                            <Property
                                                element={element}
                                                index={index}
                                                store={changeCardStore}
                                                // showDeleteButton={showDeleteButton}
                                                // setShowDeleteButton={setShowDeleteButton}
                                                setShowDialogModall = {setShowDialogModal}
                                            />
                                            // <div className="mb-4 d-flex flex-column align-items-end" key={element.id}>
                                            //     <Form.Group className="mb-2 d-flex align-items-center flex-row w-100">
                                            //         <Form.Label className="me-2 col-xl-2 col-sm-3">
                                            //             {element.name}
                                            //         </Form.Label>
                                            //         <Form.Control
                                            //             as="textarea"
                                            //             style={{ height: '84px' }}
                                            //             type="text"
                                            //             placeholder=""
                                            //             value={element.data}
                                            //             onChange={(event) => {
                                            //                 changeCardStore.changeValue(index, event.target.value)
                                            //             }}
                                            //             onFocus={() => {
                                            //                 if (!cardInfo.preventDelete) setShowDeleteButton(true)
                                            //             }}
                                            //         />
                                            //     </Form.Group>
                                            //     {showDeleteButton && (
                                            //         <button
                                            //             className="btn btn-danger"
                                            //             type="button"
                                            //             onClick={() => {
                                            //                 setPropertieId(element.id)

                                            //                 setShowDialogModal(true)
                                            //             }}>
                                            //             Удалить
                                            //         </button>
                                            //     )}
                                            // </div>
                                        )
                                    })}
                                </div>

                                <button
                                    className="create-new-card__button dashboard-button d-flex align-items-center offset-md-1 dashboard-button--disabled "
                                    ref={target}
                                    onMouseOver={() => setShow(true)}
                                    onMouseOut={() => setShow(false)}
                                    onClick={(event) => event.preventDefault()}>
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

                                <Overlay target={target.current} show={show} placement="right">
                                    {(props) => (
                                        <Tooltip id="overlay-example" {...props}>
                                            <FormattedMessage id="tooltipAllPropertiesAlreadyAdded" />
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
                            {changeCardStore.hasEmptyProperties && (
                                <p>
                                    <FormattedMessage id="changeCardWarningModalText" />
                                </p>
                            )}
                            {changeCardStore.userRole == USER_ROLES.admin && (
                                <Form>
                                    <Form.Group className="mb-2">
                                        <Form.Check
                                            id={'preventDeletion'}
                                            type={'checkbox'}
                                            label={<FormattedMessage id="preventDelete" />}
                                            onClick={() => {
                                                changeCardStore.toggleProhibitUpdate()
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Select
                                        id={'chooseOrganization'}
                                        className="mb-2"
                                        defaultValue="10"
                                        onClick={(e) => {
                                            changeCardStore.setOrganizationOption(e.target.value)
                                        }}>
                                        <option value="10" disabled>
                                            <FormattedMessage id="organization" />
                                        </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                    <Form.Select
                                        id={'chooseOwner'}
                                        className="mb-2"
                                        defaultValue="10"
                                        onClick={(e) => {
                                            changeCardStore.setOwnerOption(e.target.value)
                                        }}>
                                        <option value="10" disabled>
                                            <FormattedMessage id="owner" />
                                        </option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                </Form>
                            )}
                            <button
                                className="dashboard-button"
                                disabled={changeCardStore.isUserNotChangedProperties}
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
            {/* <CommonDialog
                formattesMessageTitleId="deleteAlert"
                handleSubmit={async () => {
                    await CardsAPI.deleteFilledPropertiesByCardId(cardInfo.id, {
                        data: { filledPropertyId: propertieId }
                    })
                    setPropertieDeleted(!propertieDeleted)
                    setShowDialogModal(false)
                }}
                show={showDialogModal}
                setShow={setShowDialogModal}
            /> */}
            <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
                <Modal.Body>
                    <FormattedMessage id="saveCard" />
                </Modal.Body>
            </Modal>
        </Container>
    )
})

export default CardPage
