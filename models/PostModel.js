import mongoose ,{Schema} from "mongoose";


const PostSchema = new mongoose.Schema({
    //new 
    user:{
        type:[Schema.Types.ObjectId],
        required:true,
        ref:"User"
    },
  //-----///
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
}, { timestamps: true })



const Post = mongoose.model("Post", PostSchema)

export default Post