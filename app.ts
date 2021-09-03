import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './configs/database';
import { env } from './configs/environment';
import api from './routes';
import HttpStatusCode from './constants/httpStatusCode.constant';

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
  const whitelist = env.CORS_WHITELIST.split(', ');
  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: HttpStatusCode.OK,
  };
  app.use(cors(corsOptions));

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
