import React, {Fragment, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent,changeStatus,loader } = contactContext;

    const { _id, name, amount, pflag, type, dueDate} = contact;

    const onDelete = e => {
        deleteContact( _id);
        clearCurrent();
    }

    // useEffect(() => {
    //     var d1= new Date();
    //     var d2 = new Date(dueDate);

    //     if(d2.getTime()<=d1.getTime()){
    //         if(type==='B'){
    //             ToastsStore.error(`Pay ${amount} to ${name}`);
    //         }
    //         else{
    //             ToastsStore.success(`Take ${amount} from ${name}`);
    //         }
    //     }
    // },[])

    return (
        <Fragment>
        {//<ToastsContainer  store={ToastsStore} />
        }
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' + 
                        (type === 'B' ? 'badge-danger':'badge-primary')
                    }
                >
                    {type==='B'? 'Borrowed':'Lend'}
                </span>
            </h3>
            <ul className='list'>
                {amount && (<li>
                    <i className='fas fa-money-check-alt'></i> {amount}
                </li>)}
                {dueDate && (<li>
                    <i className='fas fa-clock'></i> {dueDate}
                </li>)}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={() => setCurrent(contact)}>Edit</button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
                {(pflag==='UP') && <button className='btn btn-success btn-sm' onClick={() => {
                    changeStatus(contact)
                    window.location.reload(false);
                }}>Paid</button>}
            </p>
        </div>
        </Fragment>
    )
};

ContactItem.protoTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;