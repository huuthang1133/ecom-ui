import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '~/redux/toolkit/authSlice';

function AdminRoute({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = `admin`;
    useEffect(() => {
        dispatch(authenticate({ params, navigate }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <>{children}</>;
}

export default AdminRoute;
