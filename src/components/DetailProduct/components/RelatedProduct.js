import classNames from 'classnames/bind';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ProductCard from '~/components/ProductCard';
import styles from './RelatedProduct.module.scss';

const cx = classNames.bind(styles);

function RelatedProduct({ products, onClick }) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: products.length < 3 ? products.length : 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    infinite: true,
                },
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            {products ? (
                <div className={cx('container')}>
                    <Slider {...settings}>
                        {products.map((product) => (
                            <div className={cx('inner')} key={product._id}>
                                <ProductCard NoButton product={product} to />
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <>No Relate Product</>
            )}
        </div>
    );
}

export default RelatedProduct;
