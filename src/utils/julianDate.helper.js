class JulianDate {
    date

    // julian constants
    JULIAN_1970 = 2440588
    DAY_IN_MS = 1000 * 60 * 60 * 24

    // эта константа показывает, что
    // мы ставим точку отсчёта по 
    // часам на полночь
    HOURS_DIFF = 0.5

    constructor(date = new Date()) {
        this.date = date
    }

    getJulianDate = () => {
        return this.date.valueOf() / this.DAY_IN_MS - this.HOURS_DIFF + this.JULIAN_1970
    }

    getJulianDays = (julianDate) => {
        return julianDate - this.JULIAN_1970 + this.HOURS_DIFF
    }

    getDateFromJulian = (julianDate) => {
        const julianDays = this.getJulianDays(julianDate)

        return new Date(julianDays * this.DAY_IN_MS)
    }

    convertToGregorian = (julianDate) => {
        const date = this.getDateFromJulian(julianDate)

        const day = date.getDate()
        const month = date.getMonth() + 1

        const isFebruary29 = day === 29 && month === 2

        if (isFebruary29) {
            return { date, error: true }
        }

        return { date }
    }
}

export default JulianDate
