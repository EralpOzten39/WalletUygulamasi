const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    balance: {
        type: Number
    }
});

const Wallet = mongoose.model("Wallet", walletSchema, "wallets");
module.exports = Wallet;