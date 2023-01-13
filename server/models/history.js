const mongoose = require("mongoose");
const Category = require("./category");

//Bakiye Yükleme Geçmişi
const historySchema = new mongoose.Schema({
    walletId: {
        type: String
    },
    date: {
        type: Date
    },
    categoryTitle: {
        type: String
    },
    ammount: {
        type: Number
    }
});

const History = mongoose.model("History", historySchema, "histories");
module.exports = History;