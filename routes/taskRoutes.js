import { Router } from "express";
import { createTask, deleteTask, getSingleTask, getTasks, updateTask } from "../controllers/taskController.js";
import authCheck from "../middlewares/authCheckMiddleware.js";



const router=Router()

router.post('/create',authCheck, createTask)
router.get('/getTasks/:id',authCheck,getTasks)
router.get('/getSingleTask/:id',authCheck,getSingleTask)
router.get('/delete/:id',authCheck,deleteTask)
router.post('/update/:id',authCheck,updateTask)

export default router;