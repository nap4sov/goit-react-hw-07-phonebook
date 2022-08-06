import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const ContactListItem = ({ id, name, phone }) => {
    const dispatch = useDispatch();

    const onDeleteClick = () => {
        dispatch(deleteContact(id));
    };

    return (
        <li className={styles.listItem}>
            <span>
                {name}: {phone}
            </span>
            <button onClick={onDeleteClick} id={id} className={styles.button} type="button">
                x
            </button>
        </li>
    );
};

ContactListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
};

export default ContactListItem;
