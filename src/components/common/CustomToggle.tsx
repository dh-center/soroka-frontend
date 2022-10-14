import React from 'react'
import { ThreeDots } from 'react-bootstrap-icons'

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

CustomToggle.displayName = 'CustomToggle'

export default CustomToggle
