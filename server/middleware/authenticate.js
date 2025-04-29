import jwt from "jsonwebtoken";

//Never worked with JWT so will add comment for future self
export  const authenticate = (req, res, next) => {
    
    //Pick up the token from the request
    const token = req.cookies.token;
    
    //Check if the token exists
    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
      }
    try {
        //Verify the Token with the password stored in ENV variable
        const user = jwt.verify(token, process.env.MY_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}