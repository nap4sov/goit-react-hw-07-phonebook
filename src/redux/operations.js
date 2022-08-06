import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://62ece0c2a785760e675ef3df.mockapi.io';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    const contacts = await axios.get('/contacts').then(({ data }) => data);
    return contacts;
});

export const addContact = createAsyncThunk('contacts/addContact', async contact => {
    const newContact = axios.post('/contacts', contact).then(({ data }) => data);
    return newContact;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async id => {
    const idToDelete = await axios.delete(`/contacts/${id}`).then(({ data }) => data.id);
    return idToDelete;
});
