import React, { useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
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

    const handleParentEntityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
    }

    return (
        <>
            <div>
                <p style={{ margin: '0 0 0.8rem 0' }}>
                    Сущность<sup>*</sup>
                </p>
                <InputGroup>
                    <InputGroup.Text id="selectEntityInfo">Ⓘ</InputGroup.Text>
                    <Form.Select
                        id="selectParentEntity"
                        value="selectParentEntity"
                        onChange={(e) => {
                            handleParentEntityChange(e)
                        }}>
                        <option value="selectParentEntity" disabled>
                            <FormattedMessage id="selectEntity" />
                        </option>
                    </Form.Select>
                    <FormattedMessage
                        id="selectParentEntityValidationMessage"
                        values={{
                            p: (chunks) => (
                                <p style={{ color: 'red', fontSize: '0.7rem', marginTop: '0.5rem', marginBottom: 0 }}>
                                    {chunks}
                                </p>
                            )
                        }}
                    />
                </InputGroup>
            </div>
            <hr
                style={{
                    height: '2px',
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem'
                }}
            />
            <p style={{ fontSize: '0.8rem' }}>Подсказка состояния</p>
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
