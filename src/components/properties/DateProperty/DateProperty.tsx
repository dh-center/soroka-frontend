import { FormattedMessage } from 'react-intl'
import { DateItemData } from './DateInput'
import DateItem from './DateItem'

export type DatePropertyProps = {
    showHelp: boolean
    value: DateItemData[]
    onChange: (date: DateItemData, isValid: boolean) => void
}

const DateProperty = ({ showHelp, value, onChange }: DatePropertyProps) => {
    const handleItemChange = (newDate: DateItemData, isValid: boolean) => {
        // todo: when dates list will be applied — key must become useful, unique and stable for each date item
        onChange(newDate, isValid)
    }

    return (
        <>
            {value.map((date, index) => (
                <DateItem value={date} onChange={handleItemChange} key={`date-item-${index}`} />
            ))}
            {showHelp && (
                <div>
                    <FormattedMessage
                        id="calendarHelp"
                        values={{
                            p: (chunks) => <p>{chunks}</p>
                        }}
                    />
                </div>
            )}
        </>
    )
}

export default DateProperty
