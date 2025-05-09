import {body, validationResult} from 'express-validator';

export const userRules =[
    body('username').trim().isLength({min:5}).withMessage('Username must have at least 5 characters.'),
    body('email').trim().isEmail().withMessage('You must enter a valid email.'),
    body('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }).withMessage('Password is not strong enough.')
];

export function validateUser(req, res, next){
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
}