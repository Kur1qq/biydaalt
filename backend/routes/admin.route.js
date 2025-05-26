import express from "express";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/adminLogin", loginAdmin);

export default router;
