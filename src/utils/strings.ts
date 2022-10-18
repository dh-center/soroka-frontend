export function getShortStringName(string: string) {
    if (string.length > 30) {
        const stringStart = string.substring(0, 15)
        const stringEnd = string.substring(string.length - 8)
        return `${stringStart}...${stringEnd}`
    }
    return string
}

export default {}
