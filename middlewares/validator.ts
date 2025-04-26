import { Request, Response, NextFunction } from 'express';
const { check, validationResult } = require("express-validator");

export const createValidationFor = (route: string) => {
  switch (route) {
    case 'register':
      return [
        check('name')
          .not().isEmpty().withMessage('name cant be null')
          .isLength({ min: 3 }).withMessage('name must be minimum 3 length'),
        check('email')
          .not().isEmpty().withMessage('email cant be null')
          .isEmail().withMessage('must be an email'),
        check('password')
          .not().isEmpty().withMessage('password cant be null')
          .isLength({ min: 8 }).withMessage('password must be minimum 8 length'),
        check('phoneNumber')
          .not().isEmpty().withMessage('Phone Number cant be null')
          .isNumeric().withMessage('Phone Number must be numeric'),
        check('loanType')
          .not().isEmpty().withMessage('Loan Type cant be null'),
      ];
    case 'login':
      return [
        check('email')
          .not().isEmpty().withMessage('email cant be null')
          .isEmail().withMessage('must be an email'),
        check('password')
          .not().isEmpty().withMessage('password cant be null')
          .isLength({ min: 8 }).withMessage('password must be minimum 8 length'),
      ];
    default:
      return [];
  }
}

export const checkValidationResult = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (result.isEmpty()) { return next(); };
  res.status(422).json({ errors: result.array() });
}