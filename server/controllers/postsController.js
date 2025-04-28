import Post from '../models/Post.js';
import * as postService from '../Services/postsService.js'

export const listPosts = async (req, res, next) =>{
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}

export const findPostById = async (req, res, next) =>{
  try {
    const post = await postService.getPostById(req.params.id);
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
    const post = await postService.createPost(req.body)
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({error: 'Invalid post data.'})
  }
}

export const deletePostById = async (req, res) => {
  try {
    const deletePost = await postService.deletePostById(req.params.id)
    
    if(deletePost.deletedCount === 0){ return res.status(404).json({error: 'Post not found.'})}
    res.json({message: 'Post deleted.'})

  } catch (error) {
    res.status(500).json({ error: 'Could not delete post.' });
  }
}

export const patchPostbyId = async (req, res) => {
  try {
    const updatedPost = await postService.patchPostById(req.params.id, req.body) 
    if (!updatedPost ) return res.status(404).json({ error: 'Post not found.' });
    res.status(200).json(updatedPost);
    
  } catch (error) {
    res.status(500).json({ error: 'Could not patch post.' });
  }
  
}