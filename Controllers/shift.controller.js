const User = require("../Models/user");
const Shift = require("../Models/shift");
const jwt = require("jsonwebtoken");

const fetchAllShifts = async (req, res) => {
  try {
    const allShifts = await Shift.find({});
    return res.status(200).json(allShifts);
  } catch {
    res.status(500).message("Couldn't fetch Shifts.");
  }
};

const CreateShiftRequest = async (req, res) => {
  console.log("hii");
  const {
    day,
    endDate,
    endShiftHour,
    endShiftMinutes,
    hour,
    id,
    startDate,
    startShiftHour,
    startShiftMinutes,
    title,
  } = req.body;

  try {
    const newShift = await Shift.create({
      day,
      endDate,
      endShiftHour,
      endShiftMinutes,
      hour,
      id,
      startDate,
      startShiftHour,
      startShiftMinutes,
      status: "accept",
      title,
    });
    console.log(newShift);
    return res.status(200).json(newShift);
  } catch (err) {
    res.status(500).json(err + "Shift Could Not Be Created!");
  }
};

const CreateNewShift = async (req, res) => {
  const { token, shifts: newShifts } = req.body;
  try {
    const username = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ username: username.username }).populate(
      "shifts"
    );
    const currentUserShifts = user.shifts;
    const toDelete = [];
    const toCreate = [];
    const sameShifts = [];

    // Create a map of newShifts objects using their IDs as keys for efficient lookups
    const mapNewShifts = new Map(newShifts.map((shift) => [shift.id, shift]));

    // Find shifts to delete (present in currentUserShifts but not in newShifts)
    for (const shift of currentUserShifts) {
      if (!mapNewShifts.has(shift.id)) {
        toDelete.push(shift);
      }
    }
    //Find shifts that are the same, present in newShifts and in currentUserShifts too
    for (const shift of currentUserShifts) {
      if (mapNewShifts.has(shift.id)) {
        sameShifts.push(shift._id);
      }
    }

    // Find shifts to create (present in newShifts but not in currentUserShifts) and add them to sameShifts.
    for (const shift of newShifts) {
      if (
        !currentUserShifts.some(
          (existingShift) => existingShift.id === shift.id
        )
      ) {
        toCreate.push(shift);
        sameShifts.push(shift._id);
      }
    }
    //Deleting proccess of the shifts needed to be deleted
    for (const shift of toDelete) {
      const deletedShift = await Shift.findByIdAndDelete(shift._id);
    }

    let shiftsId = sameShifts;
    //I have the username and the shifts array - Need to run on the shifts array,
    //Create each shift and push it to the username shift's array.
    for (const data of toCreate) {
      const { title, startDate, endDate, id, day, hour, status } = data;
      const newShift = await Shift.create({
        id,
        title,
        startDate,
        endDate,
        day,
        hour,
        status,
      });
      shiftsId.push(newShift._id);
      console.log("Shift created successfully!");
    }
    console.log(shiftsId, "These are the new Shifts Id's");
    const updateUser = await User.findOneAndUpdate(
      { username: username.username },
      { shifts: shiftsId }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  fetchAllShifts,
  CreateShiftRequest,
  CreateNewShift,
};
