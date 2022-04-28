import { makeAutoObservable } from 'mobx'

export default class CreateNewPropertiesObservable {
    arrayWithNewProperties = []
    isUserAddNewProperties = false

    constructor() {
        makeAutoObservable(this)
    }

    addNewProperties(name) {
        this.arrayWithNewProperties.push({ name: name })
        this.isUserAddNewProperties = true
    }
}
