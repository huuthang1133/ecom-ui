import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '~/redux/toolkit/authSlice';

function PrivateRoute({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = 'infor';
    useEffect(() => {
        dispatch(authenticate({ params, navigate }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
    return <>{children}</>;
}

export default PrivateRoute;
