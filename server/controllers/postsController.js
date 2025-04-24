import Post from '../models/Post.js';


export async function listPosts(req, res, next) {
  try {
    const posts = await Post.find().sort('-createdAt');
    res.status(200).json(posts);
  } catch (err) {
    console.log("grska")   
    next(err);
  }
}

export async function findPostById(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found.' });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

export async function createPost(req, res) {
  try {
    const{title, body} = req.body;
    const post = await Post.create({
      title,
      body
    })
    res.status(201).json(post);

  } catch (error) {
    res.status(400).json({error: 'Invalid post data.'})
  }
  
}
