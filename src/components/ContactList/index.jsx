import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ContactListItem from 'components/ContactListItem';
import Notification from 'components/Notification';
import { fetchContacts } from 'redux/operations';
import styles from './styles.module.scss';

const ContactList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const contacts = useSelector(state => state.contacts.items);
    const isLoading = useSelector(state => state.loading);
    const filterValue = useSelector(state => state.contacts.filter);

    const contactsListEmpty = contacts.length === 0;
    const filteredContacts = contacts.filter(({ name }) =>
        name.toLowerCase().includes(filterValue),
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (contactsListEmpty) {
        return <Notification title="Contacts list is empty" />;
    }
    if (!contactsListEmpty && filteredContacts.length === 0) {
        return <Notification title="No contact with such name found" />;
    }

    return (
        <ul className={styles.list}>
            {filteredContacts.map(({ id, name, phone }) => (
                <ContactListItem key={id} id={id} name={name} phone={phone} />
            ))}
        </ul>
    );
};

export default ContactList;
