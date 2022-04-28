export const CARDS_ROUTE = '/cards'
export const REGISTRATION_ROUTE = '/registration'
export const LOGIN_ROUTE = '/login'
export const CREATE_ROUTE = '/create'
export const ID_ROUTE_DYNAMIC = '/:id'
export const CHOOSE_CARD_TEMPLATE_ROUTE = '/templates'
export function getCreateCardRoute() {
    return CARDS_ROUTE + CREATE_ROUTE
}
export function getCreateCardWithTemplatesRoute() {
    return CARDS_ROUTE + CREATE_ROUTE + CHOOSE_CARD_TEMPLATE_ROUTE
}
export function getCardsRoute(id) {
    return CARDS_ROUTE + '/' + id
}
export function getCardByIdRoute() {
    return CARDS_ROUTE + ID_ROUTE_DYNAMIC
}
