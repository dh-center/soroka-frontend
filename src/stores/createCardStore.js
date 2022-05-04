import { makeAutoObservable } from 'mobx'
import { AuthAPI } from '../api/auth'
import { CardsAPI } from '../api/cards'

export default class CreateCardStore {
    nameOfCard = ''
    arrayWithNewProperties = []
    isUserAddNewProperties = false

    prohibitUpdate = false
    organizationOption = '1000'
    ownerOption = '1000'

    constructor() {
        makeAutoObservable(this)
    }

    async setOrganiztionAndOwner(){
        await AuthAPI.getUserProfile().then((res) => {
            this.organizationOption =  res.data.organization
            this.ownerOption =  res.data.userRole
            console.log(res.data.organization, res.data.userRole)
        })
    }

    addNewProperties(name, propertyId, data) {
        this.setOrganiztionAndOwner()
        this.arrayWithNewProperties.push({ name, propertyId, data })
        this.isUserAddNewProperties = true
        console.log(this.arrayWithNewProperties,this.organizationOption,this.ownerOption)
    }
    changeValue(index, newValue) {
        this.arrayWithNewProperties[index].data = newValue
        // this.isUserNotChangedProperties = this.setIsUserNotChangedProperties(index, newValue)
        // this.setHasEmptyProperties()
        console.log(this.arrayWithNewProperties[index].data)
    }
    changeNameOfCard(value) {
        this.nameOfCard = value
        console.log(this.nameOfCard)
    }
    toggleProhibitUpdate() {
        this.prohibitUpdate = !this.prohibitUpdate
    }

    setOrganizationOption(value) {
        this.organizationOption = value
        console.log(this.organizationOption)
    }

    setOwnerOption(value) {
        this.ownerOption = value
        console.log(this.ownerOption)
    }

    async saveCard() {
        console.log({
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        })
        CardsAPI.createCard({
            name: this.nameOfCard,
            userId: this.ownerOption,
            organizationId: this.organizationOption,
            preventDelete: this.prohibitUpdate
        }).then((res) =>
            this.arrayWithNewProperties
                .map(({ name, propertyId, data }) => ({ name, propertyId, data }))
                .map((el) => {
                    console.log(el,res.data.id)
                    CardsAPI.createFilledPropertiesByCardId(res.data.id, el)})
        )
    }
}
