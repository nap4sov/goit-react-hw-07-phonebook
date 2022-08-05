import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact, filterContacts } from './actions';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const LS_KEY = 'contacts';

const contactsPersistConfig = {
    key: LS_KEY,
    storage,
    blacklist: 'filter',
};

const itemsReducer = createReducer([], {
    [addContact]: (state, { payload }) => [payload, ...state],
    [deleteContact]: (state, { payload }) => state.filter(({ id }) => id !== payload),
});

const filterReducer = createReducer('', {
    [filterContacts]: (_, action) => action.payload,
});

export const rootReducer = {
    contacts: persistReducer(
        contactsPersistConfig,
        combineReducers({
            items: itemsReducer,
            filter: filterReducer,
        }),
    ),
};
