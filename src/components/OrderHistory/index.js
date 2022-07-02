import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPayment, getPayments } from '~/redux/toolkit/paymentSlice';
import { createAxios } from '~/ultils/authenticated';
import OrderHistoryItem from '../OrderHistoryItem';
import styles from './OrderHistory.module.scss';

const cx = classNames.bind(styles);

function OrderHistory({ authState }) {
    const { data } = useSelector((state) => state.paymentState);
    const dispatch = useDispatch();
    const { _user } = authState.data;

    let axiosJWT = createAxios(authState, dispatch);

    useEffect(() => {
        if (_user.role === 1) {
            dispatch(getPayments({ axiosJWT }));
        } else dispatch(getPayment({ axiosJWT }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className={cx('container')}>
            <h3>Your orders:</h3>
            <>
                <table className={cx('desktop')}>
                    <thead>
                        <tr>
                            <th className={cx('date')}>Date</th>
                            <th className={cx('images')}>Images</th>
                            <th className={cx('items')}>Items</th>
                            <th className={cx('total')}>Totals</th>
                        </tr>
                        <>
                            {data?.length
                                ? data?.map((payment) => (
                                      <tr key={payment._id}>
                                          <OrderHistoryItem payment={payment} />
                                      </tr>
                                  ))
                                : null}
                        </>
                    </thead>
                </table>
            </>
            <>
                <table className={cx('mobile')}>
                    <thead>
                        <tr>
                            <th className={cx('date')}>Date</th>
                            <th className={cx('items')}>Items</th>
                            <th className={cx('total')}>Totals</th>
                        </tr>
                        <>
                            {data?.length
                                ? data?.map((payment) => (
                                      <tr key={payment._id}>
                                          <OrderHistoryItem payment={payment} mobile />
                                      </tr>
                                  ))
                                : null}
                        </>
                    </thead>
                </table>
            </>
        </div>
    );
}

export default OrderHistory;
