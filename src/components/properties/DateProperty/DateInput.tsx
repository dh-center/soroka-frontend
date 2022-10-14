import { Form, InputGroup, OverlayTrigger, Stack, Tooltip } from 'react-bootstrap'
import { InfoCircle } from 'react-bootstrap-icons'
import { FormattedMessage, useIntl } from 'react-intl'

// todo: distribute into components and make necessary abstractions (all have showHelp/onChange/value)
export type DateItemData = {
    startJD: number | null
    startContext: string
    calendar: number
    endJD: number | null
    endContext: string
}

type DateInputProps = {
    defaultValue: null | string
    onChange: (value: string | null, stringValue: string | null) => void
    errorMessage: string
    placeholder: string
    stringForm: boolean
    stringFormDefaultValue: string
    tooltip?: string
}

const DateInput = ({
    defaultValue,
    onChange,
    errorMessage,
    placeholder,
    stringForm,
    tooltip,
    stringFormDefaultValue
}: DateInputProps) => {
    const intl = useIntl()

    return (
        <Stack gap={1}>
            {stringForm && (
                <Form.Control
                    type="text"
                    defaultValue={stringFormDefaultValue || ''}
                    placeholder={intl.formatMessage({ id: 'anyString' })}
                    onChange={(event) => onChange(defaultValue, event.target.value)}
                />
            )}
            <InputGroup hasValidation>
                {tooltip && (
                    <InputGroup.Text>
                        <OverlayTrigger overlay={(props) => <Tooltip {...props}>{tooltip}</Tooltip>}>
                            <InfoCircle size={18} />
                        </OverlayTrigger>
                    </InputGroup.Text>
                )}
                <Form.Control
                    defaultValue={defaultValue || ''}
                    type="text"
                    placeholder={placeholder}
                    onChange={(event) => onChange(event.target.value, stringFormDefaultValue)}
                    isInvalid={!!errorMessage}
                />
                {errorMessage && (
                    // position and top is temporary solution to not change input group height and width when error message is shown
                    <Form.Control.Feedback type="invalid" className="position-absolute top-100">
                        <FormattedMessage id={errorMessage} />
                    </Form.Control.Feedback>
                )}
            </InputGroup>
        </Stack>
    )
}

export default DateInput
