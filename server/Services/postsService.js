import Post from "../Models/Post.js";

export const getAllPosts = () => {
    return Post.find().sort('-createdAt').lean();
}

export  const  getPostById = async (id) => {
   return await Post.findById(id).lean();
}

export  const  createPost = async (data) => {
    const {title, body, author} = data;
    return await Post.create({
        title,
        body,
        author
    })
}

export const patchPostById = async (id, data) => {
    const {title, body, author} = data;
    return await Post.findByIdAndUpdate(
        {_id: id},
        { title, body, updatedAt: Date.now()},
        { 
          new: true,
          runValidators: true 
        }
      ).lean()
}

export const deletePostById = async (id) => {
    return await Post.deleteOne({
      _id: id
    })
}