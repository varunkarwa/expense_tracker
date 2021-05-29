import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import ContactChart from './ContactChart';

const Chart =() => {
    const contactContext = useContext(ContactContext);
    const [f,setF] = useState(false);
    const { expenses, filtered, getContacts, loading } = contactContext;
    const [newDa,setNewDa] = useState(null);
    const data = [
        {
            name:'Jan',
            month: 1,
            bval: 0,
            lval:0
        },
        {
            name:'Feb',
            month: 2,
            bval: 0,
            lval:0
        },
        {
            name:'Mar',
            month: 3,
            bval: 0,
            lval:0
        },
        {
            name:'Apr',
            month: 4,
            bval: 0,
            lval:0
        },
        {
            name:'May',
            month: 5,
            bval: 0,
            lval:0
        },
        {
            name:'June',
            month: 6,
            bval: 0,
            lval:0
        },
        {
            name:'July',
            month: 7,
            bval: 0,
            lval:0
        },
        {
            name:'Aug',
            month: 8,
            bval: 0,
            lval:0
        },
        {
            name:'Sep',
            month: 9,
            bval: 0,
            lval:0
        },
        {
            name:'Oct',
            month: 10,
            bval: 0,
            lval:0
        },
        {
            name:'Nov',
            month: 11,
            bval: 0,
            lval:0
        },
        {
            name:'Dec',
            month: 12,
            bval: 0,
            lval:0
        }
    ]
    useEffect(() => {
        if(expenses && !f){
            console.log(expenses)
            expenses.map(ex => {
                var m = parseInt(ex.dueDate.substring(5,7));
                console.log(m)
                data.map(d => {
                    if(d.month == m){
                        if(ex.type==='B'){
                            d.bval+=ex.amount;
                        }else{
                            d.lval+=ex.amount;
                        }
                    }
                })
            })
            console.log(data);
            setNewDa(data);
            setF(true)
        }
        //eslint-disable-next-line
    }, [expenses]);
    return (
        <Fragment>
            {f && <ContactChart data={newDa} />}
        </Fragment>
    )
}

export default Chart;