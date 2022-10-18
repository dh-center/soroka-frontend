import { makeAutoObservable } from 'mobx'
import organizationsAPI from 'api/organizations'
import LOCALES from 'lang/locales'

export type Organization = {
    id: number
    name: string
    adress: string
    createdAt: string
    updateAt: string
}

export default class BaseStore {
    uiLang = LOCALES.RUSSIAN

    organizations: Organization[] = []

    constructor() {
        makeAutoObservable(this)
        const locale = navigator.language
        this.uiLang = Object.values(LOCALES).includes(locale) ? locale : LOCALES.RUSSIAN
    }

    async getOrganizations() {
        const res = await organizationsAPI.getOrganizations()
        this.setOrganizations(res.data)
    }

    setOrganizations(data: Organization[]) {
        this.organizations = data
    }

    getOrganizationById(organizationId: number) {
        return this.organizations.find(({ id }) => id === organizationId)
    }

    setUiLang(payload: string) {
        this.uiLang = payload
    }
}
