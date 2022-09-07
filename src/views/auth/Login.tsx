import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { observer } from 'mobx-react-lite'
import PasswordField from '../../components/common/PasswordField'
import LoginLayout from '../../components/common/LoginLayout'
import { EXTERNAL_LOGIN_HELP } from '../../utils/urls'

import { useStore } from '../../stores/rootStore'

const FIELD_EMAIL = 'email'
const FIELD_PASSWORD = 'password'

const Login = observer(() => {
    const { authStore } = useStore()
    const intl = useIntl()

    const [isLoading, setIsLoading] = useState(false)
    const passwordMessage = intl.formatMessage({ id: 'password' })
    const emailMessage = intl.formatMessage({ id: 'emailOrPhone' })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
        const { [FIELD_EMAIL]: email, [FIELD_PASSWORD]: password } = formData

        setIsLoading(true)
        const response = await authStore.login({ email, password })

        if (response) {
            authStore.setAccessToken(response.accessToken)
            authStore.setRefreshToken(response.refreshToken)

            await authStore.getUserProfile()
        }

        setIsLoading(false)
    }

    const IncorrectLoginMessage = () => (
        <Alert variant="danger">
            <FormattedMessage
                id="incorrectLogin"
                values={{
                    br: <br />,
                    b: (chunks) => <b>{chunks}</b>,
                    email: (
                        <a href={EXTERNAL_LOGIN_HELP} target="_blank" className="link-primary">
                            {EXTERNAL_LOGIN_HELP.substring(7)}
                        </a>
                    )
                }}
            />
        </Alert>
    )

    console.log(authStore.invitationData, 'id')

    return (
        <LoginLayout headerMessageId="loginTitle">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder={emailMessage}
                        defaultValue={authStore.invitationData?.email}
                        name={FIELD_EMAIL}
                        required
                    />
                </Form.Group>

                <PasswordField placeholder={passwordMessage} name={FIELD_PASSWORD} />

                {authStore.incorrectPassword && <IncorrectLoginMessage />}

                <Button type="submit" disabled={isLoading}>
                    <FormattedMessage id="login" />
                </Button>
            </Form>
        </LoginLayout>
    )
})

export default Login
