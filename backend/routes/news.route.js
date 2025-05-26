import express from "express";
import { getNews, postNews, putNews, deleteNews, getNewsByIdPublic } from "../controllers/newsController.js";
import multer from "multer";

const upload = multer({ dest: 'newsUploads/' });
const router = express.Router();

router.get("/", getNews);
router.get("/public/:id", getNewsByIdPublic);
router.post("/post", upload.single('image'), postNews);
router.put("/:id", putNews);
router.delete("/:id", deleteNews);

export default router;
