import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
import * as  userService from '../Services/usersServices.js'


export async function registerUser(req, res) {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) return res.status(400).json({ message: 'Username, email and password are required.' });
    
    try {
      const user = await userService.registerUser({ username, email, password });

      return res.status(201).json({ message: 'New user created.', userId: user._id });
  
    } catch (err) {
      if (err.status) {return res.status(err.status).json({ message: err.message });
      }
  
      return res.status(500).json({ message: 'Failed user register request.' });
    }
  }

//Never worked with JWT so will add comment for future self
export async function loginUser(req, res) {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
        
        const user = await userService.loginUser({ email, password });
        
        //sign a Token that "hashes the whole data set of the user upon login, provides a key that can confirm this token and sets an expiration date."
        //have to use {} to create a json from the object
        const token = jwt.sign({user}, process.env.MY_SECRET, {expiresIn: "15m"});

        //Adds the token to the res cookies
        res.cookie("token", token,{ httpOnly: true}).status(200).json({message: "Logged In."})
    } catch (error) {
        res.status(500).json({message: 'Failed user login request.' + error})
    }
}
