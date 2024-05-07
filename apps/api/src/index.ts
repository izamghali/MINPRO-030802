import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import apiRouter from './router';

const app: Application = express()

const PORT = 8000;

app.use(express.json());
app.use(cors())

app.use('/api', apiRouter)

app.listen(PORT, () => {
    console.log(`[API] local => http://localhost:${PORT}/api`)
})