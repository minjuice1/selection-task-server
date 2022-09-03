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
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
	.route("/") //
	.get(getAllEmployees)
	.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployees)
	.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployees)
	.delete(verifyRoles(ROLES_LIST.Admin), deleteEmployees);

router
	.route("/:id") //
	.get(getEmployee);

module.exports = router;
