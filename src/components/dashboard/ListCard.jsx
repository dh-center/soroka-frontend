import React from 'react'
import { FormattedMessage } from 'react-intl'
import './ListCard.css'

function ListCard(
    { titleOfCard = 'Название карточки', srcOfPlaceholder = require('../../assets/Image.png') },
    isComplete = false,
) {
    return (
        <div className="card__wrap">
            <div className="card__header">
                <img src={srcOfPlaceholder} alt="" />
                {isComplete ? (
                    <span className="card__is-complete">
                        <FormattedMessage id="notFilled" />
                    </span>
                ) : (
                    <span className="card__is-complete">
                        <FormattedMessage id="Filled" />
                    </span>
                )}
            </div>
            <h4 className="card__title">{titleOfCard}</h4>
        </div>
    )
}

export default ListCard
