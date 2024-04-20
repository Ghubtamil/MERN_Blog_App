import express from "express";
import { addPost, deletePost, getPost, getUserPosts, updatePost,} from "../controllers/postsController.js";
import auth from "../middlewares/auth.js"


const router = express.Router();

router.post("/",auth,addPost);
router.get("/",getPost);
router.get("/user", auth, getUserPosts);
router.delete("/:id",auth,deletePost);
router.put("/:id",auth,updatePost);



export { router as postsRoutes };
