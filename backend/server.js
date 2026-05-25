const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const client = require("prom-client");

require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend API Running");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);

  res.end(await client.register.metrics());
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});