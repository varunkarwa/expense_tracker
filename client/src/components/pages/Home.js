import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';
import ContactChart from '../contacts/ContactChart';
import Chart from '../contacts/Chart'
const Home = () => {
    const authContext = useContext(AuthContext); 

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
    
    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
                <Chart />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
};

export default Home;
