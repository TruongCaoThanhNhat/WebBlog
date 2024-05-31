// import { RoleModel } from '@/models/RoleModel'
import { UserModel } from '../models/UserModel'
import bcrypt from 'bcrypt'

export const registerUser = async({ userName, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10)
        // const role = await RoleModel.findOne({ roleName: 'USER' })
    const user = await UserModel.create({
        userName,
        email,
        password: hashedPassword,
        isVerified: false,
        // role: role._id,
        role: 'USER'
    })
    return user
}
export const loginUserName = async({ userName, password }) => {
    const user = await UserModel.findOne({ userName })
    if (!user) {
        throw new Error('Tài khoản không tồn tại')
    }
    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!user || !isValidPassword) {
        throw new Error('Sai tên đăng nhập hoặc mật khẩu')
    }
    return user
}