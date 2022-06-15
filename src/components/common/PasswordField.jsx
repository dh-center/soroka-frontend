import React, { useState } from 'react'
import { Form, FormControl, InputGroup } from 'react-bootstrap'
import { Eye, EyeSlash } from 'react-bootstrap-icons'

const PasswordField = ({ name, invalidMessage, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false)

    const iconProps = { onClick: () => setShowPassword(!showPassword), role: 'button' }

    return (
        <Form.Group>
            <InputGroup className="mb-3" hasValidation>
                <FormControl
                    name={name}
                    isInvalid={!!invalidMessage}
                    aria-label="Password"
                    placeholder={placeholder}
                    type={showPassword ? 'text' : 'password'}
                    required
                />
                <InputGroup.Text>{showPassword ? <EyeSlash {...iconProps} /> : <Eye {...iconProps} />}</InputGroup.Text>
                <Form.Control.Feedback type="invalid">{invalidMessage}</Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    )
}

export default PasswordField
