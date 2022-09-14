import React from 'react'
import { Icon, ThreeDots } from 'react-bootstrap-icons'

type CustomToggleProps = {
    onClick: (e: React.MouseEvent<SVGElement, MouseEvent>) => void
}

// library example: https://react-bootstrap.github.io/components/dropdowns/
const CustomToggle = React.forwardRef<HTMLDivElement, CustomToggleProps>(({ onClick }, ref) => (
    <div ref={ref}>
        <ThreeDots
            href=""
            onClick={(e) => {
                e.preventDefault()
                onClick(e)
            }}
        />
    </div>
))

export default CustomToggle
