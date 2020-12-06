import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, children }) {

        
    const avatarRef = React.useRef();
   

    

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });  
    }

    React.useEffect(()=> {
        onUpdateAvatar({
            avatar: '',
        }); 
    }, [isOpen])
  


    return (
        <PopupWithForm
            name='avatar'
            isOpen={isOpen}
            title='Обновить аватар'
            buttonText='Сохранить'
            onSubmit={handleSubmit}
            onClose={onClose}
            children={
                <>
                    <input type="url" className="popup__item popup__item_el_link-avatar" id="url-input" name="link"
                        placeholder="Ссылка на картинку" required ref={avatarRef}/>
                    <span className='popup__item-error' id='url-input-error'></span>

                </>

            } />
    );
}

export default EditAvatarPopup;