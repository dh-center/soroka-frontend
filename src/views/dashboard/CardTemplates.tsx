import { observer } from 'mobx-react-lite'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import PageLayout from 'components/common/PageLayout'

import { CARDS_ROUTE, getCreateWithTemplateRoute } from 'utils/urls'

import { useStore } from 'stores/rootStore'

import { PropertyTemplate } from 'stores/propertiesStore'

type TemplateProps = {
    id?: number
    name?: string
    labelId: string
    propertiesList?: any
    noPropertiesMessageId?: string
}

const Template = ({
    id,
    name,
    labelId,
    propertiesList,
    noPropertiesMessageId = 'choosePropertiesByYourself'
}: TemplateProps) => {
    const navigate = useNavigate()
    const intl = useIntl()
    const propertiesString = propertiesList?.length
        ? propertiesList
              .map(({ labelId: propertyLabelId }: { labelId: string }) =>
                  intl.formatMessage({ id: propertyLabelId }).toLocaleLowerCase()
              )
              .join(', ')
        : intl.formatMessage({ id: noPropertiesMessageId })

    return (
        <Card key={id} onClick={() => navigate(getCreateWithTemplateRoute(name))} role="button" className="h-100">
            <Card.Body>
                <Card.Title>
                    <FormattedMessage id={labelId} />
                </Card.Title>
                {propertiesString}
            </Card.Body>
        </Card>
    )
}

const CardTemplates = observer(() => {
    const navigate = useNavigate()
    const { propertiesStore } = useStore()
    const { templates }: { templates: PropertyTemplate[] } = propertiesStore

    const goBackHandler = () => {
        navigate(CARDS_ROUTE)
    }

    return (
        <PageLayout titleMessageId="templates" goBackHandler={goBackHandler}>
            <Container>
                <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-2">
                    {templates.map(({ name, labelId, id, propertiesList }) => (
                        <Col key={id}>
                            <Template id={id} labelId={labelId} name={name} propertiesList={propertiesList} />
                        </Col>
                    ))}
                    <Col>
                        <Template labelId="withoutTemplate" />
                    </Col>
                </Row>
            </Container>
        </PageLayout>
    )
})

export default CardTemplates
