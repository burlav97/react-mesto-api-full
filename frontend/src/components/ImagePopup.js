import React from 'react';

function ImagePopup({card, onClose}) {
    return (
      
            <section id="popupZoom" className={card ? 'popup popup_type_image popup_opened' : 'popup popup_type_image'}>
                <form className="popup__container popup__container_image" name="popup" method="post" action="#" noValidate>
                    <button className="popup__button-close popup__button-close-image" type="button" onClick={onClose}
                        aria-label="Закрыть"></button>
                    <img className="popup__image" src={card && card.link} alt={card && card.name} />
                    <p className="popup__subtitle">{card && card.name}</p>
                </form>
            </section>

    );
}
export default ImagePopup;