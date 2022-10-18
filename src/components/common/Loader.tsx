import { Spinner } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const Loader = () => (
    <Spinner animation="border" role="status">
        <span className="visually-hidden">
            <FormattedMessage id="loading" />
        </span>
    </Spinner>
)

export default Loader
