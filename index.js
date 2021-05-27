import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

// import routes from './src/routes';
import startup from './startup';

config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

startup(app);
// app.use('/api', routes);
app.use('/', (req, res) => res.status(200).json({ message: 'Welcome to Trans' }));

const port = process.env.PORT || 4040;

app.listen(port, () => console.log(`Server running on port ${port} started`));
