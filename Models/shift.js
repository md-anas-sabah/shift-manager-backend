const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  id: { type: String, required: true },
  day: { type: String, required: true },
  hour: { type: String, required: true },
  status: { type: String, required: true },
  endShiftHour: { type: Number, required: false },
  endShiftMinutes: { type: Number, required: false },
  startShiftHour: { type: Number, required: false },
  startShiftMinutes: { type: Number, required: false },
});

module.exports = mongoose.model("Shift", shiftSchema);
