import React, {useContext} from 'react';
import iconPlus from '../images/plus.svg';
import iconEdit from '../images/penavatar.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick, 
    onCardLike,
    onCardDelete
}) {
    
    const currentUser = React.useContext(CurrentUserContext);
    const cards = React.useContext(CardsContext);


    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__container">
                        <img className="profile__avatar" alt="" name="avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
                        <div className="profile__img-hover" onClick={onEditAvatar} ></div>
                        <div className="profile__info">
                            <div className="profile__edit-container">
                                <h2 className="profile__title">{currentUser.name}</h2> 
                                <button onClick={onEditProfile} className="profile__button-edit"
                                    type="button"></button>
                            </div>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                    </div>
                    <button onClick={onAddPlace} className="profile__button-add" type="button"><img className=" profile__icon-plus"
                        src={iconPlus} alt="Плюс" /></button>
                </section>

                <section className="elements">
                    <ul className="cards">
                        {cards.map((card) => (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardDelete={onCardDelete}
                                onCardLike={onCardLike}
                            />

                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
}
export default Main;