import { makeAutoObservable } from 'mobx'

export default class CreateNewPropertiesObservable {
    arrayWithNewProperties = []
    isUserAddNewProperties = false

    prohibitUpdate = false
    organizationOption = 'Организация'
    ownerOption = 'Владелец'

    constructor() {
        makeAutoObservable(this)
    }

    addNewProperties(name) {
        this.arrayWithNewProperties.push({ name: name })
        this.isUserAddNewProperties = true
    }

    toggleProhibitUpdate() {
        this.prohibitUpdate = !this.prohibitUpdate
    }

    setOrganizationOption(value) {
        this.organizationOption = value
    }

    setOwnerOption(value) {
        this.organizationOption = value
    }
}
