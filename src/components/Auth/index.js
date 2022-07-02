import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import Button from '~/components/Button';
import { userLogin, userRegister, userUpdate } from '~/redux/toolkit/authSlice';
import { createAxios } from '~/ultils/authenticated';
import styles from './Auth.module.scss';

const cx = classNames.bind(styles);

function Auth({ login = false, register = false, modal = false, className, setOpenEditor }) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const classes = cx('container', {
        [className]: className,
        modal,
        login,
        register,
    });

    const authState = useSelector((state) => state.authState);

    const [nameError, setNameError] = useState(true);
    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);
    const typingTimeoutRef = useRef(null);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(authState, dispatch);

    const { data, loading, error } = useSelector((state) => state.authState);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        const handler = () => {
            if (name === 'name') {
                if (value.trim().length < 3) {
                    typingTimeoutRef.current = setTimeout(() => {
                        setNameError('Enter your Name!');
                    }, 500);
                } else {
                    setNameError(null);
                }
            }
            if (name === 'email') {
                if (validator.isEmail(value)) {
                    setEmailError(null);
                } else {
                    typingTimeoutRef.current = setTimeout(() => {
                        setEmailError('Enter valid Email!');
                    }, 500);
                }
            }
            if (name === 'password') {
                if (value.length > 7) {
                    setPasswordError(null);
                } else {
                    typingTimeoutRef.current = setTimeout(() => {
                        setPasswordError('Password at least 8 characters !!!');
                    }, 500);
                }
            }
            setUser({ ...user, [name]: value });
        };
        handler();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const _user = { ...user };
        delete _user.name;
        dispatch(userLogin({ _user, navigate }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(userRegister({ user, navigate }));
    };

    const handleUpdateInformation = (e) => {
        e.preventDefault();
        dispatch(userUpdate({ axiosJWT, user, navigate }));
        setOpenEditor(false);
    };

    const renderLogin = () =>
        login && (
            <div className={cx('container')}>
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input
                        ref={inputRef}
                        placeholder="Email"
                        name="email"
                        type="email"
                        required
                        value={user.email}
                        onChange={handleChangeInput}
                    />
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        {emailError}
                    </span>
                    <input
                        ref={inputRef}
                        placeholder="Password"
                        name="password"
                        type="password"
                        required
                        // value={user.password}
                        onChange={handleChangeInput}
                    />
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        {passwordError}
                    </span>
                    <div className={cx('row-btn')}>
                        <div className={cx('login-btn')}>
                            <Button medium type="submit" disabled={emailError || passwordError}>
                                Login
                            </Button>
                        </div>
                        <div>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                </form>
            </div>
        );

    const renderRegister = () =>
        register && (
            <div className={cx('container')}>
                <form>
                    <h2>Register</h2>
                    <input
                        ref={inputRef}
                        placeholder="Name"
                        name="name"
                        type="name"
                        required
                        value={user.name}
                        onChange={handleChangeInput}
                    />
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        {nameError}
                    </span>
                    <input
                        ref={inputRef}
                        placeholder="Email"
                        name="email"
                        type="email"
                        required
                        value={user.email}
                        onChange={handleChangeInput}
                    />
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        {emailError}
                    </span>
                    <input
                        ref={inputRef}
                        placeholder="Password"
                        name="password"
                        type="password"
                        required
                        value={user.password}
                        onChange={handleChangeInput}
                    />
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        {passwordError}
                    </span>
                    <div className={cx('row-btn')}>
                        <div className={cx('register-btn')}>
                            <Button
                                medium
                                type="submit"
                                disabled={emailError || passwordError || nameError}
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </div>
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        );

    const renderModal = () =>
        modal && (
            <div className={classes}>
                <form>
                    <div className={cx('header')}>
                        <h2>Edit Information</h2>
                        <FontAwesomeIcon icon={faClose} onClick={() => setOpenEditor(false)} />
                    </div>
                    <input
                        ref={inputRef}
                        placeholder="Name"
                        name="name"
                        type="name"
                        value={user.name}
                        onChange={handleChangeInput}
                    />
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        {nameError}
                    </span>
                    <input
                        ref={inputRef}
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChangeInput}
                    />
                    <span
                        style={{
                            color: 'red',
                        }}
                    >
                        {emailError}
                    </span>
                    <div className={cx('row-btn')}>
                        <div className={cx('register-btn')}>
                            <Button
                                medium
                                type="submit"
                                disabled={emailError && nameError}
                                onClick={handleUpdateInformation}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        );

    if (login) return renderLogin();
    if (register) return renderRegister();
    if (modal) return renderModal();
}

export default Auth;
