const ExpenseSchema = require("../models/ExpenseModel")
const IncomeSchema = require("../models/IncomeModel")

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        userId: req.user.id
    })

    try {
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }

        // Calculate Balance
        const incomes = await IncomeSchema.find({ userId: req.user.id })
        const expenses = await ExpenseSchema.find({ userId: req.user.id })

        const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0)
        const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0)
        const balance = totalIncome - totalExpense

        if (amount > balance) {
            return res.status(400).json({ message: 'Insufficient Balance!' })
        }

        await expense.save()
        res.status(200).json({ message: 'Expense Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find({ userId: req.user.id }).sort({ createdAt: -1 })
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Expense Deleted' })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' })
        })
}