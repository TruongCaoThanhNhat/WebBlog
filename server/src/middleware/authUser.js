import jwt from 'jsonwebtoken'

export const checkCurrentUser = (req, res, next) => {
    const Authorization = req.header('authorization')
    if (!Authorization) {
        req.user = null
        next()
    } else {
        const token = Authorization.replace('Bearer ', '')
        try {
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = { userId }
            next()
        } catch (err) {
            req.user = null
            next()
        }
    }
}

// checkAdmin.js
export const isAdmin = async (req, res, next) => {
  const userId = req.user.userId;
  const user = await getUserById(userId);
  if (user && user.role === "ADMIN") {
    next(); // Cho phép tiếp tục nếu là admin
  } else {
    res.status(403).send("Access denied"); // Trả về lỗi nếu không phải admin
  }
};
