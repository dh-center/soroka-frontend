// common stuff
const CREATE = 'create'
export const DYNAMIC_ID = 'id'
export const DYNAMIC_TOKEN = 'token'
export const SEARCH_TEMPLATE = 'template'

// LOGIN
export const LOGIN_ROUTE = '/login'

// CARDS
export const CARDS_ROUTE = '/cards'
export const CARDS_CREATE_ROUTE = `${CARDS_ROUTE}/${CREATE}`
export const getCreateWithTemplateRoute = (templateId) =>
    templateId ? `${CARDS_CREATE_ROUTE}?${SEARCH_TEMPLATE}=${templateId}` : CARDS_CREATE_ROUTE
export const CARDS_TEMPLATES_ROUTE = `${CARDS_CREATE_ROUTE}/templates`
export const getCardById = (id) => `${CARDS_ROUTE}/${id}`
export const CARD_BY_ID_ROUTE = getCardById(`:${DYNAMIC_ID}`)

// INVITATION
const INVITE_ROUTE = '/invite'
export const getInvitationByToken = (token) => `${INVITE_ROUTE}/${token}`
export const INVITE_BY_TOKEN_ROUTE = getInvitationByToken(`:${DYNAMIC_TOKEN}`)

// REGISTRATION
const REGISTRATION_ROUTE = '/registration'
export const getRegistrationByToken = (token) => `${REGISTRATION_ROUTE}/${token}`
export const REGISTRATION_BY_TOKEN_ROUTE = getRegistrationByToken(`:${DYNAMIC_TOKEN}`)

// EXTERNAL LINKS
export const EXTERNAL_AGREEMENT = 'http://peterhofmuseum.ru/assets/files/ustav_gmz_petergof.pdf'
export const EXTERNAL_AGREEMENT_SIMPLE =
    'http://peterhofmuseum.ru/assets/files/9._svidetelstvo_o_gosudarstvennoy_registracii.pdf'
export const EXTERNAL_LOGIN_HELP = 'mailto:help@email.ru'
export const WUNDERKAMMER = 'https://wunder-kammer.ru'
