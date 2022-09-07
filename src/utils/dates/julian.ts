import JulianDate from 'ilib/lib/JulianDate'
import DateFmt from 'ilib/lib/DateFmt'

class Calendar {
    dateFormat = new DateFmt({ template: 'dd.MM.yyyy', calendar: 'julian', timezone: 'GMT' })

    validate(dateString: string) {
        // https://stackoverflow.com/a/6178341

        // empty string ok
        if (dateString.trim() === '') return true

        // pattern check
        if (!/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(dateString)) return false

        // Parse the date parts to integers
        var parts = dateString.split('.')
        var day = parseInt(parts[0], 10)
        var month = parseInt(parts[1], 10)
        var year = parseInt(parts[2], 10)

        // Check the ranges of month
        if (month == 0 || month > 12) return false

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        // Adjust for leap years
        if (year % 4 === 0) monthLength[1] = 29

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1]
    }

    fromJD(julianday: number) {
        return julianday ? this.dateFormat.format(new JulianDate({ julianday, timezone: 'GMT' })) : ''
    }
    toJD(dateString: string) {
        const [day, month, year] = dateString.split('.')
        return new JulianDate({ day, month, year, timezone: 'GMT' }).getJulianDay()
    }
    getDateFormatPlaceholder() {
        return this.dateFormat.format(new JulianDate({ year: 1989, month: 4, day: 12, timezone: 'GMT' }))
    }
    get nameMessageId() {
        return 'calendarJulian'
    }
}

const calendar = new Calendar()

export default calendar
