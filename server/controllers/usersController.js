import user from "../models/usersModel.js";

const getAllUsers = async (req, res) => {
  try {
    res.send("Hello World!");
    // const users = await user.find();
    // res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await user.create(userData);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await user.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await user.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export default {
  getAllUsers,
  addUser,
  getUserById,
  deleteUser,
};
