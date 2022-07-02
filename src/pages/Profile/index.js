import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Information from '~/components/Information';
import OrderHistory from '~/components/OrderHistory';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Proifle() {
    const authState = useSelector((state) => state.authState);
    const { data } = authState;
    return (
        <div className={cx('container')}>
            {data._user?.role === 1 ? <></> : <Information user={data._user} />}
            <OrderHistory authState={authState} />
        </div>
    );
}

export default Proifle;
