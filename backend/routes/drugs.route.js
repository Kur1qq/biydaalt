import express from "express";
import { deleteDrugs, getDrugs, postDrugs, putDrugs } from "../controllers/drugsController.js";

const router = express.Router();


router.get("/", getDrugs);

router.post("/", postDrugs);

router.put("/:id", putDrugs);


router.delete("/:id", deleteDrugs);


export default router;