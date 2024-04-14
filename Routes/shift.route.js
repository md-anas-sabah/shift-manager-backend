const shiftService = require("../Controllers/shift.controller");
const express = require("express");

const router = express.Router();

router.route("/fetchAllShifts").get(shiftService.fetchAllShifts);
router.route("/CreateShiftRequest").post(shiftService.CreateShiftRequest);
router.route("/CreateNewShift").post(shiftService.CreateNewShift);


module.exports = router;
