import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ContactListItem from 'components/ContactListItem';
import Notification from 'components/Notification';
import { fetchContacts } from 'redux/operations';
import {
    getIsLoading,
    getFilteredContacts,
    contactsIsEmpty,
    getErrorMessage,
} from 'redux/selectors';
import styles from './styles.module.scss';

const ContactList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const isLoading = useSelector(getIsLoading);
    const contactsListEmpty = useSelector(contactsIsEmpty);
    const filteredContacts = useSelector(getFilteredContacts);
    const errorMessage = useSelector(getErrorMessage);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (errorMessage) {
        return <Notification title={errorMessage} />;
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
