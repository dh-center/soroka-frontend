import { Form } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { EntityCardPropertyProps } from 'stores/propertiesStore'

const EntityCardProperty = ({ value, onChange }: EntityCardPropertyProps) => {
    const intl = useIntl()
    return (
        <Form>
            <Form.Check type="checkbox" id="isEntityCheckbox" label={intl.formatMessage({ id: 'isEntityLabel' })} />
            <Form.Check
                type="checkbox"
                id="showInAllOrganizationsCheckbox"
                label={intl.formatMessage({ id: 'showInAllOrganizationsLabel' })}
            />
        </Form>
    )
}

export default EntityCardProperty
