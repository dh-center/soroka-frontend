import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import CommonDialog from '../common/CommonDialog'

const Property = observer(({ element, index, store }) => {
    const [showDialogModal, setShowDialogModal] = useState(false)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [propertyDeleted, setPropertyDeleted] = useState(false)
    return (
        <div key={element.id}>
            {!propertyDeleted && (
                <div
                    onMouseEnter={() => setShowDeleteButton(true)}
                    onMouseLeave={() => setShowDeleteButton(false)}
                    className="mb-4 d-flex flex-column align-items-end"
                    key={element.id}>
                    <Form.Group className="mb-2 d-flex align-items-center flex-row w-100">
                        <Form.Label className="me-2 col-xl-2 col-sm-3">{element.name}</Form.Label>
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
                    </Form.Group>
                    {showDeleteButton && (
                        <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => {
                                setShowDialogModal(true)
                            }}>
                            Удалить
                        </button>
                    )}
                </div>
            )}

            <CommonDialog
                formattesMessageTitleId="deleteAlert"
                handleSubmit={async () => {
                    store.deletePropertyLocal(element.id)
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
