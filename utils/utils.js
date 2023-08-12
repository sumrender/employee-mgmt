const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "data.json");

const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    throw new Error("Error writing data to the file.");
  }
};

const createEmployeeUtil = (employee) => {
  const employees = readData();
  employees.push(employee);
  writeData(employees);
};

const getAllEmployeesUtil = () => {
  return readData();
};

const getEmployeeByIdUtil = (id) => {
  const allEmployees = readData();
  const employees = allEmployees.filter((emp) => emp.employeeId === id);
  if (employees.length == 0) return null;
  return employees[0];
};

const updateEmployeeUtil = (employeeId, updatedEmployee) => {
  const employees = readData();
  const index = employees.findIndex(
    (employee) => employee.employeeId === employeeId
  );
  if (index !== -1) {
    employees[index] = { ...updatedEmployee, employeeId }; // Preserve the original ID
    writeData(employees);
    return employees[index];
  }
  return null;
};

const deleteEmployeeUtil = (id) => {
  const employees = readData();
  const updatedEmployees = employees.filter(
    (employee) => employee.employeeId !== id
  );
  writeData(updatedEmployees);
};

module.exports = {
  createEmployeeUtil,
  getAllEmployeesUtil,
  getEmployeeByIdUtil,
  updateEmployeeUtil,
  deleteEmployeeUtil,
};
