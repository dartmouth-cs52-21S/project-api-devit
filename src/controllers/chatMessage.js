import ChatMessageModel from '../models/chatMessage';

export const getChatMessages = async (projectId) => {
  try {
    const chatMessages = await ChatMessageModel.find({ projectId }).populate('author').exec();
    return chatMessages;
  } catch (error) {
    console.error(error);
    return { error: `Uh oh! There was an error: ${error}` };
  }
};

export const createChatMessage = async (newChatMessage) => {
  try {
    const chatMessage = await ChatMessageModel.create(newChatMessage);

    if (chatMessage) {
      const chatMessageWithMetadata = await chatMessage.populate('author').execPopulate();
      return chatMessageWithMetadata;
    }

    return chatMessage;
  } catch (error) {
    throw new Error(`There was an error when trying to create that message: ${error}`);
  }
};

export const updateChatMessage = async (id, fields) => {
  try {
    const chatMessage = await ChatMessageModel.findByIdAndUpdate(id, fields, { new: true });
    if (chatMessage) {
      const chatMessageWithMetadata = await chatMessage.populate('projectId').populate('author').execPopulate();
      return chatMessageWithMetadata;
    }
    return chatMessage;
  } catch (error) {
    throw new Error(`There was an error when trying to update that message: ${error}`);
  }
};

export const deleteChatMessage = async (id, originalAuthorEmail, emailUserAttemptingDelete) => {
  if (originalAuthorEmail !== emailUserAttemptingDelete) return new Error('Cannot delete messages you didn\'t create.');

  try {
    const chatMessage = await ChatMessageModel.findByIdAndUpdate(id, { isDeleted: true });
    return chatMessage;
  } catch (error) {
    throw new Error(`There was an error when trying to delete that message: ${error}`);
  }
};
