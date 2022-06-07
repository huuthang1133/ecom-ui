import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ disabled }) {
    return (
        <div className={cx('product-card')}>
            <img
                src="https://images.unsplash.com/photo-1654249706314-fbb44dbf0ebb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                alt="product_card"
            />

            <div className={cx('product-box')}>
                <h2>hot girl</h2>
                <h4 className={cx('product-price')}>
                    <span>Price :</span>
                    <span className={cx('price-number')}> 100$</span>
                </h4>
                <span className={cx('product-description')}>
                    How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.
                </span>
            </div>
            <div className={cx('product-btn')}>
                <Button disabled={disabled} onClick={() => alert('Add to cart')}>
                    ADD TO CART
                </Button>
                <Button to="/login">VIEW</Button>
            </div>
        </div>
    );
}

export default ProductCard;
