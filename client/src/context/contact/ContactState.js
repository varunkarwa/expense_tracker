import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

const ContactState = props => {
    const initialState = {
        expenses: null,
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Get Contact
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/expenses');
            console.log(res.data);
            dispatch({ 
                type: 'GET_CONTACTS', 
                payload: res.data 
            });   
        } catch (err) {
            console.log(err);
            dispatch({ 
                type: 'CONTACT_ERROR',
                payload: err.response.msg
            });
        }
    }

    //Add Contact
    const addContact = async contact => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/expenses', contact, config);
            console.log(res.data);
            dispatch({ 
                type: 'ADD_CONTACT', 
                payload: res.data 
            });   
        
        } catch (err) {
            console.log(err);
            dispatch({ 
                type: 'CONTACT_ERROR',
                payload: err.response.msg
            });
        }
    }

    //Delete Contact
    const deleteContact = async id => {
        try {
           await axios.delete( `/api/expenses/${id}` );
            
           dispatch({ type: 'DELETE_CONTACT', payload: id });            
        } catch (err) {
            dispatch({ 
                type: 'CONTACT_ERROR',
                payload: err.response.msg
            });
        }
    };

     //Update Contact
     const updateContact = async contact => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`/api/expenses/${contact._id}`, contact, config);
            
            dispatch({ 
                type: 'UPDATE_CONTACT', 
                payload: res.data 
            });   
        } catch (err) {
            dispatch({ 
                type: 'CONTACT_ERROR',
                payload: err.response.msg
            });
        }
        
        dispatch({ type: 'UPDATE_CONTACT', payload: contact });
    };

    const changeStatus = async contact => {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(`/api/expenses/status/${contact._id}`, {pflag:'P'}, config);
            
            dispatch({ 
                type: 'UPDATE_CONTACT', 
                payload: res.data 
            });   
        } catch (err) {
            dispatch({ 
                type: 'CONTACT_ERROR',
                payload: err.response.msg
            });
        }
        
        dispatch({ type: 'UPDATE_CONTACT', payload: contact });
    };

    //Clear Contacts
    const clearContacts = () => {
        dispatch({ type: 'CLEAR_CONTACTS' });
    }

    //Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: 'SET_CURRENT', payload: contact });
    }

    //Clear Current Contact
    const clearCurrent = contact => {
        dispatch({ type: 'CLEAR_CURRENT' });
    }

    //Filter Contacts
    const filterContacts = text => {
        dispatch({ type: 'FILTER_CONTACTS', payload: text });
    }

    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: 'CLEAR_FILTER' });
    }

    const loader = () => {
        dispatch({ type: 'CHANGE_LOADER' });
    }

    return (
        <ContactContext.Provider value={{
            expenses: state.expenses,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContacts,
            addContact,
            deleteContact,
            clearContacts,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            changeStatus,
            loader
        }}> 
            { props.children }
        </ContactContext.Provider>
    )
};

export default ContactState;