export interface CalendarGeneral {
    dateFormat: Date
    validate: (dateString: string) => boolean
    fromJD: (julianday: number) => string
    toJD: (dateString: string) => number
    getDateFormatPlaceholder: () => string
    nameMessageId: string
}
