import { makeAutoObservable } from 'mobx'
import { CardsAPI } from '../api/cards'
import GeoProperty from '../components/properties/GeoProperty'
import TextProperty from '../components/properties/TextProperty'
import DateProperty, { CALENDAR_GREGORIAN_ID } from '../components/properties/DateProperty'

const TYPES = {
    TEXT: {
        renderForm: (props) => <TextProperty {...props} />,
        formatToApi: ({ value }) => value,
        defaultData: '',
        hasHelp: false
    },
    JULIAN_DATE: {
        renderForm: (props) => <DateProperty {...props} />,
        formatToApi: ({ value, calendar }) => [{ jd: value, calendar }],
        defaultData: [{ jd: null, calendar: CALENDAR_GREGORIAN_ID }],
        hasHelp: true
    },
    GEO_POINT: {
        renderForm: (props) => {
            return <GeoProperty {...props} />
        },
        formatToApi: ({ coordinates, name }) => [
            {
                location: {
                    type: 'Point',
                    coordinates: coordinates ?? []
                },
                name
            }
        ],
        defaultData: [{ location: { type: 'Point', coordinates: [] }, name: '' }],
        hasHelp: true
    }
}

// backend ids
const ADDRESS_ID = 'address'
const ARTISTIC_TEXT_ID = 'artisticText'
const LEGAL_NAME_ID = 'legalName'
const TAGS_ID = 'tags'
const SOURCES_ID = 'sources'
const QUOTE_ID = 'quote'
const JULIAN_DATE_ID = 'julianDate'
const GEO_POINT_ID = 'geoPoint'
const ANNOTATION_ID = 'annotation'

const PROPERTIES = {
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
    },

    [TAGS_ID]: {
        labelId: 'tags',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },

    [SOURCES_ID]: {
        labelId: 'sources',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },

    [QUOTE_ID]: {
        labelId: 'quote',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },

    [JULIAN_DATE_ID]: {
        labelId: 'julianDate',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },

    [GEO_POINT_ID]: {
        labelId: 'geoPoint',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },

    [ANNOTATION_ID]: {
        labelId: 'annotation',
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
        CardsAPI.getCardsProperties().then((backendData) => this.setPropertiesFromBackend(backendData))
    }

    setPropertiesFromBackend(backendData) {
        // syncing properties from backend and frontend
        this.properties = backendData.data
            .filter(({ name }) => PROPERTIES[name]) // leave only "UI-known" properties
            .map((prop) => ({ ...prop, ...PROPERTIES[prop.name] })) // add ui stuff to property object
    }

    getPropertyByName(propertyName) {
        return this.properties.find(({ name }) => name === propertyName)
    }
    getPropertyType(propertyName) {
        const property = this.getPropertyByName(propertyName)
        const dataTypeName = property.dataType.name
        return TYPES[dataTypeName]
    }
}
