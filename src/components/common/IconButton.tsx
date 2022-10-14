import { Button } from 'react-bootstrap'
import { Icon, Plus } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'

type IconButtonProps = {
    messageId: string
    disabled: boolean
    IconComponent?: Icon
    variant: string
    onClick: () => void
}

const IconButton = ({ onClick, messageId, variant, disabled, IconComponent = Plus }: IconButtonProps) => (
    <Button variant={variant} disabled={disabled} onClick={() => onClick()} className="d-flex align-items-center">
        <IconComponent size={24} className="me-1" />
        <FormattedMessage id={messageId} />
    </Button>
)

export default IconButton
