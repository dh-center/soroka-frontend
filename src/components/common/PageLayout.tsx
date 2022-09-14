import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'

type PageLayoutProps = {
    children?: React.ReactNode
    goBackHandler?: () => void
    titleMessageId?: string
    titleMessage?: React.ReactElement | string
}

const PageLayout = ({ children, goBackHandler, titleMessageId, titleMessage }: PageLayoutProps) => {
    const title = titleMessageId ? <FormattedMessage id={titleMessageId} /> : titleMessage
    const shouldShowHeader = goBackHandler || title

    return (
        <>
            {shouldShowHeader && (
                <Container className="d-flex justify-content-start align-items-center p-2 border-bottom">
                    {goBackHandler && (
                        <Button onClick={goBackHandler} variant="outline-secondary me-1" size="sm">
                            <ArrowLeft />
                        </Button>
                    )}
                    {title && <h2 className="h3 m-0">{title}</h2>}
                </Container>
            )}
            <Container className="py-2 px-0">{children}</Container>
        </>
    )
}

export default PageLayout
