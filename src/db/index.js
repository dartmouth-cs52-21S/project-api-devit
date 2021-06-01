import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/devit';
const environment = mongoURI === process.env.MONGODB_URI ? 'production' : 'local';

const connetToDb = async () => {
  try {
    mongoose.set('useCreateIndex', true);
    const connection = await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    if (connection) console.log(`🔗 connected to ${environment} database:`, mongoURI);
  } catch (error) {
    console.error('🔴 error: could not connect to db:', error);
  }
};

export default connetToDb;
