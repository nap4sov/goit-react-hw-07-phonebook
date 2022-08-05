import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/actions';
import styles from './styles.module.scss';

const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const listContainsContact = contact => {
        return contacts.some(({ name }) => name.toLowerCase() === contact.name.toLowerCase());
    };

    const handleInput = event => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;

            default:
                break;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        const contact = { name, number, id: nanoid() };

        if (listContainsContact(contact)) {
            return alert(`${contact.name} is already in contacts.`);
        }

        dispatch(addContact(contact));
        setName('');
        setNumber('');
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
                    value={number}
                    className={styles.input}
                    type="tel"
                    name="number"
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
