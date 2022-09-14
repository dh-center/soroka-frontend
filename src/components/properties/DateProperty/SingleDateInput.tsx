import React from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { Icon } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'

type SingleDateInput = {
    defaultValue: null | string
    onChange: (value: string) => void
    errorMessage: string
    placeholder: string
    EndAdornmentButtonIcon: null | Icon
    endAdornmentButtonHandler: () => void
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
    endAdornmentButtonHandler
}: SingleDateInput) => (
    <InputGroup hasValidation className="w-50">
        <Form.Control
            defaultValue={defaultValue || ''}
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
