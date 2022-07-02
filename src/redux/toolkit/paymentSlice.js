import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as httpRequest from '~/ultils/httpRequest';
import { notifyError } from '~/ultils/notify';

export const getPayment = createAsyncThunk('payment/getpayment', async (payload, thunkAPI) => {
    const { axiosJWT } = payload;
    try {
        const res = await axiosJWT.get(`payment`);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
    }
});

export const getPayments = createAsyncThunk('payment/getpayments', async (payload, thunkAPI) => {
    const { axiosJWT } = payload;
    try {
        const res = await axiosJWT.get(`payments`);
        console.log(res);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
    }
});

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPayment.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(getPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getPayments.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPayments.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(getPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default paymentSlice.reducer;
