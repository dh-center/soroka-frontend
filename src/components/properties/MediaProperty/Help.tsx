import { Eye, Star } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { ListGroup } from 'react-bootstrap'

const Help = () => (
    <div className="p-3">
        <FormattedMessage
            id="mediaHelp"
            values={{
                p: (chunks) => <p>{chunks}</p>,
                div: (chunks) => <div>{chunks}</div>,
                ul: (chunks) => <ListGroup variant="flush">{chunks}</ListGroup>,
                li: (chunks) => <ListGroup.Item>{chunks}</ListGroup.Item>,
                span: (chunks) => <span>{chunks}</span>,
                eye: <Eye size={15} className="align-baseline mx-1" />,
                star: <Star size={15} className="align-baseline mx-1" />
            }}
        />
    </div>
)

export default Help
