import { Router } from "express";
import { careerRecommendation } from "../controllers/career.controller.js";


const router = Router()

router.route("/recommendation").post(careerRecommendation)


export default router