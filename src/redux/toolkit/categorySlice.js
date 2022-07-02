import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as httpRequest from '~/ultils/httpRequest';

export const getCategories = createAsyncThunk(`categories/getCategories`, async (payload, thunkAPI) => {
    try {
        const res = await httpRequest.get(`category`);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
    }
});

export const createCategory = createAsyncThunk(`categories/createCategory`, async (payload, thunkAPI) => {
    try {
        const res = await httpRequest.post(`category`, payload);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.msg);
    }
});

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createCategory.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;
