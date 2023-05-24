const express = require("express");
const paypal = require("./paypal-api.js");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.post("/create-paypal-order", async (req, res) => {
  try {
    const order = await paypal.createOrder(req.body.amount);
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);

    console.log(captureData);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " +
        process.env.PORT
    );
  } else console.log("Error occurred, server can't start", error);
});
