import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '~/ultils/loading';
import Button from '../Button';
import RelatedProduct from './components/RelatedProduct';
import styles from './DetailProduct.module.scss';
import { useDispatch } from 'react-redux';
import { addCart } from '~/redux/toolkit/cartSlice';
import { createAxios } from '~/ultils/authenticated';
import httpRequest from '~/ultils/httpRequest';

const cx = classNames.bind(styles);

function DetailProduct() {
    const { id } = useParams();
    const { data: products } = useSelector((state) => state.productState);
    const authState = useSelector((state) => state.authState);
    const cartState = useSelector((state) => state.cartState);
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const flashsale = 0.4;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartState);
    let axiosJWT = createAxios(authState, dispatch);

    const handleAddToCart = async (product) => {
        dispatch(addCart({ cartState, product, axiosJWT, navigate, dispatch }));
    };

    useEffect(() => {
        if (id) {
            if (products.length) {
                const detailProduct = products.find((_product) => _product._id === id);
                if (!detailProduct) {
                    const fetchProduct = async () => {
                        try {
                            const res = await httpRequest.get(`/product/${id}`);
                            setProduct(res.data);
                        } catch (err) {
                            alert(err.response.data.msg);
                        }
                    };
                    fetchProduct();
                }
                setProduct(detailProduct);
                if (detailProduct) {
                    const index = detailProduct.category.products.findIndex((product) => product._id === id);
                    if (index >= 0) {
                        const _related = [...detailProduct.category.products];
                        _related.splice(index, 1);
                        setRelatedProducts(_related);
                    }
                }
            }
        }
    }, [id, products, cart]);

    if (product?.title)
        return (
            <>
                <div className={cx('wrapper')}>
                    <div className={cx('image')}>
                        <img src={product.images && product.images.url} alt="images" />
                    </div>

                    <div className={cx('product-box')}>
                        <div className={cx('product-category')}>
                            <span>{product.category.name}</span>
                        </div>
                        <h2 className={cx('product-title')}>{product.title}</h2>

                        <div className={cx('product-price')}>
                            <div>
                                <span className={cx('main-price-number')}>{product.price}$</span>
                                <span className={cx('price-number')}>
                                    {' '}
                                    {Math.round(product.price / (1 - flashsale), 0)}$$
                                </span>
                            </div>
                            <div className={cx('product-flashsale')}>
                                <span>{flashsale * 100}%</span>
                            </div>
                        </div>
                        <div className={cx('product-description')}>{product.description}</div>
                        <>
                            {product.quantity ? (
                                <Button large onClick={() => handleAddToCart(product)}>
                                    ADD TO CART
                                </Button>
                            ) : (
                                <h4 className={cx('product-outstock')}>OUT OF STOCK</h4>
                            )}
                        </>
                    </div>
                </div>
                <h2>Related Products</h2>
                <RelatedProduct products={relatedProduct} />
            </>
        );
    return <Loading />;
}

export default DetailProduct;
