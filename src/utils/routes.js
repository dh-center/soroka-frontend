export const CARDS_ROUTE = '/cards'
export const REGISTRATION_ROUTE = '/registration/:token'
export const INVITE_LINK_ROUTE = '/invite/:token'
export const LOGIN_ROUTE = '/login'
export const CREATE_ROUTE = '/create'
export const ID_ROUTE_DYNAMIC = '/:id'
export const TEMPLATES_ROUTE = '/templates'

export function getCreateCardRoute() {
    return CARDS_ROUTE + CREATE_ROUTE
}
export function getCreateCardWithTemplatesRoute() {
    return CARDS_ROUTE + CREATE_ROUTE + TEMPLATES_ROUTE
}
export function getCardsRoute(id) {
    return CARDS_ROUTE + '/' + id
}
export function getCardByIdRoute() {
    return CARDS_ROUTE + ID_ROUTE_DYNAMIC
}
