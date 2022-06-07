import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const [menuMobile, setMenuMobile] = useState(false);

    const handleMenuMobile = (e) => {
        setMenuMobile(true);
    };
    return (
        <header className={cx('header')}>
            <FontAwesomeIcon icon={faBars} className={cx('menu-icon')} onClick={handleMenuMobile} />
            <div className={cx('logo')}>
                <Link to={config.routes.home}>ECOM-UI</Link>
            </div>
            <div className={cx('login')}>
                <Link to={config.routes.login}>LOGIN</Link>
            </div>
            <Link to={config.routes.cart}>
                <div className={cx('cart')}>
                    <FontAwesomeIcon icon={faCartShopping} className={cx('cart-icon')} />
                    <div>
                        <span>0</span>
                    </div>
                </div>
            </Link>
        </header>
    );
}

export default Header;
