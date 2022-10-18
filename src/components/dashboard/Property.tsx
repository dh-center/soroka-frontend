import { useState, useMemo, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import ModalDialog from 'components/common/ModalDialog'
import { useStore } from 'stores/rootStore'

type PropertyProps = {
    element: { [key: string]: any }
    index: number
}

type ControlPanelProps = {
    hasHelp: boolean
    setHelpButtonPressed: (value: boolean) => void
    setShowDialogModal: (value: boolean) => void
    helpButtonPressed: boolean
}

const ControlPanel = ({ hasHelp, setHelpButtonPressed, setShowDialogModal, helpButtonPressed }: ControlPanelProps) => (
    <div className="d-flex justify-content-end">
        {hasHelp && (
            <Button
                variant="outline-secondary"
                className="text-nowrap me-2"
                onClick={() => setHelpButtonPressed(!helpButtonPressed)}>
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

const Property = observer(({ element, index }: PropertyProps) => {
    const [showDialogModal, setShowDialogModal] = useState(false)
    const [showPanel, setShowPanel] = useState(false)
    const [helpButtonPressed, setHelpButtonPressed] = useState(false)

    const { propertiesStore, cardStore } = useStore()
    const typeDefinition = propertiesStore.getPropertyType(element.name || element.property.name)
    const { renderForm, hasHelp } = typeDefinition

    const onChange = useCallback(
        // todo: remove any
        (value: any, validation = true) => {
            cardStore.changeValue(index, typeDefinition.formatToApi(value), validation)
        },
        [index, cardStore, typeDefinition]
    )

    const form = useMemo(
        () =>
            renderForm({
                value: cardStore.observingArray[index]?.data,
                onChange,
                showHelp: helpButtonPressed
            }),
        [helpButtonPressed, cardStore.observingArray, onChange, index, renderForm]
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
                <Form.Group className="mb-2 d-flex align-items-start flex-column w-100">{form}</Form.Group>
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
                onClose={(accepted: boolean) => {
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
