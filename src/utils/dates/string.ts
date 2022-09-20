import { Calendar as GregorianCalendar } from './gregorian'
class Calendar extends GregorianCalendar {
    get nameMessageId() {
        return 'calendarString'
    }
}

const calendar = new Calendar()

export default calendar
