const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/category");
const { respFail, respSuccess } = require("../response");

const categoryRouter = express.Router();

//Kategori listesi
categoryRouter.get("/api/category", (req, res) => {
    Category.find()
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

//Tipe Göre Kategori Getir (type : expense || history)
/*categoryRouter.post("/api/category/:type", (req, res) => {
    const { type } = req.body;

    Category.find({ type: type })
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});*/

//Kategori Ekle
categoryRouter.post("/api/category", (req, res) => {
    const { title, type } = req.body;
    const category = new Category({ title: title, type: type });

    category.save()
        .then((resp) => {
            res.send(respSuccess(resp));
        })
        .catch((err) => {
            res.send(respFail(err));
            throw err;
        });
});

module.exports = categoryRouter;