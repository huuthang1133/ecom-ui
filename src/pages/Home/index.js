import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Filter from '~/components/Filter';
import LoadMore from '~/components/LoadMore';
import ProductCard from '~/components/ProductCard';
import { useDebounce } from '~/hooks';
import { addCart } from '~/redux/toolkit/cartSlice';
import { getProducts } from '~/redux/toolkit/productSlice';
import { createAxios } from '~/ultils/authenticated';
import Loading from '~/ultils/loading';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: products, loading } = useSelector((state) => state.productState);
    const authState = useSelector((state) => state.authState);
    const cartState = useSelector((state) => state.cartState);
    let axiosJWT = createAxios(authState, dispatch);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');

    const debounceValue = useDebounce(search, 1000);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearch('');
            dispatch(getProducts({ sort, limit: page * 9, category }));
        } else {
            dispatch(getProducts({ sort, limit: page * 9, 'title[regex]': debounceValue, category }));
        }
    }, [dispatch, debounceValue, sort, page, category]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const handleAddToCart = async (product) => {
        dispatch(addCart({ cartState, product, axiosJWT, navigate, dispatch }));
    };

    const props = {
        search: [search, setSearch],
        sort: [sort, setSort],
        category: [category, setCategory],
    };
    return (
        <div className={cx('wrapper')}>
            <Filter props={props} />
            {!loading && !products?.length ? (
                <>No result</>
            ) : (
                <>
                    <div className={cx('container')}>
                        <>
                            {!products.length && loading ? (
                                <Loading />
                            ) : (
                                products?.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        disabled={!product.quantity && true}
                                        product={product}
                                        onClick={handleAddToCart}
                                    />
                                ))
                            )}
                        </>
                    </div>
                    {products.length % 9 === 0 && <LoadMore onClick={handleLoadMore} />}
                </>
            )}
        </div>
    );
}

export default Home;
