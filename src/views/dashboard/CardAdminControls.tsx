import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { observer } from 'mobx-react'
import organizationsAPI from 'api/organizations'
import { useStore } from 'stores/rootStore'

type Owner = {
    name: string
    id: number
}

const CardAdminControls = observer(() => {
    const { baseStore, cardStore } = useStore()

    const [owners, setOwners] = useState<Owner[]>([])

    useEffect(() => {
        organizationsAPI.getOwnersById(cardStore.organizationOption).then((res) => setOwners(res.data))
    }, [cardStore.organizationOption])

    const handleOrganizationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        cardStore.setOrganizationOption(event.target.value)
        setOwners([])
    }

    return (
        <>
            <Form.Group className="mb-2">
                <Form.Check
                    id={'preventDeletion'}
                    type={'checkbox'}
                    label={<FormattedMessage id="preventDelete" />}
                    defaultChecked={cardStore.cardInfo.preventDelete}
                    onClick={() => {
                        cardStore.togglePreventDelete()
                    }}
                />
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Select
                    id={'chooseOrganization'}
                    className="mb-2"
                    value={cardStore.cardInfo.organizationId}
                    onChange={(e) => {
                        handleOrganizationChange(e)
                    }}>
                    <option value="null" disabled>
                        <FormattedMessage id="organization" />
                    </option>
                    {baseStore.organizations.map((el) => (
                        <option key={el.id} value={el.id}>
                            {el.name}
                        </option>
                    ))}
                </Form.Select>

                <Form.Select
                    id={'chooseOwner'}
                    className="mb-2"
                    disabled={!owners.length}
                    value={cardStore.ownerOption}
                    onChange={(e) => {
                        cardStore.setOwnerOption(e.target.value)
                    }}>
                    <option value="null" disabled>
                        <FormattedMessage id="owner" />
                    </option>
                    {owners.map((el) => (
                        <option key={el.id} value={el.id}>
                            {el.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </>
    )
})

export default CardAdminControls
