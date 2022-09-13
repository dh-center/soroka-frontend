import React, { useState, useEffect } from 'react'
import { Form, Stack } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import gregorianCalendar from '../../../utils/dates/gregorian'
import julianCalendar from '../../../utils/dates/julian'
import { PlusCircle, DashCircle } from 'react-bootstrap-icons'
import SingleDateInput from './SingleDateInput'

export const CALENDAR_GREGORIAN_ID = 1
const CALENDAR_JULIAN_ID = 2

const CALENDARS: { [key: number]: typeof gregorianCalendar | typeof julianCalendar } = {
    [CALENDAR_GREGORIAN_ID]: gregorianCalendar,
    [CALENDAR_JULIAN_ID]: julianCalendar
}

const getJd = (parser: typeof gregorianCalendar | typeof julianCalendar, dateString: string) => {
    return !!dateString.trim() ? parser.toJD(dateString) : null
}

type DateRangeInputType = {
    index: number
    calendarId: number
    startDateJd: number
    endDateJd: number | null
    isRange: boolean
    onChange: (
        value: {
            calendar: number
            startDate: number
            endDate: number
            isRange: boolean
            isValid: boolean
        },
        index: number
    ) => void
}

// todo: state to mobx store
const DateRangeInput = ({
    calendarId = CALENDAR_GREGORIAN_ID,
    startDateJd,
    endDateJd,
    isRange: initialIsRange,
    onChange,
    index
}: DateRangeInputType) => {
    const [calendar, setCalendar] = useState(calendarId)
    const parser = CALENDARS[calendar]
    const placeholder = parser.getDateFormatPlaceholder()

    // "dirty" input values
    const [startDateString, setStartDateString] = useState(() => parser.fromJD(startDateJd))
    const [endDateString, setEndDateString] = useState(() => endDateJd && parser.fromJD(endDateJd))
    const [isRange, setIsRange] = useState(initialIsRange)

    // validation error messages
    const [startError, setStartError] = useState('')
    const [endError, setEndError] = useState('')

    // using state to skip initial mount useEffect calls
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        // todo: that is not a solution to react double/single call of useEffect on mount. Probably will be resolved automatically after state to mobx todo
        if (!isMounted) {
            setIsMounted(true)
            return
        }

        // validation
        const startIsValid = parser.validate(startDateString)
        const endIsValid = !isRange || (endDateString && parser.validate(endDateString))

        setStartError(startIsValid ? '' : 'noSuchDate')
        setEndError(endIsValid ? '' : 'noSuchDate')

        let areDatesConsecutive = true
        if (startIsValid && endIsValid) {
            areDatesConsecutive = !isRange || parser.toJD(startDateString) <= parser.toJD(endDateString)
            setEndError(areDatesConsecutive ? '' : 'datesMustBeConsecutive')
        }

        // new data:
        const isValid = startIsValid && endIsValid && areDatesConsecutive
        const newStartDate = isValid && startIsValid ? getJd(parser, startDateString) : null
        const newEndDate = isRange && isValid && endIsValid ? getJd(parser, endDateString) : null

        onChange(
            {
                startDate: newStartDate,
                endDate: newEndDate,
                isRange,
                isValid,
                calendar
            },
            index
        )
    }, [startDateString, endDateString, isRange, calendar, onChange])

    return (
        <>
            <Form.Select
                className="mb-2 w-auto"
                onChange={(event) => setCalendar(+event.target.value)}
                defaultValue={calendar}>
                {Object.entries(CALENDARS).map(([id, parser]) => (
                    <option key={id} value={id}>
                        <FormattedMessage id={parser.nameMessageId} />
                    </option>
                ))}
            </Form.Select>
            <Stack direction="horizontal" className="align-items-start w-75">
                <SingleDateInput
                    defaultValue={startDateString}
                    onChange={(value: string) => setStartDateString(value)}
                    errorMessage={startError}
                    placeholder={placeholder}
                    EndAdornmentButtonIcon={isRange ? null : PlusCircle}
                    endAdornmentButtonHandler={() => setIsRange(true)}
                />
                {isRange && (
                    <>
                        <span className="mx-2 w-auto mt-2"> — </span>
                        <SingleDateInput
                            defaultValue={endDateString}
                            onChange={(value: string) => setEndDateString(value)}
                            errorMessage={endError}
                            placeholder={placeholder}
                            EndAdornmentButtonIcon={DashCircle}
                            endAdornmentButtonHandler={() => setIsRange(false)}
                        />
                    </>
                )}
            </Stack>
        </>
    )
}

export default DateRangeInput
