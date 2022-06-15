import React, { useEffect, useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { authStore } from '../../App'
import { mainContext } from '../../context/mainContext'
import { observer } from 'mobx-react-lite'
import Loader from '../../components/common/Loader'
import { FormattedMessage } from 'react-intl'
import { USER_ROLES_DEFINITION } from '../../utils/constants'
import {
    EXTERNAL_AGREEMENT,
    EXTERNAL_AGREEMENT_SIMPLE,
    getRegistrationByToken,
    LOGIN_ROUTE,
    DYNAMIC_TOKEN
} from '../../utils/routes'
import { useState } from 'react'

const InviteForm = ({ name, userRole, organizationName, onSubmit, isLoading }) => (
    <Col lg={6}>
        <FormattedMessage
            id="inviteBrief"
            values={{
                p: (chunks) => <p>{chunks}</p>,
                b: (chunks) => <b>{chunks}</b>,
                agreement: (chunks) => (
                    <a href={EXTERNAL_AGREEMENT} target="_blank" className="link-primary">
                        {chunks}
                    </a>
                ),
                simpleAgreement: (chunks) => (
                    <a href={EXTERNAL_AGREEMENT_SIMPLE} target="_blank" className="link-primary">
                        {chunks}
                    </a>
                ),
                organizationName,
                userRole: <FormattedMessage id={USER_ROLES_DEFINITION[userRole].asRoleMessageId} />,
                name
            }}
        />
        <Button onClick={onSubmit} disabled={isLoading}>
            <FormattedMessage id="continue" />
        </Button>
    </Col>
)

const InviteLink = observer(() => {
    const nav = useNavigate()
    const baseStore = useContext(mainContext)
    const { [DYNAMIC_TOKEN]: token } = useParams()

    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    // fetching invitation data by token on mount
    useEffect(() => {
        const fetchInvite = async () => {
            if (!authStore.invitationData) {
                await authStore
                    .getInvatationData(token)
                    .then(() => baseStore.getOrganizations()) // todo: getOrganizations api must be locked by authorization, we should get org name in invatation data
                    .then(() => setIsLoadingPage(false))
                    .catch(() => nav(LOGIN_ROUTE))
            }
        }
        fetchInvite()
    }, [])

    // stuff to do after user agreed
    const proceedRegistration = () => nav(getRegistrationByToken(token))

    // accepting and redirecting to registration
    const acceptTermsOfRules = async () => {
        setIsLoading(true)
        const acceptResult = await authStore.acceptsTermsOfUse(true)
        setIsLoading(false)
        if (acceptResult.hasAcceptTermsOfUse) {
            proceedRegistration()
        }
    }

    // redirect to registration, if terms accepted
    useEffect(() => {
        if (authStore.invitationData?.hasAcceptTermsOfUse) {
            proceedRegistration()
        }
    }, [authStore.invitationData])

    // view stuff
    const { invitationData } = authStore
    const { name, organization, userRole } = invitationData || {}
    const { name: organizationName } = baseStore.organizations.find(({ id }) => id === organization) || {}

    return (
        <Container>
            <Row className="justify-content-center">
                {isLoadingPage ? (
                    <Loader />
                ) : (
                    <InviteForm
                        name={name}
                        userRole={userRole}
                        organizationName={organizationName}
                        isLoading={isLoading}
                        onSubmit={acceptTermsOfRules}
                    />
                )}
            </Row>
        </Container>
    )
})

export default InviteLink
