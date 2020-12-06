import React from 'react';
import iconLike from '../images/like.svg'
import iconLikeActive from '../images/heartactive.svg'
import {CurrentUserContext  } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardTrashButtonClassName = ` ${isOwn ? 'cards__button-delete' : 'cards__button-delete_hidden'
        }`;
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `${isLiked ? 'cards__button-like_active' : 'cards__button-like'
        }`;
    return (
        <li className="cards__item">
            <img className="cards__image" alt={card.name} src={card.link} onClick={(_) => onCardClick(card)} />
            <div className="cards__description">
                <h4 className="cards__title">{card.name}</h4>
                <div className="cards__like">
                    <button className={cardLikeButtonClassName}
                     onClick={(_) => onCardLike(card)}  type="button" aria-label="Нравится" style={isLiked ? { backgroundImage: `url(${iconLikeActive})` }  : { backgroundImage: `url(${iconLike})` }} ></button>
                    <p className="cards__like-sum">{card.likes.length}</p>
                </div>
            </div>
            <button className={cardTrashButtonClassName} onClick={(_) => onCardDelete(card)}  type="button" aria-label="Удалить"></button>
        </li>
    )
}

export default Card;