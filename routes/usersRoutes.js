import express from 'express'
import { loginUser, registerUser } from '../controllers/usersController.js';


const router = express.Router()

router.post("/register",registerUser);
router.post("/login",loginUser);

export {router as usersRoutes}