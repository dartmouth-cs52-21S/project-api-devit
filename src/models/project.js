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


// db.projects.insert(
//   {
//     "name": "blabla",
//     "bio": "this my bio",
//     "industry": ["finance", "health"],
//     "tools": ["react", "HTML"],
//     "logo": "https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/60063/467371_21871.png",
//     "neededTeam": ["developer", "desginer"]
//   }
// )
