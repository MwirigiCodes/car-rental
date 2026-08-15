import jwt from 'jsonwebtoken';

export const generateTokens = (user, res) => {
  try {
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
    );

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
  } catch (error) {
    console.log('Error in generateTokens: ' + error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
