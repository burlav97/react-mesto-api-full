import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import { api } from '../utils/api.js';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as mestoAuth from '../mestoAuth.js';
import {getToken, setToken, removeToken} from '../utils/token';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarProfilePopup] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectCard, setSelectCard] = React.useState(null);
  const [isTrashOpen, setIsTrashOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [status, setStatus] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();


  React.useEffect(() => {
    api.getAppInfo().then((res) => {
      const [cards, info] = res;
      setCurrentUser(info);
      setCards(cards);
    })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  function handleEditAvatarClick() {
    setAvatarProfilePopup(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopup(true);

  }
  function handleAddPlaceClick() {
    setAddPlacePopup(true);
  }
  function handleCardClick(card) {
    setSelectCard(card);
  }
  function handleTrashClick() {
    setIsTrashOpen(true);
  }
  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }
  function closeAllPopups() {
    setAvatarProfilePopup(false);
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setIsTrashOpen(false);
    setSelectCard(null);
    setIsInfoTooltipOpen(false);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.putLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.putDislike(card._id).then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);

      })
        .catch((err) => {
          console.log(err);
        });
    }

  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    api.editUserInfo({ name, about }).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace({ name, link }) {
    api.addNewCard({ name, link }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function onRegister(data) {
    const { email, password } = data;
    mestoAuth.register(email, password).then((res) => {
      if (res.statusCode !== 400) {
        setStatus('sucess');
        handleInfoTooltipOpen();
        history.push('/signin');
      }
    })
      .catch((err) => {
        console.log(err);
        if (err.status === 400) {
          setStatus('unsucess');
          handleInfoTooltipOpen();
          return console.log('Некорректно заполнено одно из полей');
        }
        else if
          (err.status === 500) {
          setStatus('unsucess');
          handleInfoTooltipOpen();
          return console.log('Ошибка сервера');
        }
      });
  }

  const onLogin = (data) => {
    const { email, password } = data;
    mestoAuth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setEmail(email);
          setLoggedIn(true)
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 400) {
          return console.log('Некорректно заполнено одно из полей');
        }
        else if
          (err.status === 500) {
          return console.log('Ошибка сервера');
        }
        else if
          (err.status === 401) {
          return console.log('Пользователь не найден');
        }
      });

  }

  const onSignOut = () => {
    removeToken();
    setLoggedIn(false);
    history.push('/signin');
  }

  React.useEffect(() => {
    const jwt = getToken();
    if (jwt) {
      mestoAuth.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(email);
          setStatus(res);
          history.push('/')
        }
      })
      .catch((err) => {
        console.log(err.status);
        if (err.status === 401) {
          removeToken();
          return console.log('Переданный токен некорректен');
        } else if (!jwt) {
          removeToken();
          return console.log('Токен не передан или передан не в том формате');
        } else if (err.status === 500) {
          removeToken();
          return console.log('Ошибка сервера');
        }
      });
    }
  }, []);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="root">
          <div className="page">
            <Header
              email={email}
              loggedIn={loggedIn}
              onSignOut={onSignOut}
            />
           <Switch>
           <Route path="/signup">
              <Register  onRegister={onRegister}  />
            </Route>
            <Route path="/signin">
             <Login onLogin={onLogin} />
           </Route>           
           <ProtectedRoute exact path="/"
              loggedIn={loggedIn}            
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onTrashClick={handleTrashClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              email={email}
              component={Main}
            /> 
             <Route  path="/"  >
               {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
             </Route >              
                                         
                                        
            </Switch> 
            <Route exact path="/"  >
              <Footer />
            </Route>

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace} />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar} />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser} />

            <PopupWithForm
              name='formAccord'
              isOpen={isTrashOpen}
              title='Вы уверены?'
              onClose={closeAllPopups}
              buttonText='Да'
            />

            <InfoTooltip
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              status={status}>
            </InfoTooltip>

            <ImagePopup card={selectCard}
              onClose={closeAllPopups} />

          </div>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider >
  );
}

export default App;
