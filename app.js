import express from 'express'
import cors from 'cors';

import 'dotenv/config' //.env ko file hamle access garna payem aba 
import authRoutes from './routes/auth.routes.js';
import connectDB from './lib/connectDb.js';
import cookieParser from 'cookie-parser';

const  PORT= process.env.PORT || 3000
const app = express();

//middleware
app.use(express.json())

app.use(cors({
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // Make sure Authorization is allowed
}));
// Use cookie-parser middleware
app.use(cookieParser());


console.log("hello nodes js")

app.get('/',(req,res)=>{
res.send('It is working')
})

app.use('/api/auth',authRoutes)


app.listen(PORT,async()=>{
    try {
     await connectDB()
    console.log(`Our backend is working on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Failed to connect to the database. Exiting...');
    process.exit(1); // Exit if the DB connection fails
    }
})
