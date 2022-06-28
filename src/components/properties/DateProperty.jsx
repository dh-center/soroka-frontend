import React, { useState } from 'react'
import { useCallback } from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import gregorianCalendar from '../../utils/dates/gregorian'
import julianCalendar from '../../utils/dates/julian'

const CALENDAR_GREGORIAN_ID = 1
const CALENDAR_JULIAN_ID = 2

const CALENDARS = {
  [CALENDAR_GREGORIAN_ID]: gregorianCalendar,
  [CALENDAR_JULIAN_ID]: julianCalendar
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

  const [currentUserString, setCurrentUserString] = useState(dateString)

  const update = useCallback(
    (newValue, newCalendarId = calendar) => {
      const currentParser = CALENDARS[newCalendarId]
      const dateIsValid = currentParser.validate(newValue)
      if (newValue.trim() && dateIsValid) {
        onChange(formatToApi(currentParser.toJD(newValue), newCalendarId), dateIsValid)
      } else {
        onChange(formatToApi(null, newCalendarId), dateIsValid)
      }

      setValid(dateIsValid)
    },
    [calendar, onChange]
  )

  const handleInput = (event) => {
    const newValue = event.target.value
    update(newValue)
    setCurrentUserString(newValue)
  }

  return (
    <>
      <Form.Group className="mb-2">
        <Form.Select
          className="mb-2"
          onChange={(event) => {
            const newCalendarId = event.target.value
            setCalendar(newCalendarId)
            update(currentUserString, newCalendarId)
          }}
          defaultValue={calendar}>
          {Object.entries(CALENDARS).map(([id, parser]) => (
            <option key={id} value={id}>
              <FormattedMessage id={parser.nameMessageId} />
            </option>
          ))}
        </Form.Select>
        <Form.Control
          type="text"
          placeholder={parser.getDateFormatPlaceholder()}
          onChange={handleInput}
          defaultValue={dateString}
          isInvalid={!valid}
          className="w-50"
        />
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
