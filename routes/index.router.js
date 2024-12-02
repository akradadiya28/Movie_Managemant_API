import express from "express"
const router = express.Router();

import userRouter from "./user.router.js"
import movieRouter from "./movie.router.js"

router.use('/user', userRouter)
router.use('/movie', movieRouter)

export default router;
