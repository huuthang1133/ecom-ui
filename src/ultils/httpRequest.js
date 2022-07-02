import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

export const get = async (path, options = {}) => {
    try {
        const res = await httpRequest.get(path, options);
        return res;
    } catch (err) {
        return err;
    }
};

export const post = async (path, options = {}) => {
    try {
        const res = await httpRequest.post(path, options);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export const put = async (path, options = {}) => {
    try {
        const res = await httpRequest.put(path, options);
        return res.data;
    } catch (err) {
        return err.response.data;
    }
};

export default httpRequest;
