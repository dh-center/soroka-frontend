export interface CalendarGeneral {
    dateFormat: Date
    dateString?: string
    validate: (dateString: string) => boolean
    fromJD: (julianday: number) => string
    toJD: (dateString: string) => number
    getDateFormatPlaceholder: () => string
    nameMessageId: string
}
