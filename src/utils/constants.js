import { LOCALES } from '../lang/locales'

export const LANGUAGES = [
    { name: 'English', code: LOCALES.ENGLISH },
    { name: 'Русский', code: LOCALES.RUSSIAN }
]
export const USER_ROLES = {
    admin: 1,
    editor: 2,
    author: 3
}
export const USER_ROLES_DEFINITION = {
    [USER_ROLES.admin]: {
        asRoleMessageId: 'asAdministrator'
    },
    [USER_ROLES.editor]: {
        asRoleMessageId: 'asEditor'
    },
    [USER_ROLES.author]: {
        asRoleMessageId: 'asAuthor'
    }
}
