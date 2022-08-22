import React, { useState } from 'react'
import { ThreeDots } from 'react-bootstrap-icons'

// library example: https://react-bootstrap.github.io/components/dropdowns/
export const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <ThreeDots
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault()
            onClick(e)
        }}
    />
))

// library example: https://react-bootstrap.github.io/components/dropdowns/
export const CustomMenu = React.forwardRef(({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('')

    return (
        <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
            <ul className="list-unstyled">
                {React.Children.toArray(children).filter(
                    (child) => !value || child.props.children.toLowerCase().startsWith(value)
                )}
            </ul>
        </div>
    )
})
