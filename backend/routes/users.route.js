import express from "express";
import { getUsers, putUsers, deleteUsers, registerUsers, loginUsers} from "../controllers/usersController.js";
import verifyToken from '../middlewares/authMiddlewares.js';


const router = express.Router();


router.get("/", getUsers);

router.post("/register", registerUsers);

router.post("/login", loginUsers);

router.put("/:id", putUsers);

router.delete("/:id", deleteUsers);



export default router;