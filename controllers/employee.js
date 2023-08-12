const {
  createEmployeeUtil,
  getAllEmployeesUtil,
  getEmployeeByIdUtil,
  updateEmployeeUtil,
  deleteEmployeeUtil,
} = require("../utils/utils");
const { v4: uuid } = require("uuid");

let lock = false;

function setLock() {
  while (lock === true) {
    console.log("waiting to acquire lock");
  }
  lock = true;
  console.log("lock acquired");
}

function releaseLock() {
  lock = false;
  console.log("lock released");
}

function createEmployee(req, res) {
  try {
    setLock(); // lock
    const { city, name } = req.body;
    if (!name || !city) {
      throw new Error("Both 'name' and 'city' fields required!");
    }

    
    const employeeId = uuid();
    const newEmployee = { employeeId, name, city };
    createEmployeeUtil(newEmployee);
    releaseLock(); // lock
    return res.status(201).json({ employeeId });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

function getAllEmployees(req, res) {
  try {
    const allEmployees = getAllEmployeesUtil();
    res.status(200).send(allEmployees);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
}

function getEmployee(req, res) {
  try {
    const { id } = req.params;
    const employee = getEmployeeByIdUtil(id);
    if (!employee) throw new Error(`Employee with ${id} was not found`);

    res.status(200).json(employee);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}

function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const employee = getEmployeeByIdUtil(id);
    if (!employee) throw new Error(`Employee with ${id} was not found`);

    const { city, name } = req.body;
    if (!name || !city) {
      throw new Error("Both 'name' and 'city' fields required!");
    }

    const updatedEmployee = updateEmployeeUtil(id, { name, city });
    return res.status(201).json(updatedEmployee);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}

function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    const employee = getEmployeeByIdUtil(id);
    if (!employee) throw new Error(`Employee with ${id} was not found`);
    deleteEmployeeUtil(id);
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};
