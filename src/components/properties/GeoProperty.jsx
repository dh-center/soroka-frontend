import { Map, Placemark, useYMaps, YMaps } from '@pbe/react-yandex-maps'
import { set } from 'mobx'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { Col, Form } from 'react-bootstrap'
import { useIntl } from 'react-intl'

const GeoProperty = ({ showHelp }) => {
    const [mapCoordinates, setMapCoordinates] = useState({
        center: [55.76, 37.64],
        zoom: 10
    })
    const [coordinates, setCoordinates] = useState('')
    const [placeName, setPlaceName] = useState('')
    const [markCoordinates, setMarkCoordinates] = useState()
    const [validationComplete, setValidationComplete] = useState(false)
    const intl = useIntl()
    const placeholderNameOfPlace = intl.formatMessage({ id: 'placeName' })

    const yandexRef = useRef()

    useEffect(() => {
        // console.log(yandexRef.current.events)
    }, [])

    const coordinatesIsCorrect = (e) => {
        const reg = new RegExp('/^[0-9,.]*$/')
        let validationCompleteF = true
        console.log(coordinates.split(','))
        if (coordinates.split(',').length < 2) {
            validationCompleteF = false
        }
        coordinates.split(',')?.forEach((coord) => {
            if (coord.length < 2) validationCompleteF = false
            if (coord.includes('-')) validationCompleteF = false
            if (coord.includes(',')) validationCompleteF = false
            if (!coord.includes('.')) validationCompleteF = false
            // if (!reg.test(coord)) validationCompleteF = false
        })
        if (validationCompleteF) {
            setValidationComplete(true)
            setMarkCoordinates(coordinates.split(','))
            setMapCoordinates((prevCoord) => ({ ...prevCoord, center: coordinates.split(',') }))
            console.log(mapCoordinates, 'Аааааа')
        } else {
            setValidationComplete(false)
        }
    }

    return (
        <div className="geo-property p-3">
            <div className="geo-property__content">
                <Form className="d-flex mb-4">
                    <Col className="me-3">
                        <Form.Group>
                            <Form.Control
                                placeholder="54.782569, 32.046266"
                                value={coordinates}
                                onChange={(e) => {
                                    setCoordinates(e.target.value)
                                    coordinatesIsCorrect()
                                }}
                            />
                            <Form.Text>Неправильные координаты</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Control
                            placeholder={placeholderNameOfPlace}
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                        />
                    </Col>
                </Form>

                <YMaps>
                    <Map
                        width={"100%"}
                        defaultState={mapCoordinates}
                        state={mapCoordinates}
                        onClick={(e) => {
                            setMarkCoordinates(e.get('coords'))
                            setCoordinates(e.get('coords'))
                        }}>
                        {markCoordinates && <Placemark geometry={markCoordinates} onDragEnd={(e) => console.log(e)} />}
                    </Map>
                </YMaps>
            </div>
            <div className="geo-property__help mt-3">
                Выберите точку на карте или введите координаты в градусах (в виде десятичной дроби), например, для
                координат 55°24'32.1"N 32°15'32.3"E нужно ввести 55.408902, 32.258976
            </div>
        </div>
    )
}

export default GeoProperty
