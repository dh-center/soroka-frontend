import React, { useState, useEffect } from 'react'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { Col, Form, Row } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'

export const FIELD_GEO = 'location'
export const FIELD_GEO_NAME = 'location_name'
const INITIAL_GEO_POINT = [55.76, 37.64] // Moscow geopoint
const INITIAL_MAP_ZOOM = 10

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

const getCoordsFromString = (coordsString: string) =>
    coordsString && coordsString !== '' ? coordsString.split(',').map((coord) => +coord) : null

const getStringFromCoords = (coordsArray: number[] | null) => (coordsArray ? coordsArray.join(',') : '')
const isValidCoordinatesString = (value: string) => {
    if (value === '') {
        return true
    }

    const regExp =
        /^(?<latitude>[-]?[0-8]?[0-9]\.\d+|[-]?90\.0+?)(?<delimeter>.)(?<longitude>[-]?1[0-7][0-9]\.\d+|[-]?[0-9]?[0-9]\.\d+|[-]?180\.0+?)$/

    return regExp.test(value)
}

const getCoordsFromValue = (value: GeoPropertyProps['value']) =>
    value[0].location.coordinates ? value[0].location.coordinates.join(',') : ''

const getNameFromValue = (value: GeoPropertyProps['value']) => value[0].name

const GeoProperty = ({ showHelp = false, value, onChange }: GeoPropertyProps) => {
    const initialCoordsString = getCoordsFromValue(value)
    const [name, setName] = useState(getNameFromValue(value))

    const intl = useIntl()
    const placeholderNameOfPlace = intl.formatMessage({ id: 'placeName' })

    const [mapOptions, setMapOptions] = useState(() => ({
        center: getCoordsFromString(initialCoordsString) ?? INITIAL_GEO_POINT,
        zoom: INITIAL_MAP_ZOOM
    }))

    // input value
    const [dirtyValue, setDirtyValue] = useState(initialCoordsString)

    // processed to coordinates array input value
    const [coordinates, setCoordinates] = useState(() => getCoordsFromString(initialCoordsString))

    // validation for input
    const [isInputValid, setIsInputValid] = useState(() => isValidCoordinatesString(initialCoordsString))

    const updateCoordinates = (coordsString: string, updateMapCenter: boolean) => {
        setDirtyValue(coordsString)

        const isValid = isValidCoordinatesString(coordsString)
        setIsInputValid(isValid)

        if (isValid && coordsString !== '') {
            const newCoordinates = getCoordsFromString(coordsString) ?? INITIAL_GEO_POINT
            setCoordinates(newCoordinates)

            if (updateMapCenter) {
                setMapOptions((prevCoord) => ({ ...prevCoord, center: newCoordinates }))
            }
        } else {
            setCoordinates([])
        }
    }

    useEffect(() => {
        const coordsChanged = getCoordsFromValue(value) !== getStringFromCoords(coordinates)
        const nameChanged = getNameFromValue(value) !== name

        if (nameChanged || coordsChanged) {
            onChange({ coordinates, name }, isInputValid)
        }
    }, [name, coordinates, isInputValid, onChange, value])

    return (
        <>
            <Row className="mb-3 w-100 p-0 m-0">
                <Col className="g-0 me-2">
                    <Form.Group>
                        <Form.Control
                            name={FIELD_GEO}
                            placeholder="54.782569,32.046266"
                            value={dirtyValue}
                            onChange={(e) => {
                                updateCoordinates(e.target.value, true)
                            }}
                            isInvalid={!isInputValid}
                        />
                        <Form.Control.Feedback type="invalid">
                            <FormattedMessage id="invalidCoordinates" />
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col className="g-0">
                    <Form.Control
                        name={FIELD_GEO_NAME}
                        onChange={(event) => setName(event.target.value)}
                        placeholder={placeholderNameOfPlace}
                        defaultValue={getNameFromValue(value)}
                    />
                </Col>
            </Row>
            <Row className="w-100 p-0 m-0">
                <Col className="g-0">
                    <YMaps>
                        <Map
                            width="100%"
                            state={mapOptions}
                            onClick={(e: ymaps.DomEvent) => {
                                const newCoordinates = getStringFromCoords(e.get('coords'))
                                updateCoordinates(newCoordinates, false)
                            }}>
                            {coordinates && coordinates.length !== 0 && <Placemark geometry={coordinates} />}
                        </Map>
                    </YMaps>
                </Col>
            </Row>
            {showHelp && (
                <Row>
                    <Col>
                        <FormattedMessage id="coordinatesHelp" values={{ b: (chunks) => <b>{chunks}</b> }} />
                    </Col>
                </Row>
            )}
        </>
    )
}

export default GeoProperty
