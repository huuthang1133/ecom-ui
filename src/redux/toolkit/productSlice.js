import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notifyError, notifySuccess } from '~/ultils/notify';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
});

export const getProducts = createAsyncThunk('products/getProducts', async (payload, thunkAPI) => {
    try {
        const res = await httpRequest.get(`products`, {
            params: { ...payload },
        });
        return res.data.products;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
});

export const deleteProduct = createAsyncThunk(`products/deleteProduct`, async (payload, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        const { _id, axiosJWT } = payload;
        const res = await axiosJWT.delete(`products/${_id}`);
        dispatch(getProducts());
        notifySuccess(res.data.msg);
    } catch (err) {
        notifyError(err.response.data.msg);
        return rejectWithValue(err.response.data.msg);
    }
});

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
