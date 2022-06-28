import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { TYPES } from '../../stores/propertiesStore'
import ModalDialog from '../common/ModalDialog'

const ControlPanel = ({ hasHelp, setHelpButtonPressed, setShowDialogModal, helpButtonPressed }) => (
  <Col className="d-flex justify-content-end">
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
  </Col>
)

const Property = observer(({ element, index, store }) => {
  const [showDialogModal, setShowDialogModal] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [helpButtonPressed, setHelpButtonPressed] = useState(false)

  const dataType = element.dataType || element.property.dataType
  const typeDefinition = TYPES[dataType.name]
  const { renderForm, hasHelp } = typeDefinition

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
            value: store.observingArray[index]?.data,
            onChange: (value, validation) => {
              store.changeValue(index, value, validation)
            },
            showHelp: helpButtonPressed
          })}
        </Form.Group>
      </Row>
      <Row className={showPanel ? 'visible' : 'invisible'}>
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
            store.deletePropertyLocal(element)
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
