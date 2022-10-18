import { useEffect, useState } from 'react'
import { Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { MeasurementsPropertyProps, MeasurementsValue } from '../../../stores/propertiesStore'
import Plane from '../../../assets/images/Plane.svg'
import Line from '../../../assets/images/Line.svg'
import Sphere from '../../../assets/images/Sphere.svg'
import Cylinder from '../../../assets/images/Cylinder.svg'
import Cube from '../../../assets/images/Cube.svg'
import Measure from './Measure'

const UNITS = ['mm', 'sm', 'm']

const FORMS = {
    cylinder: { messageId: 'cylinder', image: Cylinder },
    cube: { messageId: 'cube', image: Cube },
    sphere: { messageId: 'sphere', image: Sphere },
    plane: { messageId: 'plane', image: Plane },
    line: { messageId: 'line', image: Line }
}

type UnitsValue = {
    [index: string]: number | undefined
}

export type Measurement = {
    placeholderMessageId: string
    smallCaptionMessageId: string
    key: string
    forms: (keyof typeof FORMS)[]
}

const measurements: Measurement[] = [
    { placeholderMessageId: 'length', smallCaptionMessageId: 'l', key: 'l', forms: ['line', 'cube'] },
    { placeholderMessageId: 'width', smallCaptionMessageId: 'w', key: 'w', forms: ['plane', 'cube'] },
    {
        placeholderMessageId: 'height',
        smallCaptionMessageId: 'h',
        key: 'h',
        forms: ['plane', 'cube', 'cylinder']
    },
    {
        placeholderMessageId: 'diameter',
        smallCaptionMessageId: 'd',
        key: 'd',
        forms: ['cylinder', 'sphere']
    }
]

const checkMeasurementOfForm = (measure: string, form: string) =>
    measurements.find((item) => item.key === measure)?.forms.includes(form as MeasurementsValue['form'])

const MeasurementsProperty = (props: MeasurementsPropertyProps) => {
    const [measurementsValue, setMeasurementsValue] = useState<UnitsValue>({
        w: undefined,
        h: undefined,
        l: undefined,
        d: undefined
    })
    const [currentForm, setCurrentForm] = useState<MeasurementsValue['form']>('cylinder')
    const [currentUnit, setCurrentUnit] = useState<MeasurementsValue['unit']>('mm')
    const [currentNote, setCurrentNote] = useState('')

    const intl = useIntl()

    useEffect(() => {
        const measuresResult = Object.values(
            Object.entries(measurementsValue)
                .filter((item) => checkMeasurementOfForm(item[0], currentForm))
                .map((item) => ({ [item[0]]: item[1] }))
        ).reduce((acc, current) => {
            return { ...acc, ...current }
        }, {})

        const resultValue: MeasurementsValue = {
            form: currentForm,
            unit: currentUnit,
            ...measuresResult,
            note: currentNote
        }
    }, [JSON.stringify(measurementsValue), currentForm, currentUnit, currentNote])

    const handleMeasureChange = (measure: Measurement, value: number | undefined) => {
        setMeasurementsValue((prev) => ({ ...prev, [measure.key]: value }))
    }

    return (
        <div className="d-flex flex-column mb-3 w-75">
            <ToggleButtonGroup defaultValue={currentForm} name="forms" type="radio" className="mb-3">
                {Object.entries(FORMS).map(([formId, { messageId, image }]) => (
                    <ToggleButton
                        key={formId}
                        id={`form-${formId}`}
                        variant="outline-secondary"
                        value={messageId}
                        checked={currentForm === formId}
                        onChange={() => setCurrentForm(formId as MeasurementsValue['form'])}>
                        <img src={image} alt="" width="30rem" height="30rem" />
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <div className="mb-3 d-flex flex-row gap-3">
                {measurements
                    .filter(({ forms }) => forms.some((f) => f === currentForm))
                    .map((measure) => (
                        <Measure
                            onChange={handleMeasureChange}
                            measure={measure}
                            value={measurementsValue[measure.key]}
                        />
                    ))}
            </div>

            <ToggleButtonGroup
                type="radio"
                defaultValue={currentUnit}
                name="measurements"
                className="mb-3"
                onChange={(value) => setCurrentUnit(value)}>
                {UNITS.map((unit) => (
                    <ToggleButton
                        key={unit}
                        id={`unit-${unit}`}
                        variant="outline-secondary"
                        value={unit}
                        checked={currentUnit === unit}>
                        {intl.formatMessage({ id: unit })}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            <Form.Control
                type="text"
                value={currentNote}
                placeholder={intl.formatMessage({ id: 'note' })}
                onChange={(e) => setCurrentNote(e.target.value)}
            />
        </div>
    )
}

export default MeasurementsProperty
