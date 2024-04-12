import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes';
import collectionsRoutes from './routes/collectionsRoutes';
import flashcardsRoutes from './routes/flashcardsRoutes';
import canvasesRoutes from './routes/canvasesRoutes';

const app = express();
app.use(express.static('client/dist'));

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/collections', collectionsRoutes);
app.use('/api/flashcards', flashcardsRoutes);
app.use('/api/canvases', canvasesRoutes);

app.get('*', function(_req, res){
  res.redirect('/');
});

const port: number = Number(process.env.PORT) || 3000;
const host: string = process.env.HOST || 'localhost'

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
