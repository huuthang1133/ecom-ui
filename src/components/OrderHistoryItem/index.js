import styles from './OrderHistoryItem.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function OrderHistoryItem({ payment, mobile }) {
    const { cart, createdAt } = payment;
    return (
        <>
            {mobile ? (
                <>
                    <td className={cx('date')}>{new Date(createdAt).toLocaleDateString()}</td>
                    <td className={cx('title')}>
                        <h4>{cart[0].title}</h4>
                    </td>
                    <td className={cx('total')}>
                        {0 || cart.reduce((prev, current) => prev + current.price * current.quantity, 0)}$
                    </td>
                </>
            ) : (
                <>
                    <td className={cx('date')}>{new Date(createdAt).toLocaleDateString()}</td>
                    <td>
                        <img src={cart[0].images.url} alt="" />
                    </td>
                    <td className={cx('title')}>
                        <h4>{cart[0].title}</h4>
                    </td>
                    <td className={cx('total')}>
                        {0 || cart.reduce((prev, current) => prev + current.price * current.quantity, 0)}$
                    </td>
                </>
            )}
        </>
    );
}

export default OrderHistoryItem;
