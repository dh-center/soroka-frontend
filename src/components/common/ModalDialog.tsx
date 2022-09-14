import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

type ModalDialogProps = {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    onClose: (acepted: boolean) => void
    header?: React.ReactElement
    body: React.ReactElement
    ok: React.ReactElement
    cancel: React.ReactElement
    mustDecide?: boolean
    okVariant?: string
}

const ModalDialog = ({
    show,
    setShow,
    onClose,
    header,
    body,
    ok,
    cancel,
    mustDecide = false,
    okVariant = 'primary'
}: ModalDialogProps) => {
    const handleClose = (accepted: boolean) => {
        onClose(accepted)
        setShow(false)
    }

    return (
        <Modal backdrop={mustDecide ? 'static' : undefined} show={show} onHide={() => handleClose(false)}>
            {header && (
                <Modal.Header closeButton={!mustDecide}>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
            )}
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose(false)}>
                    {cancel ?? <FormattedMessage id="cancel" />}
                </Button>
                <Button variant={okVariant} onClick={() => handleClose(true)}>
                    {ok ?? <FormattedMessage id="ok" />}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDialog
