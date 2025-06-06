import Post from "../Models/Post.js";

export const getAllPosts = () => {
  return Post.find(
      { author: { $exists: true, $ne: null } },
    ).sort('-createdAt').populate('author', 'username');
};

export  const  getPostById = async (id) => {
   return await Post.findById(id).populate('author', 'username').lean();
}

export  const  createPost = async (user, data) => {
    const {title, body} = data;
    return await Post.create({
        title,
        body,
        author: user
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
  const deleted = await Post.deleteOne({
    _id: id
  });
  
  if(deleted.deletedCount === 0){       
    const err = new Error('Post not found.');
    err.status = 404; 
    throw err;
  }
}

export const findPostByTitle = async (title) => {
  return await Post.findOne({ title:{$regex:`${title}$`, $options: 'i'}})
  .populate('author', 'username')
  .lean();
}

export const searchPosts = (query) => {
  const re = new RegExp(query, 'i');

  return Post.find({
      author: { $exists: true, $ne: null },
      $or: [
        { title:  re }
      ]
    })
    .sort('-createdAt')
    .populate('author', 'username');
};