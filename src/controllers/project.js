import ProjectModel from '../models/project';

export const createProject = async (newProj, author) => {
  try {
    newProj.team = [author];
    const proj = await ProjectModel.create(newProj);
    if (proj) {
      const populated = await proj.populate('team').execPopulate();
      return populated;
    }
    return proj;
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
      const populated = await proj.populate('team').execPopulate();
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
  try {
    const proj = await ProjectModel.findByIdAndUpdate({ _id: id }, fields, { new: true });
    if (proj) {
      const populated = await proj.populate('team').execPopulate();
      return populated;
    }
    return proj;
  } catch (error) {
    throw new Error(`update project error: ${error}`);
  }
};
