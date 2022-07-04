import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button';
import { deleteProduct } from '~/redux/toolkit/productSlice';
import { createAxios } from '~/ultils/authenticated';
import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard({ disabled, product, NoButton = false, to = false, onClick }) {
    const { _id, title, price, images, description } = product;

    const authState = useSelector((state) => state.authState);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(authState, dispatch);

    const handleDeleteProduct = (e) => {
        dispatch(deleteProduct({ axiosJWT, _id, dispatch }));
    };

    const classes = cx('product-description', {
        to,
    });

    const flashsale = 0.4;

    return (
        <div className={cx('product-card')}>
            {to ? (
                <Link to={`/products/${_id}`}>
                    <div className={cx('product-img')}>
                        <img src={images.url} alt="" />
                    </div>
                    <div className={cx('product-box')}>
                        <div className={cx('product-title')}>
                            <Tippy content={title}>
                                <h2>{title}</h2>
                            </Tippy>
                        </div>
                        <h4 className={cx('product-price')}>
                            <div>
                                <span className={cx('main-price-number')}>{price}$</span>
                                <span className={cx('price-number')}> {Math.round(price / (1 - flashsale), 0)}$</span>
                            </div>
                            <div className={cx('product-flashsale')}>
                                <span>{flashsale * 100}%</span>
                            </div>
                        </h4>
                        <div className={classes}>{description}</div>
                    </div>
                    <div className={cx('product-btn')}>
                        {NoButton ? (
                            <></>
                        ) : (
                            <>
                                <Button disabled={disabled} onClick={() => onClick(product)}>
                                    ADD TO CART
                                </Button>
                                <Button to={`/products/${_id}`}>VIEW </Button>
                            </>
                        )}
                    </div>
                </Link>
            ) : (
                <>
                    <div className={cx('product-img')}>
                        <img src={images.url} alt="product_card" />
                    </div>

                    <div className={cx('product-box')}>
                        <div className={cx('product-title')}>
                            <Tippy content={title}>
                                <h2>{title}</h2>
                            </Tippy>
                        </div>
                        <h4 className={cx('product-price')}>
                            <div>
                                <span className={cx('main-price-number')}>{price}$</span>
                                <span className={cx('price-number')}> {Math.round(price / (1 - flashsale), 0)}$</span>
                            </div>
                            <div className={cx('product-flashsale')}>
                                <span>{flashsale * 100}%</span>
                            </div>
                        </h4>
                        <div className={classes}>{description}</div>
                    </div>
                    <div className={cx('product-btn')}>
                        {NoButton ? (
                            <></>
                        ) : authState.data?._user?.role === 1 ? (
                            <>
                                <Button onClick={handleDeleteProduct}>DELETE</Button>
                                <Button to={`/edit_product/${_id}`}>EDIT</Button>
                            </>
                        ) : (
                            <>
                                <Button disabled={disabled} onClick={() => onClick(product)}>
                                    ADD TO CART
                                </Button>
                                <Button to={`/products/${_id}`}>VIEW </Button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductCard;
