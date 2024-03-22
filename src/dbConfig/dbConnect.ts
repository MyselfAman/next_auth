import mongoose from 'mongoose';

export async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err: Error) => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', (err: Error) => {
    console.log(err.message);
})

