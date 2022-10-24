import { Alert, Button, Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { observer } from 'mobx-react'
import { USER_ROLES } from 'utils/constants'
import { Trash } from 'react-bootstrap-icons'
import { useStore } from 'stores/rootStore'
import CardAdminControls from './CardAdminControls'

type CardControlPanelProps = {
    handleSave: () => void
    handleDelete: () => void
}

const CardControlPanel = observer(({ handleSave, handleDelete }: CardControlPanelProps) => {
    const { cardStore } = useStore()
    const validationFailed = cardStore.observingArray.some(({ validation }) => !validation)

    return (
        <Form className="p-2 border rounded">
            {/* todo: that is not working and never did */}
            {cardStore.hasEmptyProperties && (
                <Alert variant="info">
                    <FormattedMessage id="changeCardWarningModalText" />
                </Alert>
            )}
            {cardStore.userRole === USER_ROLES.admin && <CardAdminControls />}
            <div className="d-flex flex-row justify-content-between">
                <Button variant="primary" disabled={!cardStore.changed || validationFailed} onClick={handleSave}>
                    <FormattedMessage id="save" />
                </Button>
                <Button
                    className="d-flex align-items-center gap-2"
                    variant="danger"
                    disabled={!cardStore.cardInfo.id}
                    onClick={handleDelete}>
                    <FormattedMessage id="delete" />
                    <Trash />
                </Button>
            </div>
        </Form>
    )
})

export default CardControlPanel
