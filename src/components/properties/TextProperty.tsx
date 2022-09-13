import React from 'react'
import { Form } from 'react-bootstrap'
import { TextPropertyProps } from '../../stores/propertiesStore'

const TextProperty = ({ value, onChange }: TextPropertyProps) => {
    return (
        <Form.Control
            as="textarea"
            style={{ height: '84px' }}
            type="text"
            placeholder=""
            defaultValue={value}
            onChange={(event) => {
                onChange(event.target.value)
            }}
        />
    )
}

export default TextProperty
