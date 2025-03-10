import dotenv from 'dotenv';
dotenv.config();
import app from './src/App.js';
const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});