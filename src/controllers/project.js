import ProjectModel from '../models/project';
import UserModel from '../models/user';

export const createProject = async (newProject, author) => {
  try {
    newProject.team = [author];
    let project = await ProjectModel.create(newProject);
    if (project) project = await project.populate('team').populate('author').execPopulate();

    let user = await UserModel.findOneAndUpdate({ _id: author.id }, { $push: { projects: project } }, { new: true });
    if (user) {
      user = await user.populate({
        path: 'projects',
        model: ProjectModel,
        populate: [
          { path: 'team', model: UserModel },
          { path: 'author', model: UserModel },
        ],
      }).execPopulate();
    }

    return { project, user };
  } catch (error) {
    throw new Error(`create project error: ${error}`);
  }
};

export const getProjects = async () => {
  return ProjectModel.find();
};

export const getProject = async (id) => {
  try {
    const proj = await ProjectModel.findById({ _id: id });
    if (proj) {
      const populated = await proj.populate('team').populate('author').execPopulate();
      return populated;
    }
    return proj;
  } catch (error) {
    throw new Error(`fetch single project error: ${error}`);
  }
};

export const deleteProject = async (id) => {
  try {
    const proj = await ProjectModel.findByIdAndDelete({ _id: id });
    return proj;
  } catch (error) {
    throw new Error(`delete project error: ${error}`);
  }
};
export const updateProject = async (id, fields) => {
  console.log(fields);
  try {
    const proj = await ProjectModel.findByIdAndUpdate({ _id: id }, fields, { new: true });
    if (proj) {
      const populated = await proj.populate('team').populate('author').execPopulate();
      return populated;
    }
    return proj;
  } catch (error) {
    throw new Error(`update project error: ${error}`);
  }
};
