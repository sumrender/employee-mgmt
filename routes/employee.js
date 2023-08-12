const express = require("express");
const {
  createEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");
const router = express.Router();

// Register Employee
router.post("/employee", createEmployee);
// Get all Employee details
router.get("/employees/all", getAllEmployees);
// Get Employee details
router.get("/employee/:id", getEmployee);
// Update Employee
router.put("/employee/:id", updateEmployee);
// Delete Employee
router.delete("/employee/:id", deleteEmployee);
module.exports = router;
