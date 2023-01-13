const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const walletRouter = require("./routes/walletRoutes");
const categoryRouter = require("./routes/categoryRouter");
const historyRouter = require("./routes/historyRoutes");
const expenseRouter = require("./routes/expenseRoutes");

const PORT = 5000;
const mongoUri = "mongodb+srv://Eralp:27112712@cluster0.mqlbrxo.mongodb.net/WalletDB";

mongoose.set("strictQuery", true);
mongoose.connect(mongoUri).then(() => {
    const server = express();

    server.use(cors());
    server.use(bodyParser.json());
    server.use(userRouter);
    server.use(walletRouter);
    server.use(categoryRouter);
    server.use(historyRouter);
    server.use(expenseRouter);

    server.listen(PORT, () => {
        console.log("Server is running on PORT : ", PORT);
    });
});

mongoose.connection.on("connected", () => {
    console.log("Connection Secured");
});