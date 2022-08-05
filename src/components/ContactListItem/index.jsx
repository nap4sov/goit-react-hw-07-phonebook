import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/actions';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const ContactListItem = ({ id, name, number }) => {
    const dispatch = useDispatch();

    const onDeleteClick = () => {
        dispatch(deleteContact(id));
    };

    return (
        <li className={styles.listItem}>
            <span>
                {name}: {number}
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
    number: PropTypes.string.isRequired,
};

export default ContactListItem;
