const mongoose = require("mongoose");
const Category = require("./category");

const expenseSchema = new mongoose.Schema({
    walletId: {
        type: String
    },
    date: {
        type: Date
    },
    categoryTitle: {
        type: String
    },
    title: {
        type: String
    },
    cost: {
        type: String
    }
});

const Expense = mongoose.model("Expense", expenseSchema, "expenses");
module.exports = Expense;