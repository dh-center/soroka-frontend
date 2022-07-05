import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import PageLayout from '../../components/common/PageLayout'
import { mainContext } from '../../context/mainContext'
import { CARDS_ROUTE, getCreateWithTemplateRoute } from '../../utils/urls'

const Template = ({ id, name, labelId, propertiesList, noPropertiesMessageId = 'choosePropertiesByYourself' }) => {
    const navigate = useNavigate()
    const intl = useIntl()
    const propertiesString = propertiesList?.length
        ? propertiesList
              .map(({ labelId: propLabelId }) => intl.formatMessage({ id: propLabelId }).toLocaleLowerCase())
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
    const { propertiesStore } = useContext(mainContext)
    const { templates } = propertiesStore

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
