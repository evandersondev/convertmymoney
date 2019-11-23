const express = require("express");
const app = express();
const path = require("path");

//engine cofing
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//public config
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/", require("./routes"));

//server
const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.log("error on server");
  } else {
    console.log(`server running on http://localhost:${PORT}`);
  }
});
