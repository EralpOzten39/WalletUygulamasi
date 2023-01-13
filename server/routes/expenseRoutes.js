const express = require("express");
const mongoose = require("mongoose");
const Expense = require("../models/expense");
const Wallet = require("../models/wallet");
const { respFail, respSuccess } = require("../response");

const expenseRouter = express.Router();

//Expense Listesi
expenseRouter.get("/api/expense", (req, res) => {
    Expense.find()
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Cüzdana Göre Expense Getir
expenseRouter.post("/api/expense/:walletId", (req, res) => {
    const { walletId } = req.body;
    Expense.find({ walletId: walletId })
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Kategoriye Göre Expense Getir
/*expenseRouter.post("/api/expense/:category", (req, res) => {
    const { categoryTitle } = req.body;
    Expense.find({ categoryTitle: categoryTitle })
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});*/

//Kategoriye ve Cüzdana Göre Expense Getir
/*expenseRouter.post("/api/expense/:category&walletId", (req, res) => {
    const { categoryTitle, walletId } = req.body;
    Expense.find({ categoryTitle: categoryTitle, walletId: walletId })
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});*/

//Expense Ekle
expenseRouter.post("/api/expense", (req, res) => {
    const { userId, categoryTitle, title, cost } = req.body;
    const date = new Date();
    const body = [];

    Wallet.findOne({ userId: userId })
        .then((resp) => {
            if (!resp) {
                res.send(respFail("Cüzdan Bulunamadı."));
            } else {
                const expense = new Expense({ walletId: resp._id, date: date, categoryTitle: categoryTitle, title: title, cost: cost });
                let newBalance = resp.balance;
                newBalance -= cost;

                expense.save()
                    .then((resp) => {
                        body[body.length] = resp;
                        Wallet.updateOne({ _id: resp.walletId }, { $set: { balance: newBalance } })
                            .then((resp) => {
                                body[body.length] = resp;
                                res.send(respSuccess(body));
                            })
                            .catch((err) => {
                                Expense.remove(expense);
                                res.send(respFail(err));
                                throw err;
                            });
                    })
                    .catch((err) => {
                        res.send(respFail(err));
                        throw err;
                    });
            }
        })
});

module.exports = expenseRouter;