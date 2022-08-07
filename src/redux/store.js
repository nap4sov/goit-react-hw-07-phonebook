import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import { persistStore, REGISTER, REHYDRATE, FLUSH, PAUSE, PERSIST, PURGE } from 'redux-persist';
import { itemsReducer, filterReducer, loadingReducer, errorReducer } from './reducers';

const rootReducer = {
    contacts: combineReducers({
        items: itemsReducer,
        filter: filterReducer,
        loading: loadingReducer,
    }),
    error: errorReducer,
};

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware({
        serializableCheck: { ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE] },
    }),
});

export const persistor = persistStore(store);
