import { MongoClient } from 'mongodb';
import { env } from './environment';

const uri = env.MONGODB_URI;

const listDatabases = async (client: MongoClient) => {
  const databases = await client.db().admin().listDatabases();
  console.log(databases);
};

export const connectDB = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);

    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
};
