import express from "express";
import { deleteDrugs, getDrugs, postDrugs, putDrugs } from "../controllers/drugsController.js";
import authMiddleware from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.use(authMiddleware);


router.get("/", getDrugs);

router.post("/post", postDrugs);

router.get("/id", )

router.put("/:id", putDrugs);


router.delete("/:id", deleteDrugs);


export default router;