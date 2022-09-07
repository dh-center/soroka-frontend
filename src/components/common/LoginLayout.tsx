import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import Loader from './Loader'

type LoginLayoutProps = {
    headerMessageId?: string
    isLoading?: boolean
    children?: JSX.Element
}

const LoginLayout = ({ headerMessageId, isLoading = false, children }: LoginLayoutProps) => (
    <Container className="p-5">
        <Row className="justify-content-center">
            <Col lg="4">
                {headerMessageId && (
                    <h3>
                        <FormattedMessage id={headerMessageId} />
                    </h3>
                )}
                {isLoading ? (
                    <Row className="justify-content-center">
                        <Loader />
                    </Row>
                ) : (
                    children
                )}
            </Col>
        </Row>
    </Container>
)

export default LoginLayout
