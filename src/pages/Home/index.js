import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Filter from '~/components/Filter';
import LoadMore from '~/components/LoadMore';
import ProductCard from '~/components/ProductCard';
import { useDebounce } from '~/hooks';
import { getProducts } from '~/redux/toolkit/productSlice';
import Loading from '~/ultils/loading';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const { data: products, loading } = useSelector((state) => state.productState);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');

    const debounceValue = useDebounce(search, 1000);

    useEffect(() => {
        if (debounceValue?.length || sort || page !== 1 || category) {
            dispatch(getProducts({ sort, limit: page * 9, 'title[regex]': debounceValue, category }));
        }
        if (!debounceValue.trim().length && products?.length < 9) {
            dispatch(getProducts());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, debounceValue, sort, page, category]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const props = {
        search: [search, setSearch],
        sort: [sort, setSort],
        category: [category, setCategory],
    };

    console.log('Home...');
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
