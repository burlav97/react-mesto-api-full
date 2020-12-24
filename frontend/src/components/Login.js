import React from 'react';

const Login = ({onLogin}) => {
    const [data, setData] = React.useState({
        email: '',
        password: '',
    });

    
    function handleChange(e) {
        const {name, value} = e.target;
          setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(data);
    }

    return (
        <section className="popup popup_type_sign">
            <form 
            className="popup__container popup__form popup__container_sign" 
            name="loginform" 
            onSubmit={handleSubmit} 
            noValidate
            >
                <h3 className="popup__title popup__title_type_sign">Вход</h3>
                <input type="email"
                    className="popup__item popup__item_type_sign"
                    id="loginemail"
                    name="email"
                    placeholder="Email"
                    required
                    minLength="2" maxLength="40"
                    pattern="[а-яёА-ЯЁA-Za-z \-]*"
                    onChange={handleChange}
                    value={data.email || ''}/>
                <span className='popup__item-error' id='email-input-error'></span>
                <input type="password"
                        className="popup__item popup__item_type_sign"
                        id="password-input" name="password"
                        placeholder="Пароль"
                        required
                        minLength="8"
                        maxLength="20"
                        onChange={handleChange}
                        value={data.password || ''}/>
                <span className='popup__item-error' id='about-input-error'></span>
                <button className="popup__button-save popup__button-save_type_sign" type="submit">Войти</button>
            </form>
        </section>
    )
}

export default Login;
