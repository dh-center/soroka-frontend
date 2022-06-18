import React from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { USER_ROLES } from '../../utils/constants'
import CardAdminControls from './CardAdminControls'
import { observer } from 'mobx-react'
import { cardStore } from './CardPage'

const CardControlPanel = observer(({ handleSave }) => (
    <Form className="p-2 border rounded">
        {/* todo: that is not working and never did */}
        {cardStore.hasEmptyProperties && (
            <Alert variant="info">
                <FormattedMessage id="changeCardWarningModalText" />
            </Alert>
        )}
        {cardStore.userRole == USER_ROLES.admin && <CardAdminControls cardStore={cardStore} />}
        <Button variant="primary" disabled={!cardStore.changed} onClick={handleSave}>
            <FormattedMessage id="save" />
        </Button>
    </Form>
))

export default CardControlPanel
