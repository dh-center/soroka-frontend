import React from 'react'
import { ThreeDots } from 'react-bootstrap-icons'

// library example: https://react-bootstrap.github.io/components/dropdowns/
const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <ThreeDots
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault()
            onClick(e)
        }}
    />
))

export default CustomToggle
