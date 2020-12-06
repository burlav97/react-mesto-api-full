import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        })
             
    }
 
   
React.useEffect(()=> {
    setName('');
    setLink('');
}, [isOpen])
    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonText='Сохранить'
            children=
            {
                <>
                    <input type="text" className="popup__item popup__item_el_place" id="title-input" name="name"
                        placeholder="Название" required minLength="1" maxLength="30" value={name} onChange={handleChangeName}/>
                    <span className='popup__item-error' id='title-input-error'></span>
                    <input type="url" className="popup__item popup__item_el_link" id="url-input" name="link" value={link} onChange={handleChangeLink}
                        placeholder="Ссылка на картинку" required />
                    <span className='popup__item-error' id='url-input-error'></span>

                </>
            }
        />

    );
}

export default AddPlacePopup;