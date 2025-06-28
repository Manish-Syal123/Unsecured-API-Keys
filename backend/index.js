const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors("*")); // Allow all origins for development purposes
app.use(express.json());

const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
