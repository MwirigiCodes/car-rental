import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import userRoutes from './routes/user.route.js';

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
