import { Fragment } from 'react';

import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';

import mealsImage from '../../assets/meals.jpg';

function Header(props) {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>

        <div className={classes['main-image']}>
            <img src={mealsImage} alt="A table with food"/>
        </div>
    </Fragment>
}

export default Header;