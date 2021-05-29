import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const { _id, name, amount, pflag, type, dueDate} = contact;

    const onDelete = e => {
        deleteContact( _id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' + 
                        (type === 'B' ? 'badge-success':'badge-primary')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {amount && (<li>
                    <i className='fas fa-envelope-open'></i> {amount}
                </li>)}
                {dueDate && (<li>
                    <i className='fas fa-phone'></i> {dueDate}
                </li>)}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
};

ContactItem.protoTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;