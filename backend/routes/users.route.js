import express from "express";
import { getUsers, postUsers, putUsers, deleteUsers } from "../controllers/usersController.js";

const router = express.Router();


router.get("/", getUsers);


router.post("/", postUsers);

router.put("/:id", putUsers);

router.delete("/:id", deleteUsers);


export default router;