const express=require('express');
const app=express();
const tasks=require('./ruotes/tasks')
const connectDB=require('./ruotes/db/connect')
require('dotenv').config()
const notFound=require('./middlewares/not-found')
const errorHandlermiddleware=require('./middlewares/error-handler')
//middleware
app.use(express.static('./public'))
app.use(express.json())



//routes


app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandlermiddleware)
const port=3000;

const start=async()=>{
    try {
       await connectDB(process.env.MONGO_URI)
       app.listen(port, console.log(`Servidor escuchando en el puerto${port}`));
    } catch (error) {
        console.log(error)
    }
}

start()
