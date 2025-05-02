import User from "../Models/User.js";


export const registerUser = async ({ username, email, password }) => {
    const newUser = new User({
      username,
      email,
      passwordHash: password 
    });
  
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

export async function loginUser({ email, password }) {
    const user = await User.findOne({ email });
    if (!user || !(await user.verifyPassword(password))) {
      const err = new Error('Invalid email or password.');
      err.status = 401; 
      throw err;
    }
    
    return user;
  }