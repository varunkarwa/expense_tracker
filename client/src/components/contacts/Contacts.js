import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import {ToastsContainer, ToastsContainerPosition, ToastsStore} from 'react-toasts';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    
    const { expenses, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log('Updated')
        checkDate();
    },[expenses]);
    
    if(expenses !== null && expenses.length === 0 && !loading){
        return <h4>Please add a expense</h4>
    }

    const checkDate = () => {
        if(expenses){
            expenses.map(ex => {
                var d1= new Date();
                var d2 = new Date(ex.dueDate);
            
                if(d2.getTime()<d1.getTime()){
                    if(ex.type==='B' && ex.pflag==='UP'){
                        ToastsStore.error(`Pay ${ex.amount} to ${ex.name}`);
                    }
                }
            })
            expenses.map(ex => {
                var d1= new Date();
                var d2 = new Date(ex.dueDate);
            
                if(d2.getTime()<d1.getTime()){
                    if(ex.type==='L' && ex.pflag==='UP'){
                        ToastsStore.success(`Take ${ex.amount} from ${ex.name}`);
                    }
                }
            })
        }
        
        
    }
    return (
        <Fragment>
            <ToastsContainer  store={ToastsStore} />
            {(expenses !== null && !loading) ? ( 
                <TransitionGroup>
                    {(filtered !== null)
                        ? filtered.map(contact => (
                        <CSSTransition key={contact._id} timeout={500} classNames='item'>
                            <ContactItem  contact={contact}/>
                        </CSSTransition> )) 
                        : (<Fragment>
                            
                            <h2>Paid</h2>
                            {expenses.map(contact => (contact.pflag==='P'&&
                            (<CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem  contact={contact}/>
                            </CSSTransition>)
                            ))}
                            <h2>Unpaid</h2>
                            {expenses.map(contact => (contact.pflag==='UP'&&
                            (<CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem  contact={contact}/>
                                
                            </CSSTransition>)
                            ))}
                        </Fragment>)
                    }
                </TransitionGroup> 
            ) : <Spinner />}
        </Fragment>
    )
}

export default Contacts;