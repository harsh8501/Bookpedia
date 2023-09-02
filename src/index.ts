import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import route from "../routes/routes";

const app = express();
const PORT = 8000;

app.listen(PORT,()=>{
    console.log('Server is runnning on PORT:',PORT);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/',route);