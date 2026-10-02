import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
export async function login(req, res, next) {
  try {
    const { email, username, password } = req.body
    if (!password || !(email || username)) return res.status(400).json({ message: 'Email and password are required.' })
    const user = await User.findOne({ email: String(email || username).toLowerCase() }).select('+passwordHash')
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password.' })
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' })
    const safeUser = user.toObject(); delete safeUser.passwordHash
    res.json({ token, user: safeUser })
  } catch (error) { next(error) }
}
