import { makeAutoObservable } from 'mobx'
import { CardsAPI } from '../api/cards'
import GeoProperty from '../components/properties/GeoProperty'
import TextProperty from '../components/properties/TextProperty'
import DateProperty from '../components/properties/DateProperty'

export const TYPES = {
    // text type
    4: {
        renderForm: (props) => <TextProperty {...props} />,
        hasHelp: false
    },
    dateTypeId: {
        renderForm: (props) => <DateProperty {...props} />,
        hasHelp: true
    },
    geoTypeId: {
        renderForm: (props) => {
            return <GeoProperty {...props} />
        },
        hasHelp: true
    }
}

// backend ids
const ADDRESS_ID = 'address'
const ARTISTIC_TEXT_ID = 'artisticText'
const LEGAL_NAME_ID = 'legalName'

export const PROPERTIES = {
    [ADDRESS_ID]: {
        labelId: 'address',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [ARTISTIC_TEXT_ID]: {
        labelId: 'artisticText',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },

    [LEGAL_NAME_ID]: {
        labelId: 'legalName',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    }
}

export default class PropertiesStore {
    properties = []

    constructor() {
        makeAutoObservable(this)
    }

    async getProperties() {
        CardsAPI.getCardsProperties().then((res) => {
            this.properties = res.data
        })
    }
}
