import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Overlay, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import Property from '../../components/dashboard/Property'
import { observer } from 'mobx-react'
import { cardStore } from './CardPage'
import { Plus, PlusCircle } from 'react-bootstrap-icons'
import { CardsAPI } from '../../api/cards'

const AddPropertyButton = ({ everyPropertyAdded, onClick }) => {
    const PropertiesAddedTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <FormattedMessage id="tooltipAllPropertiesAlreadyAdded" />
        </Tooltip>
    )

    return (
        <OverlayTrigger placement="top" overlay={everyPropertyAdded ? PropertiesAddedTooltip : <></>}>
            <span className="d-inline-block">
                <Button
                    variant="outline-primary"
                    disabled={everyPropertyAdded}
                    onClick={() => onClick()}
                    className="d-flex align-items-center">
                    <Plus className="me-1" />
                    <FormattedMessage id="buttonAddProperty" />
                </Button>
            </span>
        </OverlayTrigger>
    )
}

const CardPropertiesEditor = observer(() => {
    const intl = useIntl()
    const placeholder = intl.formatMessage({ id: 'placeholderNewCard' })

    const [properties, setProperties] = useState([{}])
    useEffect(() => {
        CardsAPI.getCardsProperties().then((res) => {
            setProperties(res.data)
        })
    }, [])
    
    const [showAddingProp, setShowAddingProp] = useState(false)

    const everyPropertyAdded = cardStore.observingArray.filter((el) => !el.hidden).length === properties.length

    const handleAddNewProperties = (id, name) => {
        cardStore.addNewProperties(name, id)

        setShowAddingProp(false)
    }

    const renderProperty = (element, index) => (
        <Row id={`${element.id}-${index}`} className={element.hidden ? 'd-none' : ''}>
            <Col md="3" className="g-0">
                <FormattedMessage id={element.name} />
            </Col>
            <Col md="9" className="g-0">
                <Property
                    element={element}
                    index={index}
                    store={cardStore}
                    className={element.hidden ? 'd-none' : ''}
                />
            </Col>
        </Row>
    )

    return (
        <Form>
            <Container className="g-0">
                <Row className="pb-2 mb-2">
                    <Col md="3" className="g-0">
                        <FormattedMessage id="nameOfCard" />
                    </Col>
                    <Col md="9" className="g-0">
                        <Form.Control
                            type="text"
                            placeholder={placeholder}
                            defaultValue={cardStore.nameOfCard}
                            onChange={(event) => {
                                cardStore.changeNameOfCard(event.target.value)
                            }}
                        />
                    </Col>
                </Row>
                {cardStore.observingArray.map((element, index) => renderProperty(element, index))}
                <Row>
                    <Col>
                        <AddPropertyButton
                            onClick={() => setShowAddingProp(true)}
                            everyPropertyAdded={everyPropertyAdded}
                        />
                    </Col>
                </Row>
            </Container>
            <Container>
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

                                let propClassName =
                                    'mb-4 d-flex align-items-center flex-row create-new-card__new-property'
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
            </Container>
        </Form>
    )
})

export default CardPropertiesEditor
