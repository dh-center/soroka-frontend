import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import IconButton from 'components/common/IconButton'
import { FormattedMessage, useIntl } from 'react-intl'
import Property from 'components/dashboard/Property'
import { observer } from 'mobx-react'
import { useStore } from 'stores/rootStore'
import { Property as PropertyType } from 'stores/propertiesStore'

type AddPropertyButtonProps = {
    onClick: () => void
    everyPropertyAdded: boolean
}

const AddPropertyButton = ({ everyPropertyAdded, onClick }: AddPropertyButtonProps) => {
    const PropertiesAddedTooltip = () => (
        <Tooltip id="button-tooltip">
            <FormattedMessage id="tooltipAllPropertiesAlreadyAdded" />
        </Tooltip>
    )

    return (
        <OverlayTrigger placement="top" overlay={everyPropertyAdded ? PropertiesAddedTooltip : <></>}>
            <span className="d-inline-block">
                <IconButton
                    messageId="buttonAddProperty"
                    variant="outline-primary"
                    onClick={onClick}
                    disabled={everyPropertyAdded}
                />
            </span>
        </OverlayTrigger>
    )
}

const CardPropertiesEditor = observer(() => {
    const { propertiesStore, cardStore } = useStore()

    const { properties } = propertiesStore
    const intl = useIntl()
    const placeholder = intl.formatMessage({ id: 'placeholderNewCard' })

    const [showAddingProp, setShowAddingProp] = useState(false)

    const everyPropertyAdded = cardStore.observingArray.filter((el) => !el.hidden).length === properties.length

    const handleAddNewProperties = (property: PropertyType) => {
        cardStore.addNewProperties(property.name)
        setShowAddingProp(false)
    }

    // todo: remove any
    const renderProperty = (element: any, index: number) => (
        <Row key={`${element.id}-${index}`} className={element.hidden ? 'd-none' : ''}>
            <Col md="3" className="g-0">
                <FormattedMessage
                    id={
                        propertiesStore.getPropertyByName(element.name || element.property.name)?.labelId ||
                        'unknownProperty'
                    }
                />
            </Col>
            <Col md="9" className="g-0">
                <Property element={element} index={index} />
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
                {cardStore.observingArray.map((element, index) => {
                    return renderProperty(element, index)
                })}
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
                                .some((prop) => prop.propertyId === el.propertyId)
                            return (
                                <Button
                                    key={el.name}
                                    variant="outline-primary"
                                    className="mb-2 me-2"
                                    disabled={cardHasProp}
                                    onClick={() => {
                                        handleAddNewProperties(el)
                                    }}>
                                    <FormattedMessage
                                        id={
                                            propertiesStore.getPropertyByName(el.name || el.property.name)?.labelId ||
                                            'unknownProperty'
                                        }
                                    />
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
