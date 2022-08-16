import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { authActions } from '../store/slices/auth-slice';
import classes from './Header.module.scss';

const Header = () => {
    const [menuIsClicked, setMenuIsClicked] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('isLogged');
        localStorage.removeItem("Token");
        history.replace('/');
    };

    const activeClassHandler = () => {
        setMenuIsClicked(state => !state);
    };

    return <div className={classes.header}>
        <div className={classes.header__logo}>
            <h1>Guys</h1>
        </div>  
        <div className={classes.header__nav}>
        <ul>
            <li><NavLink to='/' activeClassName={classes.link__active}>Home</NavLink></li>
            <li><NavLink to='/profile' activeClassName={classes.link__active}>Profile</NavLink></li>
            <li><button onClick={logoutHandler}>Logout</button></li>
        </ul>
        </div>
        <nav className={classes.navbar}>
        <ul className={menuIsClicked ? classes.menu_active : classes.menu}>
            <li className={classes.navbar__item}><NavLink onClick={activeClassHandler} className={classes.navbar__link} to='/'>Home</NavLink></li>
            <li className={classes.navbar__item}><NavLink onClick={activeClassHandler} className={classes.navbar__link} to='/profile'>Profile</NavLink></li>
            <li className={classes.navbar__item}><button onClick={logoutHandler} className={classes.navbar__link_btn}>Logout</button></li>
        </ul>
        
        <div className={menuIsClicked ? classes.hamburger_active : classes.hamburger} onClick={activeClassHandler}>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
        </div>
        </nav>
    </div>
};

export default Header;