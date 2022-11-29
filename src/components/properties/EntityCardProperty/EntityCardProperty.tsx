import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import { EntityCardPropertyProps } from 'stores/propertiesStore'
import { cardStore } from 'stores/rootStore'
import { USER_ROLES } from 'utils/constants'
import './EntityCardPropertyStyles.css'

const EntityCardProperty = ({ value, onChange, showHelp = false }: EntityCardPropertyProps) => {
    const intl = useIntl()
    const [isEntity, setIsEntity] = useState(value.isEntity)
    const [showInAllOrganizations, setShowInAllOrganizations] = useState(value.showInAllOrganizations)

    useEffect(() => {
        onChange({ isEntity, showInAllOrganizations })
    }, [showInAllOrganizations, isEntity])

    useEffect(() => {
        if (isEntity === false) {
            setShowInAllOrganizations(false)
        }
    }, [isEntity])

    return (
        <div className="entity-property__wrap">
            <Form.Check
                type="checkbox"
                id="isEntityCheckbox"
                label={intl.formatMessage({ id: 'isEntityLabel' })}
                checked={isEntity}
                onChange={() => setIsEntity((prev) => !prev)}
            />
            {cardStore.userRole === USER_ROLES.admin && (
                <Form.Check
                    type="checkbox"
                    id="showInAllOrganizationsCheckbox"
                    label={intl.formatMessage({ id: 'showInAllOrganizationsLabel' })}
                    checked={showInAllOrganizations}
                    onChange={() => setShowInAllOrganizations((prev) => !prev)}
                    disabled={!isEntity}
                />
            )}

            {showHelp && (
                <div className="entity-property__help">
                    <FormattedMessage
                        id="entityHelp"
                        values={{
                            p: (chunks) => <p>{chunks}</p>,
                            ul: (chunks) => <ul>{chunks}</ul>,
                            li: (chunks) => <li>{chunks}</li>
                        }}
                    />
                </div>
            )}
        </div>
    )
}

export default EntityCardProperty
