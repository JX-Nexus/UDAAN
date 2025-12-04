import { Router } from "express";
import { 
    careerRecommendation,
    getCareer

} from "../controllers/career.controller.js";


const router = Router()

router.route("/recommendation").post(careerRecommendation)
router.get("/:slug", getCareer);

export default router