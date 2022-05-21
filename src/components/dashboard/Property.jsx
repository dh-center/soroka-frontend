import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import CommonDialog from '../common/CommonDialog'

const Property =observer( ({ element, index, store, setShowDialogModall }) => {
    const [showDialogModal, setShowDialogModal] = useState(false)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    return (
        <>
            <div className="mb-4 d-flex flex-column align-items-end" key={element.id}>
                <Form.Group className="mb-2 d-flex align-items-center flex-row w-100">
                    <Form.Label className="me-2 col-xl-2 col-sm-3">{element.name}</Form.Label>
                    <Form.Control
                        as="textarea"
                        style={{ height: '84px' }}
                        type="text"
                        placeholder=""
                        value={element.data}
                        onChange={(event) => {
                            store.changeValue(index, event.target.value)
                        }}
                        onFocus={() => {
                            setShowDeleteButton(true)
                        }}
                        
                    />
                </Form.Group>
                {showDeleteButton && (
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => {
                            // setPropertieId(element.id)
                            setShowDialogModal(true)
                        }}>
                        Удалить
                    </button>
                )}
            </div>
            <CommonDialog
                formattesMessageTitleId="deleteAlert"
                handleSubmit={async () => {
                    // await CardsAPI.deleteFilledPropertiesByCardId(cardInfo.id, {
                    //     data: { filledPropertyId: propertieId }
                    // })
                    store.deletePropertyLocal(element.id)

                    // setPropertieDeleted(!propertieDeleted)
                    setShowDialogModal(false)
                }}
                show={showDialogModal}
                setShow={setShowDialogModal}
            />
        </>
    )
})

export default Property
