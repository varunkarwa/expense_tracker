const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Expenses = require('../models/Expenses');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try{
        const expenses = await Expenses.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [ auth, [
    check( 'name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { name, amount, pflag, type, dueDate} = req.body;
    var a = parseInt(amount);
     try {
         const newExpense = new Expenses({
            name,
            amount:a,
            pflag,
            type,
            dueDate,
            user: req.user.id
         });
         const expense = await newExpense.save();
         res.status(200).json(expense);
     } catch (err) {
         console.error(err.message);
         res.status(500).send('Server Error');
     }
});

// @route   Put api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, amount, pflag, type, dueDate} = req.body;

    //Build contact object
    const expenseFields = {};
    if (name) expenseFields.name = name;
    if (amount) expenseFields.amount = amount;
    if (pflag) expenseFields.pflag = pflag;
    if (type) expenseFields.type = type;
    if (dueDate) expenseFields.dueDate = dueDate;

    try {
        let expense = await Expenses.findById(req.params.id);

        if (!expense) return res.status(404).json({ msg: "Expense not found"});

        if( expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized"});
        }

        expense = await Expenses.findByIdAndUpdate(
            req.params.id,
            {$set: expenseFields},
            {new: true},
        );
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/status/:id', auth, async (req, res) => {
    const {pflag} = req.body;

    //Build contact object
    const expenseFields = {};
    if (pflag) expenseFields.pflag = pflag;

    try {
        let expense = await Expenses.findById(req.params.id);

        if (!expense) return res.status(404).json({ msg: "Expense not found"});

        if( expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized"});
        }

        expense = await Expenses.findByIdAndUpdate(
            req.params.id,
            {$set: expenseFields},
            {new: true},
        );
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try{    
        let expense = await Expenses.findById(req.params.id);

        if(!expense) return res.status(404).json({ msg: "Expense not found"});

        if( expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized"});
        }

        await Expenses.findByIdAndRemove( req.params.id);

        res.json({ msg: 'Expense removed'});
    } catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;