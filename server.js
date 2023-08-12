const express = require("express");
const employeeRoutes = require("./routes/employee");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(employeeRoutes);

app.get("/greeting", (req, res) => {
  return res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log("Server running at PORT", PORT);
});
