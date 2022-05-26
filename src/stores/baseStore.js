import { makeAutoObservable } from 'mobx'
import { LOCALES } from '../lang/locales'

export default class BaseStore {
    uiLang = LOCALES.RUSSIAN
    organizations = [{}]
    allProperties =[{}]
    constructor() {
        makeAutoObservable(this)
        const locale = navigator.language
        this.uiLang = Object.values(LOCALES).includes(locale) ? locale : LOCALES.RUSSIAN
    }

    setOrganizations(data) {
        this.organizations = data
    }
    setUiLang(payload) {
        this.uiLang = payload
    }

}
