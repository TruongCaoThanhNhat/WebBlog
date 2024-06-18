import bcrypt from 'bcrypt'
import { UserModel } from '@/models/UserModel'
import {
  getUserById,
  getUserByName,
} from '@/services/userService'
import { PostModel } from '@/models/PostModel'

export const getUser = async (req, res, next) => {
  const { username } = req.params
  console.log(username)
  const data = { user: null }
  try {
    const user = await getUserByName(username)
    data.user = user
    res.status(200).json({
      status: 'success',
      data: data,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}
export const getProfile = async (req, res, next) => {
  const { userId } = req.user
  const data = { user: null }
  try {
    const user = await getUserById(userId)
    data.user = user
    res.status(200).json({
      status: 'success',
      data: data,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.status(200).json({
      status: 'success',
      data: {
        users: users,
      },
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}
export const getHotAuthors = async (req, res) => {
  try {
    const { sort = 'views', limit = 10 } = req.query

    // Xác định tiêu chí sắp xếp
    let sortOptions = {}
    if (sort === 'likes') {
      sortOptions = { totalLikes: -1 } // Sắp xếp theo lượt like
    } else {
      sortOptions = { totalViews: -1 } // Sắp xếp theo lượt xem mặc định
    }

    // Tính toán tổng lượt xem và lượt like cho từng tác giả
    const authors = await PostModel.aggregate([
      {
        $group: {
          _id: '$author',
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: '$point' },
        },
      },
      {
        $sort: sortOptions,
      },
      {
        $limit: Number(limit),
      },
      {
        $lookup: {
          from: 'users', // Tên collection của người dùng
          localField: '_id',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      {
        $unwind: {
          path: '$authorDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          authorId: '$_id',
          totalViews: 1,
          totalLikes: 1,
          // author: { $ifNull: ['$authorDetails', 'Unknown'] },
          userName: { $ifNull: ['$authorDetails.userName', 'Unknown'] },
          intro: { $ifNull: ['$authorDetails.intro', 'Unknown'] },
          avatar: { $ifNull: ['$authorDetails.avatar', null] },
        },
      },
    ])

    if (authors.length === 1) {
      // If only one author is returned, calculate total views explicitly
      const singleAuthor = authors[0]
      const totalViews = singleAuthor.totalViews

      return res.status(200).json({
        status: 'OK',
        totalViews,
        data: authors,
      })
    }

    if (authors.length === 0) {
      return res.status(404).json({
        status: 'No Authors Found',
        data: [],
      })
    }

    res.status(200).json({
      status: 'OK',
      data: authors,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message,
    })
  }
}
// update user 
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await updateUserById(userId, req.body);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.user;
    // const { oldPassword,password } = req.body
    const getUser = await getUserById(userId);
    const result = bcrypt.compareSync(req.body.oldPassword, getUser.password);
    if (result) {
      const newPassword = await bcrypt.hash(req.body.newPassword, 10);
      console.log(newPassword);
      const user = await updateUserById(userId, { password: newPassword });
      res.status(200).json({
        status: "success",
        data: "Cập nhật mật khẩu thành công",
      });
    } else {
      const err = new Error("Mật khẩu cũ không chính xác");
      err.statusCode = 400;
      return next(err);
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
export const updateUserEmail = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { email, password } = req.body;
    const getUser = await getUserById(userId);

    const result = bcrypt.compareSync(password, getUser.password);

    const dataUpdate = {
      email: email,
    };
    if (result) {
      await updateUserById(userId, dataUpdate);
      res.status(200).json({
        status: "OK",
        data: "Cập nhật email thành công",
      });
    } else {
      const err = new Error("Mật khẩu không chính xác");
      err.statusCode = 400;
      return next(err);
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};