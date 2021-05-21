import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const ProjectSchema = new Schema({
  name: { type: String },
  bio: { type: String },
  industry: { type: [String] },
  tools: { type: [String] },
  logo: { type: String },
  neededTeam: { type: [String] },
  team: { type: [Schema.Types.ObjectId], ref: 'User' },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// create PostModel class from schema
const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;
