import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemInCart, updateItemInCart } from '~/redux/toolkit/cartSlice';
import { useState } from 'react';

const cx = classNames.bind(styles);

function CartItem({ product }) {
    const [error, setError] = useState('');
    const { title, price, images, quantity } = product;
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cartState);
    const handleRemoveItem = (e) => {
        const index = cartState.data.findIndex((item) => item._id === product._id);
        const newCart = [...cartState.data];
        newCart.splice(index, 1);
        dispatch(removeItemInCart(newCart));
    };
    const handleChangeQuantity = (e) => {
        if (Number.isInteger(parseInt(e.target.value)) && e.target.value > 0) {
            setError(null);
            const index = cartState.data.findIndex((item) => item._id === product._id);
            if (index > -1) {
                const newCart = cartState.data.map((_product, i) => {
                    if (index === i) {
                        return { ..._product, quantity: parseInt(e.target.value) };
                    } else return { ..._product };
                });
                setError(null);
                dispatch(updateItemInCart(newCart));
            }
        } else setError('Not valid');
    };
    return (
        <div className={cx('container')}>
            <img src={images.url} alt="" />
            <div className={cx('box-product')}>
                <h4 className={cx('product-title')}>{title}</h4>
                <div className={cx('product-price')}>
                    <div className={cx('product-price-beforesale')}>{price}$</div>
                    <div className={cx('product-price-aftersale')}>{price}$</div>
                </div>
                <div className={cx('quantity')}>
                    <form action="/action_page.php">
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            max="5"
                            defaultValue={quantity}
                            onChange={handleChangeQuantity}
                        />
                    </form>
                    <span
                        style={{
                            color: 'red',
                            fontSize: '10px',
                        }}
                    >
                        {error}
                    </span>
                </div>
                <div className={cx('total')}>{price * quantity}$</div>
                <FontAwesomeIcon onClick={(e) => handleRemoveItem()} className={cx('delete')} icon={faRemove} />
            </div>
        </div>
    );
}

export default CartItem;
