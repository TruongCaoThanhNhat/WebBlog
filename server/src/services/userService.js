import { UserModel } from "@/models/UserModel"

export const getUserByName = async (username) => {
  const user = await UserModel.findOne({ userName: username })
  if (!user) {
    throw new Error('User not found')
  }
  return user
}
export const getUserById = async (userId) => {
  const user = await UserModel.findOne({ _id: userId })
  if (!user) {
    throw new Error('User not found')
  }
  return user
}
export const updateUserById = async (userId, data) => {
  const user = UserModel.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  })
  return user
}
export const updateUserByName = async (username, data) => {
  const user = UserModel.findOneAndUpdate({ userName: username }, data, {
    new: true,
    runValidators: true,
  })
  return user
}
