import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { connectDB } from './configs/database';
import { env } from './configs/environment';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// MongoDB connection
connectDB();

// Routes
app.get('/', (_: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

// Server listenning
const port = env.PORT;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
