import { Form } from 'react-bootstrap'

export type TextPropertyProps = {
    value: string
    showHelp: boolean
    onChange: ({ value }: { value: string }) => void
}

const TextProperty = ({ value, onChange }: TextPropertyProps) => (
    <Form.Control
        as="textarea"
        style={{ height: '84px' }}
        type="text"
        placeholder=""
        defaultValue={value}
        onChange={(event) => onChange({ value: event.target.value })}
    />
)

export default TextProperty
