import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import cartSlice from './toolkit/cartSlice';
import productSlice from './toolkit/productSlice';
import storage from 'redux-persist/lib/storage';
import authSlice from './toolkit/authSlice';
import paymentSlice from './toolkit/paymentSlice';
import categorySlice from './toolkit/categorySlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['cartState'],
};

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['data'],
};

const persistAuth = persistReducer(authPersistConfig, authSlice);

const rootReducer = combineReducers({
    productState: productSlice,
    categoryState: categorySlice,
    cartState: cartSlice,
    authState: persistAuth,
    paymentState: paymentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
