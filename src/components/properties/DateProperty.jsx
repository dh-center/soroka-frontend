import React from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import JulianDate from '../../utils/julianDate.helper'

// переменные вынесены глобально,
// чтобы не возникало проблем с их
// перезаписью после изменений в state
let calendar = null
let isDateFormatCorrect = true

// небольшой хелпер для проверки валидности даты
// если calendar = null, то мы выпустим юзера из функции,
// чтобы не выбрасывать ошибку сразу
const isDateValid = (calendar, jd) => {
    if (!calendar) return true

    let isDateFormatCorrect = true

    const isGregorianCalendar = calendar === "1"

    if (!isGregorianCalendar) {
        const jdHelper = new JulianDate()

        const convertedDate = jdHelper.convertToGregorian(jd)

        if (convertedDate.error) {
            isDateFormatCorrect = false
        }
    }

    return isDateFormatCorrect
}

const DateProperty = ({ showHelp, value, onChange }) => {

    const data = JSON.parse(value)[0]

    const julianDate = new JulianDate()
        .getDateFromJulian(data.jd)
        .toLocaleDateString('ru-RU')

    isDateFormatCorrect = isDateValid(calendar, data.jd)

    return (
        <>
            <Form.Group className="mb-2">
                <Form.Select className="mb-2"
                    onChange={(event) => {
                        calendar = event.target.value

                        isDateFormatCorrect = isDateValid(calendar, data.jd)
                    }}
                    defaultValue={data.calendar}
                >
                    <option value="1">
                        <FormattedMessage id="calendarGrigorian" />
                    </option>
                    <option value="2">
                        <FormattedMessage id="calendarJulian" />
                    </option>
                </Form.Select>
                <Form.Control
                    type="text"
                    placeholder="12.04.1689"
                    onChange={(event) => {
                        const userDateInput = event.target.value

                        const [ day, month, year ] = userDateInput.split(".")

                        const userDate = new Date(`${year}-${month}-${day}`)

                        const jd = new JulianDate(userDate).getJulianDate()

                        isDateFormatCorrect = isDateValid(calendar, data.jd)

                        onChange(JSON.stringify([{ jd, calendar }]))
                    }}
                    defaultValue={julianDate}
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
