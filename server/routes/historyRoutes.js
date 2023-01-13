const express = require("express");
const mongoose = require("mongoose");
const History = require("../models/history");
const { respFail, respSuccess } = require("../response");

const historyRouter = express.Router();

//History Listesi
historyRouter.get("/api/history", (req, res) => {
    History.find()
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Cüzdan History Listesi
historyRouter.post("/api/history/:walletId", (req, res) => {
    const { walletId } = req.body;
    History.find({ walletId: walletId })
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Kategoriye Göre History Getir
historyRouter.post("/api/history/:category", (req, res) => {
    const { categoryTitle } = req.body;
    History.find({ categoryTitle: categoryTitle })
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Kategoriye ve Cüzdana Göre History Getir
/*historyRouter.post("/api/history/:category&walletId", (req, res) => {
    const { categoryTitle, walletId } = req.body;
    History.find({ categoryTitle: categoryTitle, walletId: walletId })
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});*/

//History Ekle
historyRouter.post("/api/history", (req, res) => {
    const { userId, walletId, category, ammount } = req.body;
    const date = new Date();
    const history = new History({ userId: userId, walletId: walletId, date: date, category: category, ammount: ammount });

    history.save()
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

module.exports = historyRouter;