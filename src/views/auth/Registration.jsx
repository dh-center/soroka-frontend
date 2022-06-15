import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { FormattedMessage, useIntl } from 'react-intl'
import { authStore } from '../../App'
import PasswordField from '../../components/common/PasswordField'
import LoginLayout from '../../components/common/LoginLayout'
import { getInvitationByToken, LOGIN_ROUTE, DYNAMIC_TOKEN } from '../../utils/routes'

const FIELD_PASSWORD = 'password'
const FIELD_PASSWORD_REPEAT = 'rePassword'

const Registration = observer(() => {
    const intl = useIntl()
    const passwordMessage = intl.formatMessage({ id: 'password' })
    const repeatPasswordMessage = intl.formatMessage({ id: 'repeatPassword' })

    const nav = useNavigate()

    const { [DYNAMIC_TOKEN]: token } = useParams()

    const [invalidPasswordMessage, setInvalidPasswordMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPage, setIsLoadingPage] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = Object.fromEntries(new FormData(e.target).entries())
        const { [FIELD_PASSWORD]: password, [FIELD_PASSWORD_REPEAT]: passwordRepeat } = formData

        if (password !== passwordRepeat) {
            setInvalidPasswordMessage(intl.formatMessage({ id: 'passwordsDoNotMatch' }))
            return
        }
        setIsLoading(true)
        const passwordSuccessfullyCreated = await authStore.setUserPassword(token, {
            password: password,
            rePassword: passwordRepeat
        })
        setIsLoading(false)
        if (passwordSuccessfullyCreated) {
            nav(LOGIN_ROUTE)
        }
    }

    useEffect(() => {
        authStore
            .getInvatationData(token)
            .then((user) => {
                setIsLoadingPage(false)
                if (!user.hasAcceptTermsOfUse) {
                    nav(getInvitationByToken(token))
                }
            })
            .catch(() => nav(LOGIN_ROUTE))
    }, [])

    return (
        <LoginLayout headerMessageId="registrationByInvitation" isLoading={isLoadingPage}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder={authStore.invitationData?.email} disabled />
                </Form.Group>
                <PasswordField
                    placeholder={passwordMessage}
                    name={FIELD_PASSWORD}
                    invalidMessage={invalidPasswordMessage}
                />
                <PasswordField
                    placeholder={repeatPasswordMessage}
                    name={FIELD_PASSWORD_REPEAT}
                    invalidMessage={invalidPasswordMessage}
                />
                <Button type="submit" disabled={isLoading}>
                    <FormattedMessage id="signUp" />
                </Button>
            </Form>
        </LoginLayout>
    )
})

export default Registration
