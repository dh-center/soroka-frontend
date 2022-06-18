import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import Loader from './Loader'

const LoginLayout = ({ headerMessageId, isLoading = false, children }) => (
    <Container className="p-5">
        <Row className="justify-content-center">
            <Col lg="4">
                <h3>
                    <FormattedMessage id={headerMessageId} />
                </h3>
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
