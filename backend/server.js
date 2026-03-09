require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const app = express();
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connected to MongoDB"));


app.get("/", (req, res) => {
    res.send("API running");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});