import {body, query, validationResult} from 'express-validator';

export const postRules =[
    body('title').trim().isLength({min:3}).withMessage('Title must have at least 3 characters.'),
    body('body').trim().isLength({min:5}).withMessage('Body must have at least 5 characters.')
];

export const searchRules = [
  query('search').optional().trim().isLength({ min: 3 }).withMessage('Search term must be at least 3 characters.')
];

export function validatePost(req, res, next){
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    next();
}

export function validateSearch(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}