import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { authenticate } from '~/redux/toolkit/authSlice';
import { createAxios } from '~/ultils/authenticated';

function AdminRoute({ children }) {
    const authState = useSelector((state) => state.authState);
    const { error } = authState;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let axiosJWT = createAxios(authState, dispatch);
    const params = `admin`;
    useEffect(() => {
        dispatch(authenticate({ params, axiosJWT, navigate, dispatch }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (error?.length) <Navigate to="/login" />;
    return <>{children}</>;
}

export default AdminRoute;
