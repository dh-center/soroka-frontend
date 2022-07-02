import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { propertiesStore } from '../../App'
import ModalDialog from '../common/ModalDialog'

const ControlPanel = ({ hasHelp, setHelpButtonPressed, setShowDialogModal, helpButtonPressed }) => (
    <div className="d-flex justify-content-end">
        {hasHelp && (
            <Button
                variant="outline-secondary"
                className="text-nowrap me-2"
                onClick={() => setHelpButtonPressed((prevValue) => !prevValue)}>
                <FormattedMessage id={helpButtonPressed ? 'hideHelp' : 'help'} />
            </Button>
        )}
        <Button
            variant="outline-danger"
            onClick={() => {
                setShowDialogModal(true)
            }}>
            <FormattedMessage id="delete" />
        </Button>
    </div>
)

const Property = observer(({ element, index, cardStore }) => {
    const [showDialogModal, setShowDialogModal] = useState(false)
    const [showPanel, setShowPanel] = useState(false)
    const [helpButtonPressed, setHelpButtonPressed] = useState(false)

    const typeDefinition = propertiesStore.getPropertyType(element.name || element.property.name)
    const { renderForm, hasHelp } = typeDefinition

    const onChange = useCallback(
        (value, validation = true) => {
            cardStore.changeValue(index, typeDefinition.formatToApi(value), validation)
        },
        [index, cardStore]
    )

    return (
        <Container
            key={element.name}
            onMouseEnter={() => {
                setShowPanel(true)
            }}
            onMouseLeave={() => {
                setShowPanel(false)
            }}>
            <Row>
                <Form.Group className="mb-2 d-flex align-items-start flex-column w-100">
                    {renderForm({
                        value: cardStore.observingArray[index]?.data,
                        onChange,
                        showHelp: helpButtonPressed
                    })}
                </Form.Group>
            </Row>
            <Row className={`mb-3 ${showPanel ? 'visible' : 'invisible'}`}>
                <ControlPanel
                    hasHelp={hasHelp}
                    setHelpButtonPressed={setHelpButtonPressed}
                    helpButtonPressed={helpButtonPressed}
                    setShowDialogModal={setShowDialogModal}
                />
            </Row>

            <ModalDialog
                body={<FormattedMessage id="deleteAlert" />}
                show={showDialogModal}
                setShow={setShowDialogModal}
                onClose={(accepted) => {
                    if (accepted) {
                        cardStore.deletePropertyLocal(element)
                        setShowDialogModal(false)
                    }
                }}
                ok={<FormattedMessage id="yes" />}
                okVariant="danger"
                cancel={<FormattedMessage id="no" />}
            />
        </Container>
    )
})

export default Property
