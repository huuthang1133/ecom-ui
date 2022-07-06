import { faBars, faCartShopping, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import config from '~/config';
import { logout } from '~/redux/toolkit/authSlice';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const [menuMobile, setMenuMobile] = useState(false);
    const cartState = useSelector((state) => state.cartState);
    const authState = useSelector((state) => state.authState);
    const dispatch = useDispatch();

    const menu = [
        {
            path: config.routes.category,
            name: 'category',
        },
        {
            path: config.routes.create_product,
            name: 'products',
        },
        {
            path: config.routes.profile,
            name: authState.data?._user?.name,
        },
    ];

    const handleLogout = (e) => {
        handleCloseMenuMobile();
        navigate('/login');
        dispatch(logout());
    };

    const handleMenuMobile = (e) => {
        setMenuMobile(true);
    };

    const handleCloseMenuMobile = (e) => {
        setMenuMobile(false);
    };

    const renderMenuMobile = () => (
        <div className={cx('menu-mobile')}>
            {authState.data?._user?.role === 1 ? (
                <>
                    {menu.map((item) => (
                        <NavLink to={item.path} onClick={handleCloseMenuMobile}>
                            {item.name}
                        </NavLink>
                    ))}
                    <Button normal onClick={handleLogout}>
                        LOG OUT
                    </Button>
                </>
            ) : authState.data?._user ? (
                <>
                    <NavLink to={config.routes.profile} onClick={handleCloseMenuMobile}>
                        {authState.data?._user.name}
                    </NavLink>
                    <Button normal onClick={handleLogout}>
                        LOG OUT
                    </Button>
                </>
            ) : (
                <>
                    <NavLink to={config.routes.home} onClick={handleCloseMenuMobile}>
                        SHOP
                    </NavLink>
                    <NavLink to={config.routes.login} onClick={handleCloseMenuMobile}>
                        LOG IN
                    </NavLink>
                </>
            )}
            <FontAwesomeIcon className={cx('icon')} icon={faClose} onClick={handleCloseMenuMobile} />
        </div>
    );

    return (
        <header className={cx('header')}>
            <FontAwesomeIcon icon={faBars} className={cx('menu-icon')} onClick={handleMenuMobile} />
            <div className={cx('logo')}>
                <Link to={config.routes.home}>ECOM-UI</Link>
            </div>
            <div className={cx('menu')}>
                <div className={cx('user')}>
                    {authState.data?._user ? (
                        authState.data?._user.role !== 1 ? (
                            <Link to={config.routes.profile} style={{ margin: 0, paddingRight: 10 }}>
                                {authState.data?._user.name}{' '}
                            </Link>
                        ) : (
                            <>
                                {menu.map((item, index) => (
                                    <Link key={index} to={item.path}>
                                        {item.name}
                                    </Link>
                                ))}
                            </>
                        )
                    ) : (
                        <Link to={config.routes.home} style={{ margin: 0, paddingRight: 10 }}>
                            SHOP
                        </Link>
                    )}
                </div>
                <div className={cx('login')}>
                    {authState.data?._user ? (
                        <Button normal onClick={handleLogout}>
                            LOG OUT
                        </Button>
                    ) : (
                        <Link to={config.routes.login}>LOGIN</Link>
                    )}
                </div>
            </div>
            <Link to={config.routes.cart}>
                <div className={cx('cart')}>
                    <FontAwesomeIcon icon={faCartShopping} className={cx('cart-icon')} />
                    <div>
                        <span>{0 || cartState.data.reduce((prev, current) => prev + current.quantity, 0)}</span>
                    </div>
                </div>
            </Link>
            {menuMobile && renderMenuMobile()}
        </header>
    );
}

export default memo(Header);
