import React from 'react';

function PopupWithForm({ isOpen, name, title, onClose, children, onSubmit, buttonText }) {
    return (
        <section className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}  >
            <form className={`popup__container popup__form popup__container_${name}`} name={`${name}`} action="url" method="post"
                onSubmit={onSubmit} noValidate>
                <button className="popup__button-close popup__button-close-edit" onClick={onClose} type="button"
                    aria-label="Закрыть"></button>
                <h3 className="popup__title">{title}</h3>
                {children}
    <button className="popup__button-save" type="submit">{buttonText}</button>
            </form>
        </section>
    );
}
export default PopupWithForm;