import React, { useState } from 'react'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'

export const FIELD_GEO = 'location'
const getCoordsFromString = (coordsString) => (coordsString !== '' ? coordsString.split(',') : null)
const getStringFromCoords = (coordsArray) => coordsArray.join(',')
const isValidCoordinatesString = (value) => {
    if (value === '') {
        return true
    }

    const regExp =
        /^(?<latitude>[-]?[0-8]?[0-9]\.\d+|[-]?90\.0+?)(?<delimeter>.)(?<longitude>[-]?1[0-7][0-9]\.\d+|[-]?[0-9]?[0-9]\.\d+|[-]?180\.0+?)$/

    return regExp.test(value)
}

const GeoProperty = ({ showHelp = false, value, onChange }) => {
    const initialCoordsString = value ?? ''

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
            setCoordinates(null)
        }
    }

    return (
        <Container>
            <Row className="mb-3">
                <Col>
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
                <Col>
                    <Form.Control placeholder={placeholderNameOfPlace} defaultValue="" />
                </Col>
            </Row>
            <Row>
                <YMaps>
                    <Map
                        width="100%"
                        state={mapOptions}
                        onClick={(e) => {
                            const newCoordinates = getStringFromCoords(e.get('coords'))
                            updateCoordinates(newCoordinates, false)
                        }}>
                        {coordinates && <Placemark geometry={coordinates} />}
                    </Map>
                </YMaps>
            </Row>
            {showHelp && (
                <Row>
                    <Col>
                        <FormattedMessage id="coordinatesHelp" values={{ b: (chunks) => <b>{chunks}</b> }} />
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default GeoProperty
