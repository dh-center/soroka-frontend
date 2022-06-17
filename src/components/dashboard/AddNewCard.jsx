import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { PlusCircleDotted } from 'react-bootstrap-icons'
import { FormattedMessage } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'
import { CARDS_CREATE_ROUTE } from '../../utils/routes'

const AddNewCard = () => {
    const navigate = useNavigate()

    return (
        <Card onClick={() => navigate(CARDS_CREATE_ROUTE)} role="button">
            <Card.Img as={Container} variant="top" className="position-relative">
                <div style={{ height: '150px', backgroundColor: 'white' }}></div>
                <PlusCircleDotted size={48} className="position-absolute top-50 start-50 translate-middle" />
            </Card.Img>
            <Card.Footer className="text-center">
                <FormattedMessage id="add" />
            </Card.Footer>
        </Card>
    )
}

export default AddNewCard
