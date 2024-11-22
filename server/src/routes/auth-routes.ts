import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  console.log('Request body', req.body);
  const { username, password } =req.body;
  console.log('Request Headers', req.headers);
  console.log('Request body', req.body);

  try {
    const user = await User.findOne({where: { username }});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid Password'});
    }
    
    const payload = { username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '2hr'});

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login', error);
    return res.status(500).json({message: 'Internal server error'});
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
