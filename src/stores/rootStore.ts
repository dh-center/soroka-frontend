import { createContext, useContext } from 'react'

import AuthStore from './authStore'
import BaseStore from './baseStore'
import CardStore from './cardStore'
import PropertiesStore from './propertiesStore'

const store = {
    authStore: new AuthStore(),
    baseStore: new BaseStore(),
    cardStore: new CardStore(),
    propertiesStore: new PropertiesStore()
}
export const StoreContext = createContext(store)
export const useStore = () => {
    return useContext(StoreContext)
}

export const { authStore, baseStore, cardStore, propertiesStore } = store

export default store
