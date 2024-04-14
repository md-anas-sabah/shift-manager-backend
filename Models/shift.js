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

// {
//     "title": "ofek11",
//     "startDate": "2023-09-28T06:00:00.000Z",
//     "endDate": "2023-09-28T10:00:00.000Z",
//     "id": "28.09.2023morningofek11",
//     "day": "thursday",
//     "hour": "morning",
//     "status": "selected"
// },

// day: "friday";
// endDate: "2023-09-08T10:00:00.000Z";
// endShiftHour: 13;
// endShiftMinutes: 0;
// hour: "morning";
// id: "08.09.2023morningGitamOfek";
// startDate: "2023-09-08T06:00:00.000Z";
// startShiftHour: 9;
// startShiftMinutes: 0;
// status: "accept";
// title: "GitamOfek";

module.exports = mongoose.model("Shift", shiftSchema);
