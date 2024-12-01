import express from 'express'
import dotenv  from "dotenv";
dotenv.config({path:'./.env'})
import { ApiResponse } from './utils/apiResponse.js';
import userRouter from './routes/userRoutes.js';
import taskRouter from './routes/taskRoutes.js';
import cors from "cors";
import logger from 'morgan';

const corsOrigin=process.env.CORS_ORIGIN.split(',')
const app=express()

// import path from 'path';

// import { fileURLToPath } from 'url';
// import { tempUserCreate } from './controllers/userControllers.js';

// // Recreate __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


app.use(logger('dev'));
app.use(cors())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(express.static(path.join(__dirname, 'public')));




app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)



app.all('*', (req, res) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
      error: `The route ${req.originalUrl} does not exist`,
    });
  });

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log('error',err.message)
    res.status(statusCode).json(new ApiResponse(statusCode, null, err.message));
});




export default app;
