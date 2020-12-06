import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, children }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: about,
        });
    }

    return (
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            buttonText='Сохранить'
            onSubmit={handleSubmit}
            children={
                <>
                    <input type="text" className="popup__item popup__item_el_name" id="name-input" name="name" placeholder="Имя" value={name} onChange={handleChangeName}
                        required minLength="2" maxLength="40" />
                    <span className='popup__item-error' id='name-input-error'></span>
                    <input type="text" className="popup__item popup__item_el_about-yourself" id="about-input" name="about" value={about} onChange={handleChangeAbout}
                        placeholder="О себе" required minLength="2" maxLength="200" />
                    <span className='popup__item-error' id='about-input-error'></span>

                </>

            } />

    );

}

export default EditProfilePopup;