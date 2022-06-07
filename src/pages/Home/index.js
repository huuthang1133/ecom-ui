import ProductCard from '~/components/ProductCard';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('container')}>
            <ProductCard disabled />
            <ProductCard />
            <ProductCard />
        </div>
    );
}
export default Home;
