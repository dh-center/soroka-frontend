import { useState } from 'react'
import { Form, InputGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { MeasurementsPropertyProps, MeasurementsValue } from '../../stores/propertiesStore'
import Plane from '../../assets/images/Plane.svg'
import Line from '../../assets/images/Line.svg'
import Sphere from '../../assets/images/Sphere.svg'
import Cylinder from '../../assets/images/Cylinder.svg'
import Cube from '../../assets/images/Cube.svg'

const MeasurementsProperty = (props: MeasurementsPropertyProps) => {
    const [measurementsValue, setMeasurementsValue] = useState<MeasurementsValue>({
        form: 'cylinder',
        unit: 'mm',
        w: undefined,
        h: undefined,
        l: undefined,
        d: undefined,
        note: ''
    })

    const intl = useIntl()

    const forms: { name: string; value: MeasurementsValue['form']; image: string }[] = [
        { name: intl.formatMessage({ id: 'cylinder' }), value: 'cylinder', image: Cylinder },
        { name: intl.formatMessage({ id: 'cube' }), value: 'cube', image: Cube },
        { name: intl.formatMessage({ id: 'sphere' }), value: 'sphere', image: Sphere },
        { name: intl.formatMessage({ id: 'plane' }), value: 'plane', image: Plane },
        { name: intl.formatMessage({ id: 'line' }), value: 'line', image: Line }
    ]

    const measurements: { name: string; value: MeasurementsValue['unit'] }[] = [
        { name: intl.formatMessage({ id: 'mm' }), value: 'mm' },
        { name: intl.formatMessage({ id: 'sm' }), value: 'sm' },
        { name: intl.formatMessage({ id: 'm' }), value: 'm' }
    ]

    const filterMeasurements = (measurement: string) => {
        let show = false
        switch (measurement) {
            case 'w':
                show = measurementsValue.form === 'cube' || measurementsValue.form === 'plane' ? true : false
                break
            case 'h':
                show = measurementsValue.form === 'cylinder' || measurementsValue.form === 'cube' ? true : false
                break
            case 'l':
                show =
                    measurementsValue.form === 'cube' ||
                    measurementsValue.form === 'plane' ||
                    measurementsValue.form === 'line'
                        ? true
                        : false
                break
            case 'd':
                show = measurementsValue.form === 'cylinder' || measurementsValue.form === 'sphere' ? true : false
                break
            default:
                return show
        }
        return show
    }

    const handleForm = (value: string) => {
        setMeasurementsValue((prev) => {
            switch (value) {
                case 'cylinder':
                    return {
                        ...prev,
                        form: value as MeasurementsValue['form'],
                        l: undefined,
                        w: undefined
                    }
                case 'cube':
                    return {
                        ...prev,
                        form: value as MeasurementsValue['form'],
                        d: undefined
                    }
                case 'sphere':
                    return {
                        ...prev,
                        form: value as MeasurementsValue['form'],
                        w: undefined,
                        h: undefined,
                        l: undefined
                    }
                case 'plane':
                    return {
                        ...prev,
                        form: value as MeasurementsValue['form'],
                        h: undefined,
                        d: undefined
                    }
                case 'line':
                    return {
                        ...prev,
                        form: value as MeasurementsValue['form'],
                        w: undefined,
                        h: undefined,
                        d: undefined
                    }
                default:
                    return prev
            }
        })
    }

    return (
        <div className="d-flex flex-column mb-3 w-75">
            <ToggleButtonGroup
                defaultValue={measurementsValue.form}
                name="forms"
                type="radio"
                className="mb-3"
                onChange={handleForm}>
                {forms.map((form, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`form-${idx}`}
                        variant="outline-secondary"
                        value={form.value}
                        checked={measurementsValue.form === form.value}>
                        <img src={form.image} alt="" width="30rem" height="30rem" />
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <div className="mb-3 d-flex flex-row gap-3">
                {filterMeasurements('w') && (
                    <InputGroup className="d-inline-flex w-30">
                        <InputGroup.Text id="WidthControl">{intl.formatMessage({ id: 'w' })}</InputGroup.Text>
                        <Form.Control
                            placeholder={intl.formatMessage({ id: 'width' })}
                            type="number"
                            value={measurementsValue.w}
                            aria-label="Width"
                            aria-describedby="WidthControl"
                            onChange={(e) => setMeasurementsValue((prev) => ({ ...prev, w: Number(e.target.value) }))}
                        />
                    </InputGroup>
                )}
                {filterMeasurements('h') && (
                    <InputGroup className="d-inline-flex w-30">
                        <InputGroup.Text id="HeightControl">{intl.formatMessage({ id: 'h' })}</InputGroup.Text>
                        <Form.Control
                            placeholder={intl.formatMessage({ id: 'height' })}
                            type="number"
                            value={measurementsValue.h}
                            aria-label="Height"
                            aria-describedby="HeightControl"
                            onChange={(e) => setMeasurementsValue((prev) => ({ ...prev, h: Number(e.target.value) }))}
                        />
                    </InputGroup>
                )}
                {filterMeasurements('l') && (
                    <InputGroup className="d-inline-flex w-30">
                        <InputGroup.Text id="LengthControl">{intl.formatMessage({ id: 'l' })}</InputGroup.Text>
                        <Form.Control
                            placeholder={intl.formatMessage({ id: 'length' })}
                            type="number"
                            value={measurementsValue.l}
                            aria-label="Length"
                            aria-describedby="LengthControl"
                            onChange={(e) => setMeasurementsValue((prev) => ({ ...prev, l: Number(e.target.value) }))}
                        />
                    </InputGroup>
                )}
                {filterMeasurements('d') && (
                    <InputGroup className="d-inline-flex w-30">
                        <InputGroup.Text id="DiameterControl">{intl.formatMessage({ id: 'd' })}</InputGroup.Text>
                        <Form.Control
                            placeholder={intl.formatMessage({ id: 'diameter' })}
                            type="number"
                            value={measurementsValue.d}
                            aria-label="Length"
                            aria-describedby="DiameterControl"
                            onChange={(e) => setMeasurementsValue((prev) => ({ ...prev, d: Number(e.target.value) }))}
                        />
                    </InputGroup>
                )}
            </div>

            <ToggleButtonGroup
                type="radio"
                defaultValue={measurementsValue.unit}
                name="measurements"
                className="mb-3"
                onChange={(value) =>
                    setMeasurementsValue((prev) => {
                        return {
                            ...prev,
                            unit: value as MeasurementsValue['unit']
                        }
                    })
                }>
                {measurements.map((measurement, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`measuremen-${idx}`}
                        variant="outline-secondary"
                        value={measurement.value}
                        checked={measurementsValue.unit === measurement.value}>
                        {measurement.name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <Form.Control
                type="text"
                value={measurementsValue.note}
                placeholder={intl.formatMessage({ id: 'note' })}
                onChange={(e) => setMeasurementsValue((prev) => ({ ...prev, note: e.target.value }))}
            />
        </div>
    )
}

export default MeasurementsProperty
