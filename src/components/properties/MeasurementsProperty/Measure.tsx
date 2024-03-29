import { Form, InputGroup } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { Measurement } from './MeasurementsProperty'

type MeasureProps = {
    measure: Measurement
    onChange: (measure: Measurement, value: number | undefined) => void
    value: number | undefined
}

const Measure = ({ measure, onChange, value }: MeasureProps) => {
    const intl = useIntl()
    return (
        <InputGroup key={measure.placeholderMessageId} className="d-inline-flex" style={{ maxWidth: '33%' }}>
            <InputGroup.Text>{intl.formatMessage({ id: measure.smallCaptionMessageId })}</InputGroup.Text>
            <Form.Control
                placeholder={intl.formatMessage({ id: measure.placeholderMessageId })}
                type="number"
                defaultValue={value}
                onChange={(e) => {
                    onChange(measure, Number(e.target.value))
                }}
            />
        </InputGroup>
    )
}

export default Measure
