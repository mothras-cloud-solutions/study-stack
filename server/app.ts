import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes';
import collectionsRoutes from './routes/collectionsRoutes';
import flashcardsRoutes from './routes/flashcardsRoutes';
import canvasesRoutes from './routes/canvasesRoutes';

const app = express();
app.use(express.static('client/dist'));
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/flashcards', flashcardsRoutes);
app.use('/api/canvases', canvasesRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
