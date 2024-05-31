import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// Generate access token
export const generateAccessToken = (userId) => {
    return jwt.sign({
            userId: userId,
        },
        process.env.JWT_SECRET_KEY, { expiresIn: '30d' }
    )
}

export const verifyToken = (req, res, next) => {
    const Authorization = req.header('authorization')
    if (!Authorization) {
        const err = new Error('Chưa có token')
        err.statusCode = 401
        return next(err)
    }
    // Get token
    const token = Authorization.replace('Bearer ', '')
        // Verify token
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // Assign req
    req.user = { userId }
    next()
}