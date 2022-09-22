import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../stores/rootStore'
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
} from '../../utils/urls'
import { useState } from 'react'
import { Organization } from '../../stores/baseStore'
import { User } from '../../stores/authStore'

type InviteFormProps = {
    name: string
    userRole: number
    organizationName: string
    onSubmit: () => void
    isLoading: boolean
}

const InviteForm = ({ name, userRole, organizationName, onSubmit, isLoading }: InviteFormProps) => (
    <Col lg={6} className="mt-3">
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
    const { authStore, baseStore } = useStore()
    const navigate = useNavigate()
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
                    .catch(() => navigate(LOGIN_ROUTE))
            } else {
                setIsLoadingPage(false)
            }
        }
        fetchInvite()
    }, [])

    // stuff to do after user agreed
    const proceedRegistration = () => navigate(getRegistrationByToken(token))

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
    const { name, organization, userRole } = invitationData || ({} as User)
    const { name: organizationName } =
        baseStore.organizations.find(({ id }) => id === organization) || ({} as Organization)

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