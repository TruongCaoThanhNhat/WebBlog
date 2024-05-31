import bcrypt from 'bcrypt'
import { UserModel } from '../models/UserModel'
import { loginUserName, registerUser } from '../services/authServices'
import { generateAccessToken } from '../middleware/verifyToken'

export const register = async(req, res, next) => {
    try {
        const { userName, password, email } = req.body
        if (!userName || !password || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng điền đầy đủ thông tin',
            })
        }
        const userExist = await UserModel.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                status: 'error',
                message: 'Email đã tồn tại',
            })
        }

        const user = await registerUser({ userName, password, email })
            // Generate token
        const accessToken = generateAccessToken(user._id)
            // Send token to client via cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        })
        res.status(200).json({
            status: 'OK',
            message: 'Đăng ký thành công',
            data: {
                token: accessToken,
            },
        })
    } catch (err) {
        next(err)
    }
}
export const login = async(req, res, next) => {
    const { userName, password } = req.body
    if (!userName || !password)
        return res.status(400).json({
            status: 'error',
            message: 'Vui lòng điền đầy đủ thông tin',
        })
    try {
        const user = await loginUserName({ userName, password })
        const token = generateAccessToken(user._id, user.role)
        if (user) {
            res.cookie('accessToken', token, {
                httpOnly: true,
            })
            res.status(200).json({
                status: 'success',
                data: {
                    id: user._id,
                    token,
                    userName: user.userName,
                    displayName: user.displayName,
                    mobile: user.mobile,
                },
            })
        } else {
            const err = new Error('Tài khoản không tồn tại')
            err.statusCode = 400
            return next(err)
        }
    } catch (err) {
        res.status(401).json({
            error: {
                message: err.message,
                statusCode: 401,
            },
        })
    }
}
export const getCurrentUser = async(req, res, next) => {
    try {
        const data = { user: null }
        if (req.user) {
            const user = await UserModel.findOne({ _id: req.user.userId }).populate(
                'category',
                'slug attachment name _id '
            )
            data.user = user
        }
        res.status(200).json({
            status: 'success',
            data: data,
        })
    } catch (error) {
        res.json(error)
    }
}