import User from "../Models/User.js";
import jwt from 'jsonwebtoken';

export const registerUser = async ({ username, email, password }) => {
    const newUser = new User({username, email, passwordHash: password});
  
    try {
      return await newUser.save();
    } catch (err) {
      if (err.code === 11000) {
        const e = new Error('That email is already registered.');
        e.status = 409; 
        throw e;
      }
      throw err;
    }
}

export const  loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.verifyPassword(password))) {
      const err = new Error('Invalid email or password.');
      err.status = 401; 
      throw err;
    }
    return user;
}

export const createTokenForUser = (user) => {
    // Only include minimal data in the JWT payload:
    //sign a Token that "hashes the whole data set of the user upon login, provides a key that can confirm this token and sets an expiration date."
    const payload = { sub: user._id.toString()}
    return jwt.sign(payload, process.env.MY_SECRET, { expiresIn: '15m' });
  }