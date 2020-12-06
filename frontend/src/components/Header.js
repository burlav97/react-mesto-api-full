import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function Header({ loggedIn, email, onSignOut }) {
    const headerClassName = `${loggedIn ? 'header__email' : 'header__email_hidden'}`;
    return (
        <header className="header">
            <div className="logo "></div>
            <div className='header__container'>
                <p className={headerClassName}>{email}</p>
                
                    <Switch>
                        <Route path="/signup">
                            <Link to="/signin" className="header__link">Войти</Link>
                        </Route>
                        <Route path="/signin">
                            <Link to="/signup" className="header__link">Регистрация</Link>
                        </Route>
                        < Route exact path="/">
                            <Link to="/signin" className="header__link" onClick={onSignOut}>Выйти</Link>
                        </Route>
                    </Switch>
                
            </div>
        </header>
    );
}
export default Header;