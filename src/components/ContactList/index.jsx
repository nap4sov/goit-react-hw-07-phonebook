import { useSelector } from 'react-redux';
import ContactListItem from 'components/ContactListItem';
import Notification from 'components/Notification';
import styles from './styles.module.scss';

const ContactList = () => {
    const contacts = useSelector(state => state.contacts.items);
    const filterValue = useSelector(state => state.contacts.filter);

    const contactsListEmpty = contacts.length === 0;
    const filteredContacts = contacts.filter(({ name }) =>
        name.toLowerCase().includes(filterValue),
    );

    if (contactsListEmpty) {
        return <Notification title="Contacts list is empty" />;
    }
    if (!contactsListEmpty && filteredContacts.length === 0) {
        return <Notification title="No contact with such name found" />;
    }

    return (
        <ul className={styles.list}>
            {filteredContacts.map(({ id, name, number }) => (
                <ContactListItem key={id} id={id} name={name} number={number} />
            ))}
        </ul>
    );
};

export default ContactList;
