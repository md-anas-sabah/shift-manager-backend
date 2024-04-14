const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { ModuleNode } = require("vite");

const ping = async (req, res) => {
  try {
    return res.status(200).json("pong");
  } catch {
    res.status(500).message("Couldn't pong.");
  }
};

const fetchUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch {
    res.status(500).message("Couldn't fetch users.");
  }
};

const createUser = async (req, res) => {
  const {
    username,
    password,
    email,
    phoneNumber,
    firstName,
    lastName,
    isAdmin,
  } = req.body;
  try {
    const UserExists = await User.findOne({ username: username });
    if (UserExists) {
      return res.status(400).json("User already exists!");
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
      firstName,
      lastName,
      isAdmin,
      messages: [],
      shifts: [],
    });
    return res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err + "User Could Not Be Created!");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const newUser = await User.findByIdAndDelete(id);
    return res.status(200).json("User has been deleted!");
  } catch {
    res.status(500).json("User Could Not Be Deleted!");
  }
};

const updateUser = async (req, res) => {
  const {
    username,
    password,
    email,
    phoneNumber,
    firstName,
    lastName,
    isAdmin,
    _id,
  } = req.body;
  try {
    if (password) {
      const newUser = await User.findByIdAndUpdate(
        _id,
        {
          username,
          password: await bcrypt.hash(password, saltRounds),
          email,
          phoneNumber,
          firstName,
          lastName,
          isAdmin,
        },
        { new: true }
      );
      return res.status(200).json(newUser);
    } else {
      const newUser = await User.findByIdAndUpdate(
        _id,
        {
          username,
          email,
          phoneNumber,
          firstName,
          lastName,
          isAdmin,
        },
        { new: true }
      );
      return res.status(200).json(newUser);
    }
  } catch {
    res.status(500).json("User Could Not Be Updated!");
  }
};

const loginFunc = async (req, res) => {
  try {
    const userExists = await User.findOne({ username: req.body.username });
    if (!userExists) {
      return res.status(400).json("wrong credentials");
    }
    const isMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (isMatch == true) {
      const token = jwt.sign(
        { username: userExists.username },
        process.env.SECRET,
        { expiresIn: "24h" }
      );
      return res
        .status(200)
        .json({ token: token, isAdmin: userExists.isAdmin });
    } else {
      return res.status(400).json("wrong username/password");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getUserShifts = async (req, res) => {
  try {
    const { token } = req.body;
    console.log("Got into the function");
    const username = jwt.verify(token, process.env.SECRET);
    console.log(username);
    const CurrentUser = await User.findOne({
      username: username.username,
    }).populate("shifts");
    return res.status(200).json(CurrentUser.shifts);
  } catch {
    return res.status(500).json("Couldn't return user's shifts");
  }
};

const getUserName = async (req, res) => {
  try {
    const { token } = req.body;
    const username = jwt.verify(token, process.env.SECRET);
    const CurrentUser = await User.findOne({
      username: username.username,
    });
    return res.status(200).json(CurrentUser.firstName);
  } catch {
    return res.status(500).json("Couldn't return user's name");
  }
};
// const getUser = async (req, res) => {
//   try {
//     const realId = jwt.verify(req.headers.token, process.env.SECRET);
//     const UserData = await User.findOne({ _id: realId.id });
//     // console.log(UserData, "This is the user DATA");
//     return res.status(200).json(UserData);
//   } catch (err) {
//     return res.status(500).json(err.message);
//   }
// };

module.exports = {
  ping,
  fetchUser,
  createUser,
  deleteUser,
  updateUser,
  loginFunc,
  getUserShifts,
  getUserName,
  // getUser,
};
