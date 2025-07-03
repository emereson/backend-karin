import 'dotenv/config';
import { app } from './src/app.js';
import { db } from './src/database/config.js';
import { initModel } from './src/database/initModels.js';

const PORT = process.env.PORT || 3031;

db.authenticate()
  .then(() => {
    console.log(`Database Authenticated! 👍`);
    return initModel();
  })
  .then(() => {
    return db.sync();
  })
  .then(() => {
    console.log(`Database Synced 💪`);
    app.listen(PORT, () => {
      console.log(`App Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
