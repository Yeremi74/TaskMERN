import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://yyeremi15:dogelife17r@cluster0.vqe4jio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log('>>>>db is connected');
  } catch (error) {
    console.error(error);
  }
};
