import User from '../Models/User.js';

export async function register(req, res, next) {
    try {
        const { username, email, password} = req.body;
        if( !username || !email || !password){
            res.status(500).json({messsage: 'Username, email and password are required.'})
        }

        const newUser = new User ({username: username, email: email, passwordHash: password});

        await newUser.save();

        res.status(201).json({messsage: 'New user created.'})
    } catch (error) {
        res.status(500).json({messsage: 'Failed user creation request.'})
    }
}
