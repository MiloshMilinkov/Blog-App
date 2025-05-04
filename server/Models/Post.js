import mongoose from "mongoose";

const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{type: String, required: true},
    body:{type: String, required: true},
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps:true
})

postSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc, ret) => { delete ret._id; }
  });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;