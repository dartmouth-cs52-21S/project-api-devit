import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const ProjectSchema = new Schema({
  name: { type: String },
  bio: { type: String },
  industry: { type: [String] },
  tools: { type: [String] },
  Figma: { type: [String] },
  GitHub: { type: [String] },
  Slack: { type: [String] },
  logo: { type: String },
  neededTeam: { type: [String] },
  problemDescription: { type: String },
  audienceDescription: { type: String },
  marketDescription: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  team: { type: [Schema.Types.ObjectId], ref: 'User' },
  events: { type: Object },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// create PostModel class from schema
const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;
