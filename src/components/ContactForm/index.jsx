import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import styles from './styles.module.scss';

const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const listContainsContact = contact => {
        return contacts.some(({ name }) => name.toLowerCase() === contact.name.toLowerCase());
    };

    const handleInput = event => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'phone':
                setPhone(value);
                break;

            default:
                break;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        const contact = { name, phone };

        if (listContainsContact(contact)) {
            return alert(`${contact.name} is already in contacts.`);
        }

        dispatch(addContact(contact));
        setName('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
                {' '}
                Name
                <input
                    onChange={handleInput}
                    value={name}
                    className={styles.input}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label className={styles.label}>
                {' '}
                Number
                <input
                    onChange={handleInput}
                    value={phone}
                    className={styles.input}
                    type="tel"
                    name="phone"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={styles.button} type="submit">
                Add contact
            </button>
        </form>
    );
};

export default ContactForm;
