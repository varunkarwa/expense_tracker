import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    
    const { addContact, current, clearCurrent, updateContact} = contactContext;

    useEffect(() => {
        if(current !== null){
            setContact(current);
        } else{
            setContact({
                name: '',
                amount: '',
                pflag: 'P',
                type: 'B',
                dueDate:""
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        amount: '',
        pflag: 'P',
        type: 'B',
        dueDate:''
    });

    const { name, amount, pflag, dueDate, type} = contact;

    const onChange = e => setContact({
        ...contact,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addContact(contact);
        }else{
            console.log(contact);
            updateContact(contact);
        }

        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit} >
            <h2 className='text-primary'>{current ? 'Edit Expense' : 'Add Expense'}</h2>
            <input 
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input 
                type='text'
                placeholder='Amount'
                name='amount'
                value={amount}
                onChange={onChange}
            />
            <h5>Payment type</h5>
            <input 
                type='radio' 
                name='pflag' 
                value='P' 
                checked={pflag === 'P'} 
                onChange={onChange}/
            > Paid{' '}
            <input 
                type='radio' 
                name='pflag' 
                value='UP' 
                checked={pflag === 'UP'} 
                onChange={onChange}/
            > Unpaid
            <h5>Take or give</h5>
            <input 
                type='radio' 
                name='type' 
                value='B' 
                checked={type === 'B'} 
                onChange={onChange}/
            > Borrowed{' '}
            <input 
                type='radio' 
                name='type' 
                value='L' 
                checked={type === 'L'} 
                onChange={onChange}/
            > Lend
            <input 
                type='date' 
                name='dueDate' 
                value={dueDate}  
                onChange={onChange}
            />
            <div>
                <input 
                    type='submit' 
                    value={current ? 'Update Expense' : 'Add Expense'}
                    className='btn btn-primary btn-block'
                />
            </div>
            {current && 
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
                </div>
            }
        </form>
    )
}

export default ContactForm
