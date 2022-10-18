import { useState } from 'react'
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { MeasurementsPropertyProps } from '../../../stores/propertiesStore'
import { ReactComponent as Plane } from '../../../assets/images/Plane.svg'
import { ReactComponent as Line } from '../../../assets/images/Line.svg'
import { ReactComponent as Sphere } from '../../../assets/images/Sphere.svg'
import { ReactComponent as Cylinder } from '../../../assets/images/Cylinder.svg'
import { ReactComponent as Cube } from '../../../assets/images/Cube.svg'
import Measure from './Measure'

const UNITS = ['mm', 'cm', 'm'] as const

const FORMS = {
    line: { messageId: 'lineTooltip', image: <Line /> },
    plane: { messageId: 'planeTooltip', image: <Plane /> },
    cube: { messageId: 'cubeTooltip', image: <Cube /> },
    cylinder: { messageId: 'cylinderTooltip', image: <Cylinder /> },
    sphere: { messageId: 'sphereTooltip', image: <Sphere /> }
}

const MEASUREMENTS_KEYS = ['w', 'h', 'l', 'd'] as const

export type Measurement = {
    placeholderMessageId: string
    smallCaptionMessageId: string
    key: typeof MEASUREMENTS_KEYS[number]
    forms: (keyof typeof FORMS)[]
}

export type MeasurementsValue = {
    form: keyof typeof FORMS
    unit: typeof UNITS[number]
    w?: number
    h?: number
    l?: number
    d?: number
    note?: string
}

const measurements: Measurement[] = [
    { placeholderMessageId: 'width', smallCaptionMessageId: 'w', key: 'w', forms: ['plane', 'cube'] },
    {
        placeholderMessageId: 'height',
        smallCaptionMessageId: 'h',
        key: 'h',
        forms: ['plane', 'cube', 'cylinder']
    },
    { placeholderMessageId: 'length', smallCaptionMessageId: 'l', key: 'l', forms: ['line', 'cube'] },
    {
        placeholderMessageId: 'diameter',
        smallCaptionMessageId: 'd',
        key: 'd',
        forms: ['cylinder', 'sphere']
    }
]

const checkMeasurementOfForm = (stateKey: string, form: MeasurementsValue['form']) =>
    !!measurements.find(({ key }) => key === stateKey)?.forms.includes(form)

const MeasurementsProperty = (props: MeasurementsPropertyProps) => {
    // eslint-disable-next-line
    console.log('should init from:', props)

    const [state, setState] = useState<MeasurementsValue>({
        form: 'plane',
        unit: 'cm'
    })

    const intl = useIntl()

    const handleValueChange = (key: keyof MeasurementsValue, value: string | number | undefined) => {
        setState((prev) => {
            const newState = { ...prev, [key]: value }
            // eslint-disable-next-line
            console.log('current state is', newState)

            // this is value without all measurements, only current form ones
            const clearState = Object.entries(newState).reduce((acc, current) => {
                const [stateKey, keyValue] = current

                // if that is optional measurement key, for example d_iameter
                if (MEASUREMENTS_KEYS.find((k) => k === stateKey)) {
                    const isMeasurementAppliedOnForm = checkMeasurementOfForm(stateKey, newState.form)

                    return isMeasurementAppliedOnForm ? { ...acc, [stateKey]: keyValue } : acc
                }
                return { ...acc, [stateKey]: keyValue }
            }, {} as MeasurementsValue)
            // eslint-disable-next-line
            console.log('value for backend is', clearState)

            return newState
        })
    }

    const handleMeasureChange = (measure: Measurement, value: number | undefined) => {
        handleValueChange(measure.key, value)
    }

    return (
        <div className="d-flex flex-column mb-3 w-75">
            <ToggleButtonGroup defaultValue={state.form} name="forms" type="radio" className="mb-3 d-inline-block">
                {Object.entries(FORMS).map(([formId, { messageId, image }]) => (
                    <ToggleButton
                        key={formId}
                        id={`form-${formId}`}
                        variant="outline-secondary"
                        value={formId}
                        checked={state.form === formId}
                        onChange={() => handleValueChange('form', formId as MeasurementsValue['form'])}>
                        <div
                            title={intl.formatMessage({ id: messageId })}
                            className="d-flex align-items-center"
                            style={{
                                width: '1.3rem'
                            }}>
                            {image}
                        </div>
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <div className="mb-3 d-flex flex-row gap-3">
                {measurements
                    .filter(({ forms }) => forms.some((f) => f === state.form))
                    .map((measure) => (
                        <Measure
                            key={measure.key}
                            onChange={handleMeasureChange}
                            measure={measure}
                            value={state[measure.key]}
                        />
                    ))}
            </div>

            <ToggleButtonGroup
                type="radio"
                defaultValue={state.unit}
                name="measurements"
                className="mb-3 d-inline"
                onChange={(value) => handleValueChange('unit', value)}>
                {UNITS.map((unit) => (
                    <ToggleButton
                        key={unit}
                        id={`unit-${unit}`}
                        variant="outline-secondary"
                        value={unit}
                        checked={state.unit === unit}>
                        {intl.formatMessage({ id: unit })}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <Form.Control
                type="text"
                defaultValue={state.note}
                placeholder={intl.formatMessage({ id: 'note' })}
                onChange={(e) => handleValueChange('note', e.target.value)}
            />
        </div>
    )
}

export default MeasurementsProperty
