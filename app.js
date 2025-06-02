import express from 'express'

import 'dotenv/config' //.env ko file hamle access garna payem aba 
import authRoutes from './routes/auth.routes.js';

const  PORT= process.env.PORT || 3000
const app = express();

//middleware
app.use(express.json())


console.log("hello nodes js")

app.get('/',(req,res)=>{
res.send('It is working')
})

app.use('/api/auth',authRoutes)


app.listen(PORT,()=>{
    console.log(`Our backend is working on http://localhost:${PORT}`);
})
