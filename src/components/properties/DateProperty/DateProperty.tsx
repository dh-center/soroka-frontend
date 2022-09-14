import React from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { useCallback } from 'react'
import DateRangeInput from './DateRangeInput'
import { DatePropertyProps } from '../../../stores/propertiesStore'

const DateProperty = ({ showHelp, value, onChange }: DatePropertyProps) => {
    const handleRangeChange = useCallback(
        (
            value: { calendar: number; startDate: number; endDate: number; isRange: boolean; isValid: boolean },
            index: number
        ) => {
            const { startDate, endDate, isRange, isValid, calendar } = value
            onChange({ value: startDate, calendar }, isValid)
            // todo: after backend api is ready — apply endDate and isRange
        },
        [onChange]
    )

    return (
        <>
            <Form.Group className="mb-2 w-100">
                {value.map(({ jd, calendar }: { jd: number; calendar: number }, index: number) => (
                    <DateRangeInput
                        key={index}
                        index={index}
                        calendarId={calendar}
                        startDateJd={jd}
                        endDateJd={null} // todo: after backend api is ready — apply endDate
                        isRange={false}
                        onChange={handleRangeChange}
                    />
                ))}
            </Form.Group>
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
