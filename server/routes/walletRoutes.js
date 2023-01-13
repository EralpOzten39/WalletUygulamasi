const express = require("express");
const mongoose = require("mongoose");
const Wallet = require("../models/wallet");
const History = require("../models/history");
const { respFail, respSuccess } = require("../response");

const walletRouter = express.Router();

//Cüzdan Listesi
walletRouter.get("/api/wallet", (req, res) => {
    Wallet.find()
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Kullanıcı Cüzdanı
walletRouter.post("/api/wallet/:userId", (req, res) => {
    const { userId } = req.body;

    Wallet.findOne({ userId: userId })
        .then((resp) => {
            if (!resp) {
                res.send(respFail("Kullanıcı cüzdanı bulunamadı."));
            } else {
                res.send(respSuccess(resp));
            }
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Cüzdan Bakiye Yükle !!! WARNING
walletRouter.patch("/api/wallet/:userId", (req, res) => {
    const { userId, categoryTitle, ammount } = req.body;
    const date = new Date();
    const body = [];

    Wallet.findOne({ userId: userId })
        .then((resp) => {
            if (!resp) {
                res.send(respFail("Cüzdan Bulunamadı."));
            } else {
                const history = new History({ walletId: resp._id, date: date, categoryTitle: categoryTitle, ammount: ammount });
                let newBalance = resp.balance;
                newBalance += ammount;

                history.save()
                    .then((resp) => {
                        body[body.length] = resp;
                        Wallet.updateOne({ _id: resp.walletId }, { $set: { balance: newBalance } })
                            .then((resp) => {
                                body[body.length] = resp;
                                res.send(respSuccess(body));
                            })
                            .catch((err) => {
                                History.remove(history);
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

module.exports = walletRouter;