import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import JulianDate from 'ilib/lib/JulianDate'
import GregorianDate from 'ilib/lib/GregorianDate'

const DATE_CONSTRUCTORS = {
    '1': (params) => new GregorianDate(params),
    '2': (params) => new JulianDate(params)
}

const DateProperty = ({ showHelp, value, onChange, disableSave }) => {
    const data = value ? JSON.parse(value)[0] : { jd: null, calendar: "1" }

    const [ jd, setJd ] = useState(data.jd)
    const [ calendar, setCalendar ] = useState(data.calendar)
    const [ isDateFormatCorrect, setIsDateFormatCorrect ] = useState(true)

    useEffect(() => {
        setCalendar(() => calendar)
    }, [calendar])

    useEffect(() => {
        setIsDateFormatCorrect(() => isDateFormatCorrect)
    }, [isDateFormatCorrect])

    useEffect(() => {
        setJd(() => jd)
    }, [jd])

    const dateConstructor = DATE_CONSTRUCTORS[calendar]

    const date = dateConstructor({
        julianday: jd
    })

    const dateString = jd ? date.getJSDate().toLocaleDateString() : ''

    const handleDateChange = (date, calendar) => {
        const dateConstructor = DATE_CONSTRUCTORS[
            "1"
        ]

        const userDate = dateConstructor(date)

        const userDateString = userDate
            .getJSDate()
            .toLocaleDateString('ru-RU')

        const jd = userDate.getJulianDay()

        onChange(JSON.stringify([{ jd, calendar }]))

        return userDateString
    }

    const isDateValid = (dateString) => {
        const pattern = /\d{1,2}.\d{1,2}.\d{1,4}/gm

        const isValid = pattern.test(dateString)

        const [ day, month ] = dateString.split(".")

        const isDayValid = day < 32 && day > 0
        const isMonthValid = month < 13 && month > 0

        return isValid && isDayValid && isMonthValid
    }

    return (
        <>
            <Form.Group className="mb-2">
                <Form.Select className="mb-2"
                    onChange={(event) => {
                        if (!isDateFormatCorrect) {
                            disableSave()
                            return
                        }

                        handleDateChange(
                            { julianday: data.jd },
                            event.target.value
                        )

                        setCalendar(event.target.value)
                    }}
                    defaultValue={data.calendar}
                >
                    <option value="1">
                        <FormattedMessage id="calendarGrigorian" />
                    </option>
                    {/* <option value="2">
                        <FormattedMessage id="calendarJulian" />
                    </option> */}
                </Form.Select>
                <Form.Control
                    type="text"
                    placeholder="12.04.1689"
                    onBlur={(event) => {
                        const userDateInput = event.target.value

                        const [ day, month, year ] = userDateInput.split(".")

                        const isDateCorrect = isDateValid(userDateInput)

                        setIsDateFormatCorrect(isDateCorrect)

                        if (!isDateCorrect) {
                            disableSave()
                            return
                        }

                        const userDateChanged = handleDateChange(
                            { day, month, year },
                            calendar
                        )

                        // проверим, если вдруг дата перескочила
                        // с 29 февраля на 1 марта
                        if (userDateInput !== userDateChanged) {
                            setIsDateFormatCorrect(false)
                            disableSave()
                            return
                        }

                        // поставим дату
                        event.target.value = userDateChanged
                    }}
                    defaultValue={dateString}
                    className={`w-50 ${isDateFormatCorrect ? '' : 'is-invalid'}`}
                />
                <div className="invalid-feedback">
                    <FormattedMessage id="noSuchDate" />
                </div>
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
