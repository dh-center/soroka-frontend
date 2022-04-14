import { makeAutoObservable } from 'mobx'

export default class CreateNewPropertiesObserver {
    arrayWithNewProperties =[]
    isUserAddNewProperties=false

    constructor() {
        makeAutoObservable(this)
    }

    addNewProperties(name){
        this.arrayWithNewProperties.push({name:name})
        this.isUserAddNewProperties=true
    }
}
