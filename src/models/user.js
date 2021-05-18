import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  timestamps: true,
});

// eslint-disable-next-line consistent-return
UserSchema.pre('save', async function saveModel(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it
  const user = this;

  try {
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (error) {
    next(error);
  }
  // when done run the **next** callback with no arguments
  // call next with an error if you encounter one
  // return next();
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

// create UserModel class from schema
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
