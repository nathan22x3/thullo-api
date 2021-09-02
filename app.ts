import express from 'express';
import morgan from 'morgan';
import { connectDB } from './configs/database';
import { env } from './configs/environment';
import { api } from './routes';

// MongoDB connection
connectDB()
  .then(() => console.log('Connected to MongoDB successfully!'))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('dev'));

  // API Routes
  app.use('/api', api);

  // Server listenning
  const port = env.PORT;
  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
};
