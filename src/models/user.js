import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  location: { type: String },
  picture: { type: String },
  bio: { type: String },
  roles: { type: [String] },
  devSkills: { type: [String] },
  desSkills: { type: [String] },
  badges: { type: [String], ref: 'Badge' },
  projects: { type: [Schema.Types.ObjectId], ref: 'Project' },
  projectsCreated: { type: Number },
  projectsJoined: { type: Number },
  commits: { type: Number },
  pullRequests: { type: Number },
  eventsCreated: { type: Number },
  messagesSent: { type: Number },
}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
  timestamps: true,
});

// eslint-disable-next-line consistent-return
UserSchema.pre('save', async function saveModel(next) {
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
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  const comparison = await bcrypt.compare(candidatePassword, this.password);
  return comparison;
};

// create UserModel class from schema
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
