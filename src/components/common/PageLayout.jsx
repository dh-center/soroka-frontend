import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

const PageLayout = ({ children, goBackLink, titleMessageId }) => (
    <>
        {(goBackLink || titleMessageId) && (
            <Container className="d-flex justify-content-start align-items-center p-2 border-bottom">
                {goBackLink && (
                    <Link to={goBackLink}>
                        <Button variant="outline-secondary me-1" size="sm">
                            <ArrowLeft />
                        </Button>
                    </Link>
                )}
                {titleMessageId && (
                    <h2 className="h3 m-0">
                        <FormattedMessage id={titleMessageId} />
                    </h2>
                )}
            </Container>
        )}
        <Container className="py-2 px-0">{children}</Container>
    </>
)

export default PageLayout
