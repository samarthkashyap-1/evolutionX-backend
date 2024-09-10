import { Router } from "express";
import { register, login, getAllUser, getUser , userMeals} from "../controllers/userController";

const router = Router();

router.post("/register", register);
router.post("/login", login)
router.get("/all", getAllUser);
router.get("/:id", getUser);
router.get("/:id/meals", userMeals);

export default router;