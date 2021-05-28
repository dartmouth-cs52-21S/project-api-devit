import jwt from 'jwt-simple';
import UserModel from '../models/user';

/**
 * @description retrieves token for user
 * @param {Object} user
 */
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

/**
 * @description sign in user, authentication is done in middleware
 * @param {Object} user
 * @returns {Object} user token
 */
export const signin = async (userCredentials) => {
  const user = await UserModel.findOne({ email: userCredentials.email });
  return { token: tokenForUser(userCredentials), user };
};

/**
 * @description sign up user and saves fields
 * @param {Object} newUser new user object to be saved by database
 * @returns {Object} user token
 */
export const signup = async (newUser) => {
  if (!newUser.email || !newUser.password) throw new Error('You must provide email and password');

  const existingUser = await UserModel.findOne({ email: newUser.email });

  if (existingUser) throw new Error('Email is in use');

  const user = await UserModel.create(newUser);
  console.log('controller', user);

  return { token: tokenForUser(user), user };
};

/**
 * @description retrieves all user object
 * @returns {Promise<UserModel>} promise that resolves to user objects or error
 */
export const getAllUsers = async () => {
  try {
    const user = await UserModel.find();
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Cannot find all Users');
  }
};

/**
 * @description retrieves user object
 * @param {String} id user id
 * @returns {Promise<UserModel>} promise that resolves to user object or error
 */
export const getUserById = async (id) => {
  try {
    const user = await UserModel.findOne({ _id: id });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Cannot find User by Id');
  }
};

/**
 * @description deletes user with given id
 * @param {String} id user id
 * @returns {Promise<UserModel>} promise that resolves to success object or error
 */
export const deleteUser = async (id) => {
  try {
    const user = await UserModel.deleteOne({ _id: id });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Cannot delete User by Id');
  }
};

/**
 * @description update user object
 * @param {String} id id of user to update
 * @param {String} fields fields for user to update
 * @returns {Promise<UserModel>} promise that resolves to user object or error
 */
export const updateUser = async (id, fields) => {
  try {
    const user = await UserModel.findByIdAndUpdate({ _id: id }, fields, { new: true });
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Cannot update User by Id');
  }
};
