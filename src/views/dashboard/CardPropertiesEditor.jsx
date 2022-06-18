import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import Property from '../../components/dashboard/Property'
import { observer } from 'mobx-react'
import { cardStore } from './CardPage'
import { Plus } from 'react-bootstrap-icons'
import { propertiesStore } from '../../App'
import { PROPERTIES } from '../../stores/propertiesStore'

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
    const { properties } = propertiesStore
    const intl = useIntl()
    const placeholder = intl.formatMessage({ id: 'placeholderNewCard' })

    const [showAddingProp, setShowAddingProp] = useState(false)

    const everyPropertyAdded = cardStore.observingArray.filter((el) => !el.hidden).length === properties.length

    const handleAddNewProperties = (property) => {
        const { name, id, dataTypeId } = property
        cardStore.addNewProperties(name, id, dataTypeId)

        setShowAddingProp(false)
    }

    const renderProperty = (element, index) => (
        <Row key={`${element.id}-${index}`} className={element.hidden ? 'd-none' : ''}>
            <Col md="3" className="g-0">
                <FormattedMessage id={PROPERTIES[element.name].labelId} />
            </Col>
            <Col md="9" className="g-0">
                <Property element={element} index={index} store={cardStore} />
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
                        {properties.map((el) => {
                            const cardHasProp = cardStore.observingArray
                                .filter((prop) => !prop.hidden)
                                .some((prop) => prop.propertyId === el.id)

                            return (
                                <Button
                                    key={el.name}
                                    variant="outline-primary"
                                    className="mb-2 me-2"
                                    disabled={cardHasProp}
                                    onClick={() => {
                                        handleAddNewProperties(el)
                                    }}>
                                    <FormattedMessage id={PROPERTIES[el.name].labelId} />
                                </Button>
                            )
                        })}
                    </Modal.Body>
                </Modal>
            </Container>
        </Form>
    )
})

export default CardPropertiesEditor
