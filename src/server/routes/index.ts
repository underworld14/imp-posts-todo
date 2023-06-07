import { Router } from "express";
import postRoutes from "./posts.routes";

const router = Router();

router.use("/posts", postRoutes);

export default router;
