import { makeAutoObservable } from 'mobx'
import { CardsAPI } from '../api/cards'
import GeoProperty from '../components/properties/GeoProperty'
import TextProperty from '../components/properties/TextProperty'
import DateProperty, { CALENDAR_GREGORIAN_ID } from '../components/properties/DateProperty'
import MediaProperty from '../components/properties/MediaProperty/MediaProperty'
import { TemplatesAPI } from '../api/templates'
import { RichTextProperty } from '../components/properties/RichTextProperty'
import { FormattedMessage } from 'react-intl'
import { DatePropertyProps } from '../components/properties/DateProperty/DateProperty'

export type Property = {
    propertyId: number
    name: string
    dataType: {
        name: string
    }
    isLink: boolean
    labelId?: string
    renderAdd?: () => void
    property?: any
}

type PropertyListItem = {
    id: number
    name: string
    dataTypeId: number
    isLink: boolean
    createdAt: string
    updateAt: string
}

type PropertyTemplate = {
    id: number
    name: string
    propertiesList: PropertyListItem[]
    createdAt: string
    updateAt: string
    labelId: string
}

// todo: distribute into components and make necessary abstractions (all have showHelp/onChange/value)
export type DateItemData = {
    jd: number | null // startJD:
    startContext?: string
    calendar: number
    endJD: number | null
    endContext?: string
}

export type GeoPropertyProps = {
    showHelp: boolean
    value: [
        {
            location: {
                type: string
                coordinates: number[]
            }
            name: string
        }
    ]
    onChange: (value: { coordinates: number[] | null; name: string }, isInputValid: boolean) => void
}

export type TextPropertyProps = {
    value: string
    showHelp: boolean
    onChange: ({ value }: { value: string }) => void
}

export type MediaPropertyProps = {
    value: any
    showHelp: boolean
    onChange: () => void
}

const TYPES: { [key: string]: any } = {
    TEXT: {
        renderForm: (props: TextPropertyProps) => <TextProperty {...props} />,
        formatToApi: (value: string) => value,
        defaultData: '',
        hasHelp: false
    },
    RICH_TEXT: {
        renderForm: (props: TextPropertyProps) => <RichTextProperty {...props} />,
        formatToApi: (value: string) => value,
        defaultData: '',
        hasHelp: false
    },
    JULIAN_DATE: {
        renderForm: (props: DatePropertyProps) => <DateProperty {...props} />,
        formatToApi: ({ value, calendar }: { value: number; calendar: number }) => [{ jd: value, calendar }],
        defaultData: [{ jd: null, calendar: CALENDAR_GREGORIAN_ID }],
        hasHelp: true
    },
    GEO_POINT: {
        renderForm: (props: GeoPropertyProps) => {
            return <GeoProperty {...props} />
        },
        formatToApi: ({ coordinates, name }: { coordinates: number[]; name: string }) => [
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
        renderForm: (props: { showHelp: boolean }) => <MediaProperty {...props} />,
        formatToApi: (value: string) => {
            return value
        },
        defaultData: '',
        hasHelp: true
    }
}

// backend ids
const ADDRESS_ID = 'address'
const ANNOTATION_ID = 'annotation'
const ARTISTIC_TEXT_ID = 'artisticText'
const BIBLIOGRAPHY_ID = 'bibliography'
const COPYRIGHT_HOLDER_ID = 'copyrightHolder'
const CREATION_PLACE_ID = 'creationPlace'
const CREATOR_ID = 'creator'
const FAMILY_ID = 'family'
const FORMAT_ID = 'format'
const GEO_POINT_ID = 'geoPoint'
const JULIAN_DATE_ID = 'julianDate'
const LEGAL_NAME_ID = 'legalName'
const MEDIA_ID = 'media'
const ORIGINALTEXT_ID = 'originalText'
const PARTICIPANTS_ID = 'participants'
const PROFESSION_ID = 'profession'
const QUOTE_ID = 'quote'
const REFUTATION_ID = 'refutation'
const SOCIALNETWORKS_ID = 'socialNetworks'
const SOURCES_ID = 'sources'
const STORAGE_ID = 'storage'
const TAGS_ID = 'tags'
const URL_ID = 'url'

const PROPERTIES: { [key: string]: any } = {
    [ADDRESS_ID]: {
        labelId: 'address',
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
    [ARTISTIC_TEXT_ID]: {
        labelId: 'artisticText',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [BIBLIOGRAPHY_ID]: {
        labelId: 'bibliography',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [COPYRIGHT_HOLDER_ID]: {
        labelId: 'copyrightHolder',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [CREATION_PLACE_ID]: {
        labelId: 'creationPlace',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [CREATOR_ID]: {
        labelId: 'creator',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [FAMILY_ID]: {
        labelId: 'family',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [FORMAT_ID]: {
        labelId: 'format',
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
    [JULIAN_DATE_ID]: {
        labelId: 'julianDate',
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
    [MEDIA_ID]: {
        labelId: 'media',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [ORIGINALTEXT_ID]: {
        labelId: 'originalText',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [PARTICIPANTS_ID]: {
        labelId: 'participants',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [PROFESSION_ID]: {
        labelId: 'profession',
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
    [REFUTATION_ID]: {
        labelId: 'refutation',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [SOCIALNETWORKS_ID]: {
        labelId: 'socialNetworks',
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
    [STORAGE_ID]: {
        labelId: 'storage',
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
    [URL_ID]: {
        labelId: 'url',
        renderAdd: function () {
            return <FormattedMessage id={this.labelId} />
        }
    }
}

const TEMPLATE_PETER_TRAVEL_ID = 'peter_travel'
const TEMPLATE_MUSEUM_ID = 'museum'
const TEMPLATE_BOOK_ID = 'book'

const TEMPLATES: { [key: string]: any } = {
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
    properties: Property[] = []
    templates: PropertyTemplate[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async getProperties() {
        CardsAPI.getCardsProperties().then((backendData) => this.setPropertiesFromBackend(backendData.data))
    }

    async fetchTemplates() {
        TemplatesAPI.getTemplates().then(({ data: backendData }) => this.setTemplatesFromBacked(backendData))
    }

    setTemplatesFromBacked(backendData: PropertyTemplate[]) {
        this.templates = backendData
            .filter(({ name }) => TEMPLATES[name]) // leave only "UI-known" properties
            .map(({ id, name, propertiesList }) => {
                const properties = propertiesList
                    .map(({ name: propertyName }) => this.getPropertyByName(propertyName))
                    .filter(Boolean)
                return { id, name, propertiesList: properties, ...TEMPLATES[name] }
            })
    }

    getTemplateByName(templateName: string | null) {
        return this.templates.find(({ name }) => name == templateName)
    }

    setPropertiesFromBackend(data: Property[]) {
        // syncing properties from backend and frontend
        this.properties = data
            .filter(({ name }) => PROPERTIES[name]) // leave only "UI-known" properties
            .map((prop) => ({ ...prop, ...PROPERTIES[prop.name] })) // add ui stuff to property object
    }

    getPropertyByName(propertyName: string) {
        return this.properties.find(({ name }) => name === propertyName)
    }
    getPropertyType(propertyName: string) {
        const property = this.getPropertyByName(propertyName)
        const dataTypeName = property?.dataType.name
        if (!dataTypeName) {
            console.error('Type not found')
            return
        }
        return TYPES[dataTypeName]
    }
}
