import { useDispatch, useSelector } from 'react-redux';
import CartItem from '~/components/Cart';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Button from '~/components/Button';
import { createAxios } from '~/ultils/authenticated';
import { CheckOut } from '~/redux/toolkit/cartSlice';
import { useCallback } from 'react';

const cx = classNames.bind(styles);
function Cart() {
    const cartState = useSelector((state) => state.cartState);
    const authState = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const { data } = cartState;
    let axiosJWT = createAxios(authState, dispatch);

    const handleCheckOut = useCallback(() => {
        const handler = (e) => {
            e.preventDefault();
            dispatch(CheckOut({ axiosJWT }));
        };
        handler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!cartState.data.length) return <h1>Cart Empty</h1>;
    return (
        <div className={cx('container')}>
            <>
                {data.map((product, index) => (
                    <CartItem product={product} key={index} />
                ))}
            </>
            <div className={cx('total')}>
                Total: <span>{data.reduce((prev, { price, quantity }) => prev + price * quantity, 0)}$</span>
            </div>
            <div className={cx('btn')}>
                <Button medium to="/" className={cx('item')}>
                    Continue
                </Button>
                <Button medium onClick={handleCheckOut} className={cx('item')}>
                    Check Out
                </Button>
            </div>
        </div>
    );
}

export default Cart;
