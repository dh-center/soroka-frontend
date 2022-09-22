import { Button } from 'react-bootstrap'
import { DashCircle, PlusCircle } from 'react-bootstrap-icons'

const RangeWrapper = ({
    isRange,
    setIsRange,
    inputFrom,
    inputTo
}: {
    isRange: boolean
    setIsRange: (v: boolean) => void
    inputFrom: JSX.Element
    inputTo: JSX.Element
}) => {
    const rangeHidden = isRange ? 'd-none' : ''
    const singleHidden = !isRange ? 'd-none' : ''

    return (
        <div className="d-flex">
            <div className={`d-flex align-items-center`}>
                {inputFrom}
                <Button
                    className={`d-flex align-items-center ${rangeHidden}`}
                    variant="light"
                    onClick={() => setIsRange(true)}>
                    <PlusCircle size={18} />
                </Button>
            </div>
            <div className={`d-flex align-items-center ${singleHidden}`}>
                <span className="mx-2">—</span>
                {inputTo}
                <Button className={`d-flex align-items-center`} variant="light" onClick={() => setIsRange(false)}>
                    <DashCircle size={18} />
                </Button>
            </div>
        </div>
    )
}

export default RangeWrapper
