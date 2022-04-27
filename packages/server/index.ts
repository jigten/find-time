import express from 'express';
import userRoute from './routes/UserRoute';
import meetingRoute from './routes/MeetingRoute';
import cors from 'cors';

const app = express();
const port = 3001;

// Middlewares
app.use(express.json()); //req/body
app.use(cors());

app.use('/user', userRoute);
app.use('/meeting', meetingRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
