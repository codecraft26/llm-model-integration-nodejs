// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
   
    email: { type: String, required: [true, 'Please enter your email'], unique: true },
    password: { type: String, required: [true, 'Please enter your password'], minlength: [6, 'Minimum password length is 6 characters'] },
    Role:{
      type:String
    }
  },

);


// Hashing the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Comparing password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: 100000 });
};


export default mongoose.model('User', userSchema);
