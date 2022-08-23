import React, { useState, useEffect } from 'react'
import { useCallback } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import gregorianCalendar from '../../utils/dates/gregorian'
import julianCalendar from '../../utils/dates/julian'
import { PlusCircle, DashCircle } from 'react-bootstrap-icons'

export const CALENDAR_GREGORIAN_ID = 1
const CALENDAR_JULIAN_ID = 2

const CALENDARS = {
    [CALENDAR_GREGORIAN_ID]: gregorianCalendar,
    [CALENDAR_JULIAN_ID]: julianCalendar
}

const DateProperty = ({ showHelp, value, onChange }) => {
    // todo: try/catch etc
    const data = value[0]
    const [calendar, setCalendar] = useState(data.calendar)
    const parser = CALENDARS[calendar]
    const dateString = data.jd ? parser.fromJD(data.jd) : ''
    const [dateData, setDateData] = useState({ startDate: null, endDate: null }) // Начальная и конечная даты
    const [startDateValid, setStartDateValid] = useState(() => parser.validate(dateData.startDate || '')) // Валидность начальной даты
    const [endDateValid, setEndDateValid] = useState(() => parser.validate(dateData.endDate || '')) // Валидность конечной даты

    const [dateRangeActive, setDateRangeActive] = useState(false) // одна дата или диапазон

    useEffect(() => {
        if (dateRangeActive && dateData.startDate && dateData.endDate && startDateValid && endDateValid) {
            const parseStartDate = parser.toJD(dateData.startDate)
            const parseEndDate = parser.toJD(dateData.endDate)
            if (!(parseStartDate < parseEndDate)) {
                setStartDateValid(false)
                setEndDateValid(false)
            }
        }
    }, [dateData.startDate, dateData.endDate])

    /* Проверка валидности даты при переходе на один инпут */
    useEffect(() => {
        if (!dateRangeActive && dateData?.startDate) {
            setStartDateValid(update(dateData?.startDate))
        }
    }, [dateRangeActive])

    const update = useCallback(
        (newValue, newCalendarId = calendar) => {
            const currentParser = CALENDARS[newCalendarId]
            const dateIsValid = currentParser.validate(newValue)
            if (newValue.trim() && dateIsValid) {
                onChange({ value: currentParser.toJD(newValue), calendar: newCalendarId }, dateIsValid)
            } else {
                onChange({ value: null, calendar: newCalendarId }, dateIsValid)
            }
            return dateIsValid
        },
        [calendar, onChange]
    )

    // Обработчик изменения первой даты
    const handleStartDateInput = async (event) => {
        const newValue = event.target.value
        setStartDateValid(update(newValue)) // Првоеряем валидность текущего значения в input
        dateData.endDate && setEndDateValid(update(dateData.endDate)) // Проверяем валидность другого значения, если оно есть
        setDateData({ ...dateData, startDate: newValue })
    }

    // Обработчик изменения второй даты
    const handleEndDateInput = async (event) => {
        const newValue = event.target.value
        dateData.startDate && setStartDateValid(update(dateData.startDate)) // Проверяем валидность другого значения, если оно есть
        setEndDateValid(update(newValue)) // Првоеряем валидность текущего значения в input
        setDateData({ ...dateData, endDate: newValue })
    }

    return (
        <>
            <Form.Group className="mb-2">
                <Form.Select
                    className="mb-2"
                    onChange={(event) => {
                        const newCalendarId = event.target.value
                        setCalendar(newCalendarId)
                        update(dateData.startDate, newCalendarId)
                        update(dateData.endDate, newCalendarId)
                    }}
                    defaultValue={calendar}>
                    {Object.entries(CALENDARS).map(([id, parser]) => (
                        <option key={id} value={id}>
                            <FormattedMessage id={parser.nameMessageId} />
                        </option>
                    ))}
                </Form.Select>
                <div className="d-flex">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder={parser.getDateFormatPlaceholder()}
                            onChange={handleStartDateInput}
                            isInvalid={!startDateValid}
                            className="w-50"
                        />
                        {!dateRangeActive && (
                            <Button
                                className="d-flex align-items-center"
                                variant="outline-secondary"
                                onClick={() => setDateRangeActive(true)}>
                                <PlusCircle size={18} />
                            </Button>
                        )}
                    </InputGroup>
                    {dateRangeActive && (
                        <>
                            <span className="mx-2 my-auto"> — </span>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder={parser.getDateFormatPlaceholder()}
                                    onChange={handleEndDateInput}
                                    isInvalid={!endDateValid}
                                    className="w-50"
                                />
                                <Button
                                    className="d-flex align-items-center"
                                    variant="outline-secondary"
                                    onClick={() => setDateRangeActive(false)}>
                                    <DashCircle size={18} />
                                </Button>
                            </InputGroup>
                        </>
                    )}
                </div>
                <Form.Control.Feedback type="invalid">
                    <FormattedMessage id="noSuchDate" />
                </Form.Control.Feedback>
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
