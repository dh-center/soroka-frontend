import React from 'react'
import { Form, Button, InputGroup, FloatingLabel, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Icon, InfoCircle } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { CALENDAR_STRING_ID } from './DateRangeInput'

type SingleDateInput = {
    defaultValue: null | string
    onChange: (value: string) => void
    errorMessage: string
    placeholder: string
    EndAdornmentButtonIcon: null | Icon
    endAdornmentButtonHandler: () => void
    calendarName: string
    calendarId: number
}

const InvalidDateFeedback = ({ errorMessage }: { errorMessage: string }) => (
    <Form.Control.Feedback type="invalid">
        <FormattedMessage id={errorMessage} />
    </Form.Control.Feedback>
)

const SingleDateInput = ({
    defaultValue,
    onChange,
    errorMessage,
    placeholder,
    EndAdornmentButtonIcon,
    endAdornmentButtonHandler,
    calendarName,
    calendarId
}: SingleDateInput) => (
    <InputGroup hasValidation className="w-auto">
        <FloatingLabel controlId="floatingInputDate" label={calendarName}>
            <Form.Control
                defaultValue={defaultValue || ''}
                type="text"
                placeholder={placeholder}
                onChange={(event) => onChange(event.target.value)}
                isInvalid={!!errorMessage}
            />
        </FloatingLabel>
        {calendarId === CALENDAR_STRING_ID && (
            <InputGroup.Text>
                <OverlayTrigger
                    delay={{ hide: 450, show: 200 }}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            <FormattedMessage id="grigorianDateForStringInfo" />
                        </Tooltip>
                    )}>
                    <InfoCircle size={18} />
                </OverlayTrigger>
            </InputGroup.Text>
        )}
        {EndAdornmentButtonIcon && (
            <Button
                className="d-flex align-items-center"
                variant="outline-secondary"
                onClick={endAdornmentButtonHandler}>
                <EndAdornmentButtonIcon size={18} />
            </Button>
        )}
        {errorMessage && <InvalidDateFeedback errorMessage={errorMessage} />}
    </InputGroup>
)

export default SingleDateInput
