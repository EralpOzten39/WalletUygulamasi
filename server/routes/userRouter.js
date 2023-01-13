const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const Wallet = require("../models/wallet");
const { respFail, respSuccess } = require("../response");

const userRouter = express.Router();

//Kullanıcı Listesi
userRouter.get("/api/user", (req, res) => {
    User.find()
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Kullanıcı Giriş
userRouter.post("/api/user/signin", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email, password: password })
        .then((resp) => {
            if (!resp) {
                res.send(respFail("Kullanıcı bulunamadı."));
            } else {
                res.send(respSuccess(resp));
            }
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Kullanıcı Kayıt !!! WARNING
userRouter.post("/api/user/signup", (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email: email, password: password });
    const wallet = new Wallet({ userId: user._id, balance: 0 });
    const body = [];

    User.findOne({ email: email })
        .then((resp) => {
            if (!resp) {
                user.save()
                    .then((resp) => {
                        body[body.length] = resp;
                        wallet.save()
                            .then((resp) => {
                                body[body.length] = resp;
                                res.send(respSuccess(body));
                            })
                            .catch((err) => {
                                user.delete();
                                res.send(respFail(err));
                                throw err;
                            });
                    })
                    .catch((err) => {
                        res.send(respFail(err));
                        throw err;
                    });
            } else {
                res.send(respFail("Kullanıcı zaten kayıtlı."));
            }
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

module.exports = userRouter;