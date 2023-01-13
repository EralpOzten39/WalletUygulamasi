const mongoose = require("mongoose");

//Type : expense or balance
const categorySchema = new mongoose.Schema({
    title: {
        type: String
    },
    type: {
        type: String
    }
});

const Category = mongoose.model("Category", categorySchema, "categories");
module.exports = Category;