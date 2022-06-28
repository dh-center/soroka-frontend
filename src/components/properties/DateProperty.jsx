import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import gregorianCalendar from '../../utils/dates/gregorian'

const CALENDAR_GREGORIAN_ID = 1
const CALENDAR_JULIAN_ID = 2

const CALENDARS = {
  [CALENDAR_GREGORIAN_ID]: gregorianCalendar,
  [CALENDAR_JULIAN_ID]: undefined
}

const formatToApi = (value, calendar) => JSON.stringify([{ jd: value, calendar }])
const defaultValue = { jd: null, calendar: CALENDAR_GREGORIAN_ID }

const DateProperty = ({ showHelp, value, onChange }) => {
  // todo: try/catch etc
  const data = value ? JSON.parse(value)[0] : defaultValue
  const [calendar, setCalendar] = useState(data.calendar)

  const parser = CALENDARS[calendar]
  const dateString = data.jd ? parser.fromJD(data.jd) : ''
  const [valid, setValid] = useState(() => parser.validate(dateString))

  return (
    <>
      <Form.Group className="mb-2">
        <Form.Select
          className="mb-2"
          onChange={(event) => {
            console.log(event.target.value)
            // todo: add julian calendar support
            // todo: revisit markup to react bootstrap components
          }}
          defaultValue={calendar}>
          <option value="1">
            <FormattedMessage id="calendarGrigorian" />
          </option>
          <option value="2">
            <FormattedMessage id="calendarJulian" />
          </option>
        </Form.Select>
        <Form.Control
          type="text"
          placeholder={parser.getDateFormatPlaceholder()}
          onChange={(event) => {
            const newValue = event.target.value
            const dateIsValid = parser.validate(newValue)
            setValid(dateIsValid)

            if (newValue.trim() && dateIsValid) {
              onChange(formatToApi(parser.toJD(newValue), calendar), dateIsValid)
            } else {
              onChange(formatToApi(null, calendar), dateIsValid)
            }
          }}
          defaultValue={dateString}
          className={`w-50 ${valid ? '' : 'is-invalid'}`}
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
