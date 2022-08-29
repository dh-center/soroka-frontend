import { Button } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'

const IconButton = ({ onClick, messageId, variant, disabled, IconComponent = Plus }) => {
    return (
        <Button variant={variant} disabled={disabled} onClick={() => onClick()} className="d-flex align-items-center">
            <IconComponent size={24} className="me-1" />
            <FormattedMessage id={messageId} />
        </Button>
    )
}

export default IconButton
