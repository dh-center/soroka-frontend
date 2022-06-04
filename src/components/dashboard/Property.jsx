import axios from 'axios'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import CommonDialog from '../common/CommonDialog'

const Property = observer(({ type = 'textInput', element, index, store }) => {
    const [showDialogModal, setShowDialogModal] = useState(false)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [propertyDeleted, setPropertyDeleted] = useState(false)
    const [showHelpButton, setShowHelpButton] = useState(false)
    const [helpButtonPressed, setHelpButtonPressed] = useState(false)

    const [formateDateIsCorrect, setFormateDateIsCorrect] = useState(false)
    return (
        <div key={element.id}>
            {!propertyDeleted && (
                <div
                    onMouseEnter={() => {
                        setShowHelpButton(true)
                        setShowDeleteButton(true)
                    }}
                    onMouseLeave={() => {
                        setShowDeleteButton(false)
                        setShowHelpButton(false)
                    }}
                    className="mb-4 d-flex flex-column align-items-end"
                    key={element.id}>
                    <Form.Group className="mb-2 d-flex align-items-center flex-row w-100">
                        <Form.Label className="me-2 col-xl-2 col-sm-3">
                            {<FormattedMessage id={element.name} />}
                        </Form.Label>
                        {type === 'textInput' && (
                            <Form.Control
                                as="textarea"
                                style={{ height: '84px' }}
                                type="text"
                                placeholder=""
                                // value={element.data}
                                value={store.observingArray[index]?.data}
                                onChange={(event) => {
                                    store.changeValue(index, event.target.value)
                                }}
                            />
                        )}
                        {type === 'date' && (
                            <div className="w-100 p-4 border">
                                <Form.Group className="mb-2">
                                    <Form.Select className="mb-2">
                                        <option value="1">Григорианский календарь</option>
                                        <option value="2">Юлианский (старый стиль) календарь</option>
                                    </Form.Select>
                                    <Form.Control
                                        type="date"
                                        placeholder="12.04.1689"
                                        className="w-25"
                                        style={{
                                            border: formateDateIsCorrect ? '1px solid black' : '1px dashed red'
                                        }}
                                    />
                                    {!formateDateIsCorrect && <Form.Text className="text-danger">Такой даты в календаре нет</Form.Text>}
                                </Form.Group>
                                {helpButtonPressed && (
                                    <div className="">
                                        <p>
                                            Все даты хранятся в формате julian date и могут сравниваться между собой.
                                            При смене календаря введённые даты не меняются
                                        </p>
                                        <p> На данный момент поддерживаются юлианский и григорианский календарь.</p>
                                        <p>Например, можно ввести точные даты “12.04.1698”</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </Form.Group>
                    <Row className="d-flex ">
                        {showHelpButton && (
                            <Col>
                                <Button
                                    variant="primary"
                                    onClick={() => setHelpButtonPressed((prevValue) => !prevValue)}>
                                    Помощь
                                </Button>
                            </Col>
                        )}

                        {showDeleteButton && (
                            <Col>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => {
                                        setShowDialogModal(true)
                                    }}>
                                    Удалить
                                </button>
                            </Col>
                        )}
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
