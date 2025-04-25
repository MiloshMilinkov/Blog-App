import mongoose from "mongoose";

const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{type: String, required: true},
    body:{type: String, required: true},
},
{
    timestamps:true
})

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;