import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateTokens } from '../utils/generateTokens.js';

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    const exists = await User.findOne({ email }).select('-password');
    if (exists) return res.status(404).json({ message: 'User already exists' });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // generate jwt tokens
    generateTokens(user, res);

    res.status(201).json({ message: 'Signed up successfully' });
  } catch (error) {
    console.log('Error in signup controller: ' + error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Invalid creditials' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: 'Invalid creditials' });

    // generate jwt tokens
    generateTokens(user, res);

    res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.log('Error in login controller: ' + error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req, res) => {
  try {
    const { accessToken, refreshToken } = req.cookies;
    res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .status(200)
      .json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller: ' + error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
