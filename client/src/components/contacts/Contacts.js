import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    
    const { expenses, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);
    
    if(expenses !== null && expenses.length === 0 && !loading){
        return <h4>Please add a expense</h4>
    }
    return (
        <Fragment>
            {expenses !== null && !loading ? ( 
                <TransitionGroup>
                    {filtered !== null
                        ? filtered.map(contact => (
                        <CSSTransition key={contact._id} timeout={500} classNames='item'>
                            <ContactItem  contact={contact}/>
                        </CSSTransition> )) 
                        : expenses.map(contact => (
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem  contact={contact}/>
                            </CSSTransition>
                            ))}
                </TransitionGroup> 
            ) : <Spinner />}
        </Fragment>
    )
}

export default Contacts;