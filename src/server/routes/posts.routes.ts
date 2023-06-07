import { Router } from "express";
import * as postsController from "../controllers/posts.controller";

const router = Router();

router.get("/", postsController.getPosts);
router.get("/:id", postsController.getPost);
router.post("/", postsController.createPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

export default router;
