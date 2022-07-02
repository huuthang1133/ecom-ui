import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setUser } from '~/redux/toolkit/authSlice';
import * as httpRequest from './httpRequest';

export const refreshToken = async () => {
    try {
        const res = await httpRequest.get(`refresh_token`);
        return res;
    } catch (err) {
        return err;
    }
};

export const createAxios = (state, dispatch) => {
    const newInstance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
    newInstance.interceptors.request.use(
        async (config) => {
            config.headers['Authorization'] = state?.data?.accesstoken;
            let date = new Date();
            const decodedToken = jwt_decode(state?.data?.accesstoken);
            if (decodedToken.exp < date.getTime() / 1000) {
                const res = await refreshToken();
                if (res.data?.accesstoken) {
                    const refreshUser = {
                        _user: { ...state.data._user },
                        accesstoken: res.data.accesstoken,
                    };
                    dispatch(setUser(refreshUser));
                    config.headers['Authorization'] = res.data.accesstoken;
                } else return Promise.reject(res);
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return newInstance;
};
