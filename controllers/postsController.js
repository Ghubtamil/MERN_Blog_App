import mongoose from "mongoose";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
// **********************************************Create new Post ********************************
const addPost = async (req, res) => {
  // grab the data from request body
  const { title, body } = req.body;

  // check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }
  console.log(req.user);
  // find the authenticated user using the user id provided by request object
  const user = await User.findById(req.user._id)

  
  try {
    // create a new post and save in database
    const post = await Post.create({ user: user._id, title, body });
    
    res.status(200).json({ success: "Post created.", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ********************************************** Get post ********************************
const getPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ********************************************** Get user post ********************************
const getUserPosts = async (req, res) => {
  
  const user = await User.findById(req.user._id);

  try {
    
    const userPosts = await Post.find({ user: user._id }).sort({ createdAt: "desc" });
    res.status(200).json({ userPosts, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ********************************************** Delete post ********************************
const deletePost = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "incorrect ID" });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "post not found" });
  }

  const user = await User.findById(req.user._id);
  if (post.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await post.deleteOne();
    res.status(200).json({ success: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ********************************************** Update post ********************************

const updatePost = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect id" });
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(400).json({ error: "Post not found" });
  }
 
  const user = await User.findById(req.user._id);
  if (post.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await Post.updateOne({ _id: req.params.id }, { $set: { title, body } });
    return res.status(200).json({ success: "Post successfully updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
// ********************************************** export ********************************
export { addPost, getPost, deletePost, updatePost,getUserPosts };
