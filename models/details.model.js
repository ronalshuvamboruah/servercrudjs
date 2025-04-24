const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define a Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true},
  password: { type: String, required: true }, 
  age: { type: Number, required: false }
});


// Hash the password before saving the user to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();  // Skip hashing if password is not modified

  try {
    // Generate a salt for bcrypt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();  // Proceed to save
  } catch (err) {
    next(err);  // Pass error to the next middleware
  }
});


// Create a Model based on the Schema
const User = mongoose.model('User', userSchema);

module.exports= User
