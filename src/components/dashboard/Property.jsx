import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import CommonDialog from '../common/CommonDialog'

const Property = observer(({ type = 'textInput', element, index, store }) => {
    const [showDialogModal, setShowDialogModal] = useState(false)
    const [propertyDeleted, setPropertyDeleted] = useState(false)
    const [showPanel, setShowPanel] = useState(false)
    const [helpButtonPressed, setHelpButtonPressed] = useState(false)

    const isDateFormatCorrect = false
    return (
        <div key={element.id}>
            {!propertyDeleted && (
                <div
                    onMouseEnter={() => {
                        setShowPanel(true)
                    }}
                    onMouseLeave={() => {
                        setShowPanel(false)
                    }}
                    className="mb-4 d-flex flex-column align-items-end"
                    key={element.id}>
                    <Form.Group className="mb-2 d-flex align-items-center flex-row w-100">
                        <div className="w-100 p-4 border">
                            {type === 'textInput' && (
                                <Form.Control
                                    as="textarea"
                                    style={{ height: '84px' }}
                                    type="text"
                                    placeholder=""
                                    value={store.observingArray[index]?.data}
                                    onChange={(event) => {
                                        store.changeValue(index, event.target.value)
                                    }}
                                />
                            )}
                            {type === 'date' && (
                                <>
                                    <Form.Group className="mb-2">
                                        <Form.Select className="mb-2">
                                            <option value="1">
                                                <FormattedMessage id="calendarGrigorian" />
                                            </option>
                                            <option value="2">
                                                <FormattedMessage id="calendarJulian" />
                                            </option>
                                        </Form.Select>
                                        <Form.Control
                                            type="text"
                                            placeholder="12.04.1689"
                                            className={`w-25 ${isDateFormatCorrect ? '' : 'is-invalid'}`}
                                        />
                                        <div className="invalid-feedback">
                                            <FormattedMessage id="noSuchDate" />
                                        </div>
                                    </Form.Group>
                                    {helpButtonPressed && (
                                        <div>
                                            <FormattedMessage
                                                id="calendarHelp"
                                                values={{
                                                    p: (chunks) => <p>{chunks}</p>
                                                }}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </Form.Group>
                    <Row className={`d-flex ${showPanel ? 'visible' : 'invisible'}`}>
                        <Col>
                            <Button
                                variant="primary"
                                className="text-nowrap"
                                onClick={() => setHelpButtonPressed((prevValue) => !prevValue)}>
                                <FormattedMessage id={helpButtonPressed ? 'hideHelp' : 'help'} />
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    setShowDialogModal(true)
                                }}>
                                <FormattedMessage id="delete" />
                            </Button>
                        </Col>
                    </Row>
                </div>
            )}

            <CommonDialog
                formattesMessageTitleId="deleteAlert"
                handleSubmit={async () => {
                    store.deletePropertyLocal(element)
                    setPropertyDeleted(true)
                    setShowDialogModal(false)
                }}
                show={showDialogModal}
                setShow={setShowDialogModal}
            />
        </div>
    )
})

export default Property
