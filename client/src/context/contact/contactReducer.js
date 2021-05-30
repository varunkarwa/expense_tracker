// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case 'GET_CONTACTS':
            return {
                ...state,
                expenses: action.payload,
                loading: false
            };
        case 'ADD_CONTACT': 
            return {
                ...state,
                expenses: [
                    action.payload,
                    ...state.expenses
                ],
                loading: false
            };
        case 'UPDATE_CONTACT':
            return {
                ...state,
                expenses: state.expenses.map(contact => contact._id === action.payload._id ? action.payload : contact),
                loading: false
            };
        case 'DELETE_CONTACT':
            return{
                ...state,
                expenses: state.expenses.filter(contact => contact._id !== action.payload),
                loading: false
            };
        case 'CLEAR_CONTACTS':
            return{
                ...state,
                expenses: null,
                filtered: null,
                error: null,
                current: null
            };
        case 'SET_CURRENT':
            return{
                ...state,
                current: action.payload
            };
        case 'CLEAR_CURRENT':
            return{
                ...state,
                current: null
            };
        case 'FILTER_CONTACTS':
            return {
                ...state,
                filtered: state.expenses.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex);
                })
            };
        case 'CLEAR_FILTER': 
            return{
                ...state,
                filtered: null
            };
        case 'CONTACT_ERROR': 
            return{
                ...state,
                error: action.payload
            }
        case 'CHANGE_LOADER':
            return {
                ...state,
                loading: !state.loading
            }
        default: 
          return state;  
    }
}