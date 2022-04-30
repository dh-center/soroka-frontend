import React, { Suspense, useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { templatesAPI } from '../../api/templates'
import { getCreateCardRoute } from '../../utils/routes'
import './CardTemplate.css'

function CardTemplates({
    listOfTemplates = [
        {
            id: 0,
            template: 'game'
        },
        {
            id: 1,
            template: 'people'
        },
        {
            id: 2,
            template: 'document'
        },
        {
            id: 3,
            template: 'game'
        },
        {
            id: 4,
            template: 'people'
        },
        {
            id: 5,
            template: 'document'
        }
    ]
}) {
    const [data, setData] = useState([])
    useEffect(() => {
        templatesAPI
            .getListOfTemplates()
            .then((res) => setData(res.data))
            .catch((e) => console.log(e))
    }, [])
    return (
        <Container className="card-templates">
            <Row className="d-flex justify-content-start">
                {data.length === 0 && <h2>Загрузка шаблонов</h2>}
                {data.map((el) => {
                    return (
                        <Col key={el.id} xl={'2'} className="me-3 mb-3">
                            <Card body className="h-100">
                                <Link
                                    to={`${getCreateCardRoute()}?template=${el.id}`}
                                    className="d-flex justify-content-center p-4"
                                >
                                    {el.name}
                                </Link>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default CardTemplates
