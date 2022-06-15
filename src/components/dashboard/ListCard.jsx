import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { getCardById } from '../../utils/routes'
import './ListCard.css'

function ListCard({
    titleOfCard = 'Название карточки',
    srcOfPlaceholder = require('../../assets/Image.png'),
    element
}) {
    return (
        <Link className="route-link" to={`${getCardById(element.id)}`}>
            <div className="card__wrap">
                <div className="card__header">
                    <img src={srcOfPlaceholder} alt="" />
                    {!element.isFilled ? (
                        <span className="card__is-complete">
                            <FormattedMessage id="notFilled" />
                        </span>
                    ) : (
                        <span className="card__is-complete">
                            <FormattedMessage id="filled" />
                        </span>
                    )}
                </div>
                <h4 className="card__title">{titleOfCard}</h4>
            </div>
        </Link>
    )
}

export default ListCard
