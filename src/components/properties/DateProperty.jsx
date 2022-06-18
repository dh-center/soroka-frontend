import React from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const DateProperty = ({ showHelp, value, onChange }) => {
    const isDateFormatCorrect = false

    return (
        <>
            <Form.Group className="mb-2">
                <Form.Select className="mb-2">
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
                    className={`w-25 ${isDateFormatCorrect ? '' : 'is-invalid'}`}
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
