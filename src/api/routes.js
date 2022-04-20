export const CARDS_ROUTE="/cards"
export const REGISTRATION_ROUTE="/registration"
export const LOGIN_ROUTE="/login"
export const CREATE_ROUTE="/create"
export const ID_ROUTE_DYNAMIC="/:id"
export function getCreateCardRoute(){
    return CARDS_ROUTE + CREATE_ROUTE
}
export function getCardsRoute(id){
    return CARDS_ROUTE+"/" +id
}
export function getIdDynamicRoute(){
    return CARDS_ROUTE + ID_ROUTE_DYNAMIC
}