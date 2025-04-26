import User from '../Models/User.js';

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
        res.status(500).json({message: 'Failed user register request.'})
    }
}

export async function login(req, res) {
    try {
        const {email, password} = req.body;

        //No lean cause i will lose the method added in the schema i think....
        const user = await User.findOne({email});

        if(!user || !(await user.verifyPassword(password))){
            return res.status(401).json({message: 'Invalid email or password.'})
        }
        
        res.status(200).json({message: "Logged In."})
    } catch (error) {
        res.status(500).json({message: 'Failed user login request.'})
    }
}
