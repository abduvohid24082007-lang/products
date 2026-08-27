const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use((req, res, next) => {
  req.requestime = new Date().toISOString();
  console.log(`${req.method}${req.url}-${req.requestime}`);
  next();
});
app.get("/", (req, res) => {
  res.send("salom ");
});
app.listen(PORT, () => {
  console.log(`server ${PORT} portda ishlayapt`);
});
