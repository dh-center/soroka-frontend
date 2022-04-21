import { makeAutoObservable } from 'mobx'

export default class CreateCardStore {
    arrayWithNewProperties = [];
    isUserAddNewProperties = false;

    constructor() {
        makeAutoObservable(this)
    }

    addNewProperties(name){
        this.arrayWithNewProperties.push({ name: name });
        this.isUserAddNewProperties = true;
    }
}
