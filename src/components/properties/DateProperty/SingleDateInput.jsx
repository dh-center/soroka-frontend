import React from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const InvalidDateFeedback = ({ errorMessage }) => (
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
    endAdornmentButtonHandler
}) => (
    <InputGroup hasValidation className="w-50">
        <Form.Control
            defaultValue={defaultValue}
            type="text"
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            isInvalid={!!errorMessage}
        />
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
