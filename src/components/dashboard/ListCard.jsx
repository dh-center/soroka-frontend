import React from 'react'
import './ListCard.css'

function ListCard(
    { titleOfCard = 'Название карточки', srcOfPlaceholder = require('../../assets/Image.png') },
    isComplete = false,
    className
) {
    return (
        <div className="card__wrap">
            <div className="card__header">
                <img src={srcOfPlaceholder} alt="" />
                {isComplete ? (
                    <span className="card__is-complete">Не заполнена</span>
                ) : (
                    <span className="card__is-complete">Заполнена</span>
                )}
            </div>
            <h4 className="card__title">{titleOfCard}</h4>
        </div>
    )
}

export default ListCard
