import React from 'react'
import { Button, FloatingLabel, Form, InputGroup } from 'react-bootstrap'
import { Icon } from 'react-bootstrap-icons'
import { useIntl } from 'react-intl'

type SingleStringInputProps = {
    placeholder: string
    endAdornmentButtonHandler: () => void
    onChange: (value: string) => void
    EndAdornmentButtonIcon: null | Icon
}

const SingleStringInput = ({
    placeholder,
    endAdornmentButtonHandler,
    EndAdornmentButtonIcon,
    onChange
}: SingleStringInputProps) => {
    const intl = useIntl()
    return (
        <InputGroup hasValidation className="w-auto d-flex flex-row flex-nowrap">
            <>
                <FloatingLabel
                    className="w-100"
                    controlId="floatingInputString"
                    label={intl.formatMessage({ id: 'calendarString' })}>
                    <Form.Control
                        type="text"
                        placeholder={placeholder}
                        onChange={(event) => onChange(event.target.value)}
                    />
                </FloatingLabel>
                {EndAdornmentButtonIcon && (
                    <Button
                        className="d-flex align-items-center"
                        variant="outline-secondary"
                        onClick={endAdornmentButtonHandler}>
                        <EndAdornmentButtonIcon size={18} />
                    </Button>
                )}
            </>
        </InputGroup>
    )
}

export default SingleStringInput
