import { useEffect, useMemo, useState } from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { DateItemData } from '../../../stores/propertiesStore'
import RangeWrapper from './RangeWrapper'
import DateInputUpd from './DateInput'
import { CalendarGeneral } from '../../../utils/dates/types'
import gregorianCalendar from '../../../utils/dates/gregorian'
import julianCalendar from '../../../utils/dates/julian'
import stringCalendar from '../../../utils/dates/string'

export const CALENDAR_GREGORIAN_ID = 1
const CALENDAR_JULIAN_ID = 2
export const CALENDAR_STRING_ID = 3

const CALENDARS: { [key: number]: CalendarGeneral } = {
    [CALENDAR_GREGORIAN_ID]: gregorianCalendar,
    [CALENDAR_JULIAN_ID]: julianCalendar,
    [CALENDAR_STRING_ID]: stringCalendar
}

const getJd = (parser: typeof gregorianCalendar | typeof julianCalendar, dateString: string) => {
    return !!dateString.trim() ? parser.toJD(dateString) : null
}

const CalendarSelector = ({ calendar, setCalendar }: { calendar: number; setCalendar: (value: number) => void }) => {
    return (
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
    )
}

const DateItem = ({
    value,
    onChange
}: {
    value: DateItemData
    onChange: (newValue: DateItemData, isValid: boolean, key: string) => void
}) => {
    const intl = useIntl()

    const { calendar, jd: startDateJd, startContext, endJD, endContext = null } = value

    const parser = CALENDARS[calendar]
    const placeholder = parser.getDateFormatPlaceholder()

    const [startError, setStartError] = useState('')
    const [endError, setEndError] = useState('')
    const [dirty, setDirty] = useState({
        start: parser.fromJD(startDateJd),
        startContext,

        end: parser.fromJD(endJD),
        endContext,

        calendar
    })

    const [isRange, setIsRange] = useState(false)

    // using state to skip initial mount useEffect calls
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        // todo: that is not a solution to react double/single call of useEffect on mount. Probably will be resolved automatically after state to mobx todo
        if (!isMounted) {
            setIsMounted(true)
            return
        }

        const { start, end, calendar } = dirty
        const currentParser = CALENDARS[calendar]

        // validation
        const startIsValid = currentParser.validate(start)
        const endIsValid = !isRange || (!!end && currentParser.validate(end))

        setStartError(startIsValid ? '' : 'noSuchDate')
        setEndError(endIsValid ? '' : 'noSuchDate')

        let areDatesConsecutive = true
        if (startIsValid && endIsValid) {
            areDatesConsecutive = !isRange || currentParser.toJD(start) <= currentParser.toJD(end)
            setEndError(areDatesConsecutive ? '' : 'datesMustBeConsecutive')
        }

        // new data:
        const isValid = startIsValid && endIsValid && areDatesConsecutive
        const newStartDate = isValid && startIsValid ? getJd(currentParser, start) : null
        const newEndDate = isRange && isValid && endIsValid ? getJd(currentParser, end) : null

        onChange(
            {
                jd: newStartDate,
                endJD: newEndDate,
                calendar
            },
            isValid,
            ''
        )
    }, [dirty])

    const onCalendarChange = (newCalendar: number) => {
        setDirty((prev) => ({ ...prev, calendar: newCalendar }))
    }

    const fromInput = useMemo(
        () => (
            <DateInputUpd
                defaultValue={parser.fromJD(startDateJd)}
                onChange={(newValue, newStringValue) => {
                    setDirty((prev) => ({
                        ...prev,
                        start: newValue || '',
                        startContext: newStringValue || ''
                    }))
                }}
                errorMessage={startError}
                placeholder={placeholder}
                tooltip={
                    calendar === CALENDAR_STRING_ID
                        ? intl.formatMessage({ id: 'gregorianDateForStringInfo' })
                        : undefined
                }
                stringForm={calendar === CALENDAR_STRING_ID}
                stringFormDefaultValue=""
            />
        ),
        [calendar, placeholder, parser, startDateJd, startError, setDirty]
    )

    const toInput = useMemo(
        () => (
            <DateInputUpd
                defaultValue={parser.fromJD(startDateJd)}
                onChange={(newValue, newStringValue) => {
                    setDirty((prev) => ({
                        ...prev,
                        end: newValue || '',
                        endContext: newStringValue || ''
                    }))
                }}
                errorMessage={endError}
                placeholder={placeholder}
                stringForm={calendar === CALENDAR_STRING_ID}
                stringFormDefaultValue=""
            />
        ),
        [calendar, placeholder, parser, startDateJd, endError, setDirty]
    )
    return (
        <>
            <CalendarSelector calendar={calendar} setCalendar={onCalendarChange} />
            <RangeWrapper isRange={isRange} inputFrom={fromInput} inputTo={toInput} setIsRange={setIsRange} />
        </>
    )
}

export default DateItem