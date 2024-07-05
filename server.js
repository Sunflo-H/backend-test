const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const productsRouter = require("./routes/products");
const categoryRouter = require("./routes/category");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 80;

// 미들웨어 선언
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("몽고디비 연결 성공");
  })
  .catch((err) => {
    console.log("몽고디비 연결 실패");
    console.log("그 에러 원인이다 : ", err);
  });

app.get("/", (req, res) => {
  res.send("hi");
});

// Routes
app.use("/products", productsRouter);

app.use("/api/category", categoryRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
