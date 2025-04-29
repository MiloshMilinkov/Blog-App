import User from '../Models/User.js';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    try {
        const { username, email, password} = req.body;
        if( !username || !email || !password){
            return res.status(400).json({message: 'Username, email and password are required.'})
        }

        const newUser = new User ({username: username, email: email, passwordHash: password});

        await newUser.save();

        res.status(201).json({message: 'New user created.'})
    } catch (error) {
        if (error.code === 11000) {
            return res
              .status(409)
              .json({ message: 'That email is already registered.' });
          }
        res.status(500).json({message: 'Failed user register request.'})
    }
}

//Never worked with JWT so will add comment for future self
export async function login(req, res) {
    try {
        const {email, password} = req.body;

        //No lean cause i will lose the method added in the schema i think....
        const user = await User.findOne({email});

        if(!user || !(await user.verifyPassword(password))){
            return res.status(401).json({message: 'Invalid email or password.'})
        }
        
        //sign a Token that "hashes the whole data set of the user upon login, provides a key that can confirm this token and sets an expiration date."
        //have to use {} to create a json from the object
        const token = jwt.sign({user}, process.env.MY_SECRET, {expiresIn: "15m"});

        //Adds the token to the res cookies
        res.cookie("token", token,{ httpOnly: true})
        .status(200)
        .json({message: "Logged In."})
    } catch (error) {
        res.status(500).json({message: 'Failed user login request.' + error})
    }
}
