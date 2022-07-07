import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '~/ultils/notify';
import { logout } from './authSlice';
import { getProducts } from './productSlice';

const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const addCart = createAsyncThunk('cart/addcart', async (payload, { getState, dispatch, rejectWithValue }) => {
    const { product, axiosJWT, navigate } = payload;
    try {
        const res = await axiosJWT.get('infor');
        const { data } = res;
        const { cartState } = getState();
        if (data) {
            const index = cartState.data.findIndex((_product) => _product._id === product._id);
            if (index > -1) {
                const newCart = cartState.data.map((_product, i) => {
                    if (index === i) {
                        return { ..._product, quantity: _product.quantity + 1 };
                    } else return { ..._product };
                });
                return newCart;
            }
            return [...cartState.data, { ...product, quantity: 1 }];
        }
    } catch (err) {
        dispatch(logout());
        navigate('/login');
        if (!err.response) {
            return rejectWithValue(err.message);
        }
        return rejectWithValue(err.response.data.msg);
    }
});

export const CheckOut = createAsyncThunk('cart/checkout', async (payload, { getState, dispatch, rejectWithValue }) => {
    const { axiosJWT } = payload;
    try {
        const res = await axiosJWT.post(`payment`, {
            cart: getState().cartState.data,
        });
        notifySuccess(res.data.msg);
        dispatch(getProducts());
        return [];
    } catch (err) {
        return rejectWithValue(err.response.data.msg);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeItemInCart: (state, action) => {
            state.data = action.payload;
        },
        updateItemInCart: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCart.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addCart.rejected, (state, action) => {
                notifyError(action.payload);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(CheckOut.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(CheckOut.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [];
            })
            .addCase(CheckOut.rejected, (state, action) => {
                notifyError(action.payload);
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { removeItemInCart, updateItemInCart } = cartSlice.actions;

export default cartSlice.reducer;
