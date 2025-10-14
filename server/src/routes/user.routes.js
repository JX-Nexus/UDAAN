import { Router } from "express";
import {
    createUser,
    signIn,
    signOut

} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(createUser)
router.route("/sign-in").post(signIn)
router.route("/sign-out").post(verifyJWT, signOut)

export default router