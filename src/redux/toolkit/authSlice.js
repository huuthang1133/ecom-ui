import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAxios } from '~/ultils/authenticated';
import * as httpRequest from '~/ultils/httpRequest';
import { notifyError, notifySuccess } from '~/ultils/notify';

export const logout = createAsyncThunk('auth/logout', async (payload, thunkAPI) => {
    await httpRequest.get(`logout`);
    localStorage.removeItem('persist:auth');
    return initialState.data;
});

export const userLogin = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
    const { navigate } = payload;
    const res = await httpRequest.post(`login`, payload._user);
    const { msg, accesstoken, _user } = res;
    if (msg) {
        notifyError(msg);
        return thunkAPI.rejectWithValue(msg);
    } else if (accesstoken.length) {
        navigate('/');
        notifySuccess('Login Successfully !!!');
        return { _user, accesstoken };
    }
});

export const userUpdate = createAsyncThunk('auth/update', async (payload, thunkAPI) => {
    const { axiosJWT, user } = payload;
    const { password, ...updateUser } = user;
    try {
        const res = await axiosJWT.put(`update`, { _user: updateUser });
        return res.data._user;
    } catch (err) {
        notifyError(err.response.data.msg);
        return thunkAPI.rejectWithValue(err.response.data.msg);
    }
});

export const userRegister = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
    const { user, navigate } = payload;
    const res = await httpRequest.post(`register`, user);
    const { msg, accesstoken, ..._user } = res;
    if (msg) {
        notifyError(msg);
        return thunkAPI.rejectWithValue(msg);
    } else if (accesstoken.length) {
        navigate('/');
        notifySuccess('Register Successfully !!!');
        return { _user, accesstoken };
    }
});

export const authenticate = createAsyncThunk(
    'auth/authenticate',
    async (payload, { getState, dispatch, rejectWithValue }) => {
        const authState = getState().authState;
        let axiosJWT = createAxios(authState, dispatch);

        const { params, navigate } = payload;
        if (params === 'infor') {
            try {
                const res = await axiosJWT.get(params);
                return res.data;
            } catch (err) {
                dispatch(logout());
                navigate('/login');
                if (!err.response) {
                    return rejectWithValue(err.message);
                } else return rejectWithValue(err.response.data.msg);
            }
        } else {
            try {
                const res = await axiosJWT.get(params);
                return res.data;
            } catch (err) {
                navigate('/');
                if (!err.response) {
                    return rejectWithValue(err.message);
                } else return rejectWithValue(err.response.data.msg);
            }
        }
    },
);

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.data = payload;
        },
        logout,
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                authSlice.caseReducers.setUser(state, action);
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userRegister.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                authSlice.caseReducers.setUser(state, action);
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(authenticate.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                state.loading = false;
                state.data._user = action.payload;
            })
            .addCase(authenticate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                notifyError(action.payload);
            })
            .addCase(logout.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userUpdate.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userUpdate.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data._user = action.payload;
            })
            .addCase(userUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
