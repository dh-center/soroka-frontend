import { GregorianCalendar } from './gregorian'

class Calendar extends GregorianCalendar {
    get nameMessageId() {
        return 'anyString'
    }
}

const calendar = new Calendar()

export default calendar
