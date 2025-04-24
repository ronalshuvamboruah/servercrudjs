const User = require("../models/details.model");
const jwt=require("jsonwebtoken")
// const jwt = require('jsonwebtoken');




// create a new user

const createUser=async(req,res)=>{
const{name,password,age,email}=req.body;
      try {
    const userExists = await User.findOne({ email,password,name,age });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ name, email,password,age });
  
    await newUser.save();
    const token = jwt.sign(
        {  newUser },  // Payload (you can add more data to the payload)
        "123",             // Secret key (make sure to store it securely)
        { expiresIn: '1h' }    // Set an expiration time for the token
      );
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser,token });
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
}
//login user 

const bcrypt = require("bcryptjs"); // If you’re hashing passwords (recommended)

// LOGIN a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email }, "123", { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
};


// Get all users (Read)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: "Error fetching users", error: err });
  }
};

// Get a user by ID (Read)
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error fetching user", error: err });
  }
};

// Update user by ID (Update)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: "Error updating user", error: err });
  }
};

// Delete user by ID (Delete)
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting user", error: err });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
};
