import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllUsers controller: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select("-password");

    if (!user) return res.status(404).json({ message: "Invalid creditials" });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserById controller: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { fullName, email, cars, password } = req.body;
    const { id } = req.params;

    const user = await User.findOne({ _id: id }).select("-password");

    if (!user) return res.status(404).json({ message: "Invalid creditials" });

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { fullName, email, cars, password },
      { returnDocument: "after" },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateUser controller: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select("-password");

    if (!user) return res.status(404).json({ message: "Invalid creditials" });

    await User.findOneByIdAndDelete({ _id: id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUser controller: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
