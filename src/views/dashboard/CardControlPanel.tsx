import { Alert, Button, Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { observer } from 'mobx-react'
import { USER_ROLES } from 'utils/constants'
import { useStore } from 'stores/rootStore'
import CardAdminControls from './CardAdminControls'

type CardControlPanelProps = {
    handleSave: () => void
}

const CardControlPanel = observer(({ handleSave }: CardControlPanelProps) => {
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
            <Button
                variant="primary"
                disabled={!cardStore.changed || cardStore.pendingActions || validationFailed}
                onClick={handleSave}>
                <FormattedMessage id="save" />
            </Button>
        </Form>
    )
})

export default CardControlPanel
