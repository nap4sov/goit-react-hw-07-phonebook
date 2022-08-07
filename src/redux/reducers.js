import { createReducer } from '@reduxjs/toolkit';
import { filterContacts } from './actions';
import { fetchContacts, addContact, deleteContact } from './operations';

const itemsReducer = createReducer([], {
    [fetchContacts.fulfilled]: (_, { payload }) => payload,
    [addContact.fulfilled]: (state, { payload }) => [payload, ...state],
    [deleteContact.fulfilled]: (state, { payload }) => state.filter(({ id }) => id !== payload),
});

const filterReducer = createReducer('', {
    [filterContacts]: (_, { payload }) => payload,
});

const loadingReducer = createReducer(false, {
    [fetchContacts.pending]: () => true,
    [fetchContacts.fulfilled]: () => false,
    [fetchContacts.rejected]: () => false,
    [addContact.pending]: () => true,
    [addContact.fulfilled]: () => false,
    [addContact.rejected]: () => false,
    [deleteContact.pending]: () => true,
    [deleteContact.fulfilled]: () => false,
    [deleteContact.rejected]: () => false,
});

const errorReducer = createReducer(null, {
    [fetchContacts.rejected]: (_, { error }) => error.message,
    [fetchContacts.pending]: () => null,
    [addContact.rejected]: (_, { error }) => error.message,
    [addContact.pending]: () => null,
    [deleteContact.rejected]: (_, { error }) => error.message,
    [deleteContact.pending]: () => null,
});


export { itemsReducer, filterReducer, loadingReducer, errorReducer };
