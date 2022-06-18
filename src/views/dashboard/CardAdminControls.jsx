import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { mainContext } from '../../context/mainContext'
import { observer } from 'mobx-react'
import { cardStore } from './CardPage'
import { organizationsAPI } from '../../api/organizations'

const CardAdminControls = observer(() => {
    const baseStore = useContext(mainContext)

    const [owners, setOwners] = useState([{}])

    useEffect(() => {
        organizationsAPI.getOwnersById(cardStore.organizationOption).then((res) => setOwners(res.data))
    }, [cardStore.organizationOption])

    const handleOrganizationChange = (event) => {
        cardStore.setOrganizationOption(event.target.value)
        organizationsAPI.getOwnersById(cardStore.organizationOption).then((res) => setOwners(res.data))
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
                    value={cardStore.organizationOption}
                    onChange={(e) => {
                        handleOrganizationChange(e)
                    }}>
                    <option value="null" disabled>
                        <FormattedMessage id="organization" />
                    </option>
                    {baseStore.organizations.map((el, index) => {
                        return (
                            <option key={index} value={el.id}>
                                {el.name}
                            </option>
                        )
                    })}
                </Form.Select>

                <Form.Select
                    id={'chooseOwner'}
                    className="mb-2"
                    value={cardStore.ownerOption}
                    onChange={(e) => {
                        cardStore.setOwnerOption(e.target.value)
                    }}>
                    <option value="null" disabled>
                        <FormattedMessage id="owner" />
                    </option>
                    {owners.map((el, index) => {
                        return (
                            <option key={index} value={el.id}>
                                {el.name}
                            </option>
                        )
                    })}
                </Form.Select>
            </Form.Group>
        </>
    )
})

export default CardAdminControls
