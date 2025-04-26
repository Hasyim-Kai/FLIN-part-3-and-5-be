const { JWT_SECRET, } = process.env;
import { compareSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { Secret, decode, sign } from 'jsonwebtoken';
import prisma from '../prisma/client';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const foundExistingEmail = await prisma.user.findFirst({ where: { email } })
    const isPasswordValid = foundExistingEmail ? compareSync(password, foundExistingEmail?.password) : false;
    if (foundExistingEmail && isPasswordValid) {
      const jwtPayload = { id: foundExistingEmail.id, name: foundExistingEmail.name, email }
      const token = sign(jwtPayload, JWT_SECRET as Secret, { expiresIn: "7d" })
      return res.status(200).json({ message: "Login Success", token, ...foundExistingEmail });
    }
    return res.status(401).json({ message: "Wrong Email/Password", });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", });
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const foundExistingEmail = await prisma.user.findFirst({ where: { email: req.body.email } })
    if (foundExistingEmail) {
      return res.status(402).json({ message: "Email already exists", });
    }
    const { name, email, password, phoneNumber, loanType } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
        phoneNumber,
        loanType,
      },
    })
    return res.status(200).json({ message: "Sign Up Success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong", });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const foundExistingUser = await prisma.user.findFirst({ where: { id: res.locals.user.id } })
    if (!foundExistingUser) {
      return res.status(404).json({ message: "Not Found", });
    }
    return res.status(200).json(foundExistingUser);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export = { login, signUp, getMe };