import express, { Express } from 'express';
import cartRouter from './Router/cart.router';
import productRouter from './Router/product.router';
import { checkUser, checkUserId, checkUserIdAccess } from './middleware/authentication.middleware';
import mongoose, { ConnectOptions } from 'mongoose';

export const app: Express = express();
app.use(express.json());
const port = 8000;

const CONNECT_OPTIONS = {
  dbName: 'shop',
  user: 'root',
  pass: 'nodegmp',
} as ConnectOptions

const CONNECT_URI: string = 'mongodb://0.0.0.0:27017';

mongoose
  .connect(CONNECT_URI, CONNECT_OPTIONS)
  .then(() => {
    app.use('/api/profile/cart', checkUser, checkUserIdAccess, checkUserId, cartRouter);
    app.use('/api/products', checkUser, checkUserIdAccess, checkUserId, productRouter);
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
    console.log('Succesfully connected to MongoDB');
  })
  .catch((error: Error) => {
    closeDatabaseConnection();
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });

const closeDatabaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error while closing the database connection: ", error);
  }
};



