import React, { useState, useEffect } from 'react'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { Col, Form, Row } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'

export const FIELD_GEO = 'location'
export const FIELD_GEO_NAME = 'location_name'

const getCoordsFromString = (coordsString) => (coordsString && coordsString !== '' ? coordsString.split(',') : null)
const getStringFromCoords = (coordsArray) => (coordsArray ? coordsArray.join(',') : '')
const isValidCoordinatesString = (value) => {
    if (value === '') {
        return true
    }

    const regExp =
        /^(?<latitude>[-]?[0-8]?[0-9]\.\d+|[-]?90\.0+?)(?<delimeter>.)(?<longitude>[-]?1[0-7][0-9]\.\d+|[-]?[0-9]?[0-9]\.\d+|[-]?180\.0+?)$/

    return regExp.test(value)
}

const getCoordsFromValue = (value) => (value[0].location.coordinates ? value[0].location.coordinates.join(',') : '')
const getNameFromValue = (value) => value[0].name

const GeoProperty = ({ showHelp = false, value, onChange }) => {
    const initialCoordsString = getCoordsFromValue(value)
    const [name, setName] = useState(getNameFromValue(value))

    const intl = useIntl()
    const placeholderNameOfPlace = intl.formatMessage({ id: 'placeName' })

    const [mapOptions, setMapOptions] = useState(() => ({
        center: getCoordsFromString(initialCoordsString) ?? [55.76, 37.64],
        zoom: 10
    }))

    // input value
    const [dirtyValue, setDirtyValue] = useState(initialCoordsString)

    // processed to coordinates array input value
    const [coordinates, setCoordinates] = useState(() => getCoordsFromString(initialCoordsString))

    // validation for input
    const [isInputValid, setIsInputValid] = useState(() => isValidCoordinatesString(initialCoordsString))

    const updateCoordinates = (coordsString, updateMapCenter) => {
        setDirtyValue(coordsString)

        const isValid = isValidCoordinatesString(coordsString)
        setIsInputValid(isValid)

        if (isValid && coordsString !== '') {
            const newCoordinates = getCoordsFromString(coordsString)
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
    }, [name, coordinates])

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
                            onClick={(e) => {
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
