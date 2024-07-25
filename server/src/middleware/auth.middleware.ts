import { Request, Response, NextFunction } from 'express'
import { JWT_SECRET } from '../utils/env'
import jwt from 'jsonwebtoken'

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1]

  if (!token) {
    return res
      .status(401)
      .json({ error: { message: 'Access denied. No token provided.' } })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    ;(req as any).user = decoded
    next()
  } catch (error) {
    res
      .status(401)
      .json({ error: { message: 'Failed to authenticate token.' } })
  }
}
