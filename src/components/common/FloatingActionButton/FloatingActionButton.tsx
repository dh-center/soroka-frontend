import React from 'react'
import { Button } from 'react-bootstrap'

import './FloatingActionbutton.css'

type FloatingActionButtonProps = {
    children?: React.ReactNode
    className?: string
    onClick?: ({ altKey }: { altKey?: any }) => void
}

const FloatingActionButton = ({ children, className, onClick }: FloatingActionButtonProps) => {
    return (
        <Button className={`floating-action-button ${className}`} onClick={onClick}>
            {children}
        </Button>
    )
}

export default FloatingActionButton
