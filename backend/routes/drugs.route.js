import express from "express";
import {deleteDrugs, getDrugs, postDrugs, putDrugs, getDrugByIdPublic } from "../controllers/drugsController.js";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

const router = express.Router();
// routes/drugs.route.js-д
router.get("/", getDrugs);  // Бүх эмийн жагсаалт
router.get("/search", getDrugs);  // Хайлт хийх
router.post('/post', upload.single('drug_file'), postDrugs);
router.put("/:id", putDrugs);
router.delete("/:id", deleteDrugs);
router.get("/public/:id", getDrugByIdPublic); 



export default router;
