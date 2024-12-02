import express from "express";
const userRouter = express.Router();

import { addUser, loginUser, logotUser } from "../controllers/user.controller.js"
import { verifyToken } from "../config/auth.js";

userRouter.post("/add-user", addUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/logout-user", verifyToken, logotUser);

export default userRouter;