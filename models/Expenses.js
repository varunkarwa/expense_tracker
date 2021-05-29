const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true,
    },
    pflag:{
        type: String,
        default: "P"
    },
    type:{
        type: String
    },
    dueDate:{
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('expenses', ExpenseSchema);