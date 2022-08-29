import { makeAutoObservable } from 'mobx'
import { CardsAPI } from '../api/cards'
import GeoProperty from '../components/properties/GeoProperty'
import TextProperty from '../components/properties/TextProperty'
import DateProperty, { CALENDAR_GREGORIAN_ID } from '../components/properties/DateProperty'
import MediaProperty from '../components/properties/MediaProperty/MediaProperty'
import { TemplatesAPI } from '../api/templates'

import { RichTextProperty } from '../components/properties/RichTextProperty'

const TYPES = {
    TEXT: {
        renderForm: (props) => <RichTextProperty {...props} />, // TODO: Заменить на TextProperty
        formatToApi: (value) => value,
        defaultData: '',
        hasHelp: false
    },
    // RICH_TEXT: {
    //     renderForm: (props) => <RichTextProperty {...props} />,
    //     formatToApi: ({ value }) => value,
    //     defaultData: '',
    //     hasHelp: false
    // },
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
    },
    MEDIA: {
        renderForm: (props) => <MediaProperty {...props} />,
        formatToApi: (value) => value,
        defaultData: '',
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
const MEDIA_ID = 'media'

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
    },
    [MEDIA_ID]: {
        labelId: 'media',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    }
}

const TEMPLATE_PETER_TRAVEL_ID = 'peter_travel'
const TEMPLATE_MUSEUM_ID = 'museum'
const TEMPLATE_BOOK_ID = 'book'

const TEMPLATES = {
    [TEMPLATE_PETER_TRAVEL_ID]: {
        labelId: 'peterTravelPoint'
        // later could be added — coverImage, description text etc
    },
    [TEMPLATE_MUSEUM_ID]: {
        labelId: 'museum'
    },
    [TEMPLATE_BOOK_ID]: {
        labelId: 'book'
    }
}

export default class PropertiesStore {
    properties = []
    templates = []

    constructor() {
        makeAutoObservable(this)
    }

    async getProperties() {
        CardsAPI.getCardsProperties().then((backendData) => this.setPropertiesFromBackend(backendData))
    }

    async fetchTemplates() {
        TemplatesAPI.getTemplates().then(({ data: backendData }) => this.setTemplatesFromBacked(backendData))
    }

    setTemplatesFromBacked(backendData) {
        this.templates = backendData
            .filter(({ name }) => TEMPLATES[name]) // leave only "UI-known" properties
            .map(({ id, name, propertiesList }) => {
                const properties = propertiesList
                    .map(({ name: propertyName }) => this.getPropertyByName(propertyName))
                    .filter(Boolean)
                return { id, name, propertiesList: properties, ...TEMPLATES[name] }
            })
    }

    getTemplateByName(templateName) {
        return this.templates.find(({ name }) => name == templateName)
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
