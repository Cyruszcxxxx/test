import express, {response} from 'express';
import initialize from './app/app.js';

const app=express();
const port = 8000;


initialize(app);
app.listen(port,()=>console.log(`server is called in ${port}`));