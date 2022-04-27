import { makeAutoObservable } from 'mobx'
import { LOCALES } from '../lang/locales'

export default class BaseStore {
    uiLang = LOCALES.RUSSIAN

    constructor() {
        makeAutoObservable(this)
        const locale = navigator.language
        if (locale === 'ru') {
            this.uiLang= LOCALES.RUSSIAN
        } else {
            if (locale === 'en') {
                this.uiLang = LOCALES.ENGLISH
            }
        }
    }

    setUiLang(payload) {
        this.uiLang = payload
    }
}
