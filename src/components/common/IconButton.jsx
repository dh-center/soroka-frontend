import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'

const IconButton = ({ everyPropertyAdded, onClick, textId, variantValue }) => {
    const PropertiesAddedTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <FormattedMessage id="tooltipAllPropertiesAlreadyAdded" />
        </Tooltip>
    )

    return (
        <OverlayTrigger placement="top" overlay={everyPropertyAdded ? PropertiesAddedTooltip : <></>}>
            <span className="d-inline-block">
                <Button
                    variant={variantValue}
                    disabled={everyPropertyAdded}
                    onClick={() => onClick()}
                    className="d-flex align-items-center">
                    <Plus size={24} className="me-1" />
                    <FormattedMessage id={textId} />
                </Button>
            </span>
        </OverlayTrigger>
    )
}

export default IconButton
