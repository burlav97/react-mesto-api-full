import React from 'react';
import successImg from '../images/success.png';
import errorImg from '../images/error.png';

function InfoTooltip({ isOpen, onClose, status }) {
    return (
        <div className={isOpen ? "popup popup_opened" : "popup"}>
            <div className='popup__container'>
                <button className="popup__button-close popup__button-close-edit" onClick={onClose} type="button"
                aria-label="Закрыть"></button>
                <img
            className="popup__status-img"
            src={ (status === 'sucess') ? successImg : errorImg }
            alt="Значок соединения"            
        />
        < h2 className="popup__text">
          { (status === 'sucess') ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!Попробуйте ещё раз." }
        </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;