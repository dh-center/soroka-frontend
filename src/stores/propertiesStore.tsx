import { makeAutoObservable } from 'mobx'
import { FormattedMessage } from 'react-intl'
// TODO: Dependency cycle
import CardsAPI from 'api/cards'
import GeoProperty, { GeoPropertyProps } from 'components/properties/GeoProperty'
import TextProperty, { TextPropertyProps } from 'components/properties/TextProperty'
import DateProperty, { CALENDAR_GREGORIAN_ID } from 'components/properties/DateProperty'
import MediaProperty from 'components/properties/MediaProperty/MediaProperty'
// TODO: Dependency cycle
import TemplatesAPI from 'api/templates'
import RichTextProperty, { RichTextPropertyProps } from 'components/properties/RichTextProperty'
import { DatePropertyProps } from 'components/properties/DateProperty/DateProperty'
import { DateItemData } from 'components/properties/DateProperty/DateInput'

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

export type PropertyTemplate = {
    id: number
    name: string
    propertiesList: PropertyListItem[]
    createdAt: string
    updateAt: string
    labelId: string
}

export type MediaPropertyProps = {
    value: any
    showHelp: boolean
    onChange: () => void
}

const TYPES: { [key: string]: any } = {
    TEXT: {
        renderForm: (props: TextPropertyProps) => <TextProperty {...props} />,
        formatToApi: ({ value }: { value: string }) => value,
        defaultData: '',
        hasHelp: false
    },
    RICH_TEXT: {
        renderForm: (props: RichTextPropertyProps) => <RichTextProperty {...props} />,
        formatToApi: ({ value }: { value: RichTextPropertyProps['value'] }) => value,
        defaultData: '',
        hasHelp: false
    },
    JULIAN_DATE: {
        renderForm: (props: DatePropertyProps) => <DateProperty {...props} />,
        formatToApi: (value: DateItemData) => [
            {
                startJD: value.startJD,
                endJD: value.endJD,
                startContext: value.startContext,
                endContext: value.endContext,
                calendar: value.calendar
            }
        ],
        defaultData: [
            {
                startJD: null,
                endJD: null,
                startContext: undefined,
                endContext: undefined,
                calendar: CALENDAR_GREGORIAN_ID
            }
        ],
        hasHelp: true
    },
    GEO_POINT: {
        renderForm: (props: GeoPropertyProps) => <GeoProperty {...props} />,
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
        formatToApi: (value: string) => value,
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
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [ANNOTATION_ID]: {
        labelId: 'annotation',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [ARTISTIC_TEXT_ID]: {
        labelId: 'artisticText',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [BIBLIOGRAPHY_ID]: {
        labelId: 'bibliography',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [COPYRIGHT_HOLDER_ID]: {
        labelId: 'copyrightHolder',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [CREATION_PLACE_ID]: {
        labelId: 'creationPlace',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [CREATOR_ID]: {
        labelId: 'creator',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [FAMILY_ID]: {
        labelId: 'family',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [FORMAT_ID]: {
        labelId: 'format',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [GEO_POINT_ID]: {
        labelId: 'geoPoint',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [JULIAN_DATE_ID]: {
        labelId: 'julianDate',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [LEGAL_NAME_ID]: {
        labelId: 'legalName',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [MEDIA_ID]: {
        labelId: 'media',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [ORIGINALTEXT_ID]: {
        labelId: 'originalText',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [PARTICIPANTS_ID]: {
        labelId: 'participants',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [PROFESSION_ID]: {
        labelId: 'profession',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [QUOTE_ID]: {
        labelId: 'quote',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [REFUTATION_ID]: {
        labelId: 'refutation',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [SOCIALNETWORKS_ID]: {
        labelId: 'socialNetworks',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [SOURCES_ID]: {
        labelId: 'sources',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [STORAGE_ID]: {
        labelId: 'storage',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [TAGS_ID]: {
        labelId: 'tags',
        renderAdd() {
            return <FormattedMessage id={this.labelId} />
        }
    },
    [URL_ID]: {
        labelId: 'url',
        renderAdd() {
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
        await CardsAPI.getCardsProperties().then((backendData) => this.setPropertiesFromBackend(backendData.data))
    }

    async fetchTemplates() {
        await TemplatesAPI.getTemplates().then(({ data: backendData }) => this.setTemplatesFromBacked(backendData))
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
        return this.templates.find(({ name }) => name === templateName)
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
            return undefined
        }
        return TYPES[dataTypeName]
    }
}
