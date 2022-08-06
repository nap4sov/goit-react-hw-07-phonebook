export const getContacts = state => state.contacts.items;

export const getIsLoading = state => state.contacts.loading;

export const getFilterValue = state => state.contacts.filter;

export const getFilteredContacts = state => {
    const contacts = getContacts(state);
    const filter = getFilterValue(state);
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
};

export const contactsIsEmpty = state => getContacts(state).length === 0;

export const getErrorMessage = state => state.error;
