const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const {
	getAllEmployees,
	createNewEmployees,
	updateEmployees,
	deleteEmployees,
	getEmployee,
} = employeesController;

router
	.route("/") //
	.get(getAllEmployees)
	.post(createNewEmployees)
	.put(updateEmployees)
	.delete(deleteEmployees);

router
	.route("/:id") //
	.get(getEmployee);

module.exports = router;
