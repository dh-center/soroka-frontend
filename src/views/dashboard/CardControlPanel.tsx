import React from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { USER_ROLES } from '../../utils/constants'
import CardAdminControls from './CardAdminControls'
import { observer } from 'mobx-react'
import { useStore } from '../../stores/rootStore'

type CardControlPanel = {
    handleSave: () => void
}

const CardControlPanel = observer(({ handleSave }: CardControlPanel) => {
    const { cardStore } = useStore()
    const validationFailed = cardStore.observingArray.some(({ validation }) => !validation)

    return (
        <Form className="p-2 border rounded">
            {/* todo: that is not working and never did */}
            {/* @ts-ignore*/}
            {cardStore.hasEmptyProperties && (
                <Alert variant="info">
                    <FormattedMessage id="changeCardWarningModalText" />
                </Alert>
            )}
            {cardStore.userRole == USER_ROLES.admin && <CardAdminControls />}
            <Button variant="primary" disabled={!cardStore.changed || validationFailed} onClick={handleSave}>
                <FormattedMessage id="save" />
            </Button>
        </Form>
    )
})

export default CardControlPanel
