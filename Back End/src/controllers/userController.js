import User from '../models/User.js'
export async function listUsers(req, res, next) { try { res.json({ users: await User.find().sort({ firstName: 1 }) }) } catch (error) { next(error) } }
export async function getUser(req, res, next) { try { const user = await User.findById(req.params.id); return user ? res.json({ user }) : res.status(404).json({ message: 'User not found.' }) } catch (error) { next(error) } }
