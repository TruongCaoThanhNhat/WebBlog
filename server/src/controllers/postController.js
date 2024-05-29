import { v2 as cloudinary } from 'cloudinary'

import { UserModel } from '@/models/UserModel'

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate('author', 'userName avatar displayName postSaved')
      .populate('category', 'name slug')
      .select('title content description createdAt slug category attachment ')
    // populate('author') lấy toàn bộ thông tin của user có id match
    // populate('author','userName') lấy username từ author
    // .select('-slug') // trừ field nào không muốn lấy
    res.status(200).json({
      status: 'OK',
      data: {
        posts,
      },
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    })
  }
}
export const getPostsByCategory = async (req, res, next) => {
  const { cateId } = req.params
  try {
    const posts = await PostModel.find({
      category: cateId,
    })
      .populate('author', 'userName avatar displayName postSaved')
      .populate('category', 'name slug')
      .select('title description createdAt slug category attachment ')
    res.status(200).json({
      status: 'OK',
      data: {
        posts,
      },
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    })
  }
}
export const createPost = async (req, res, next) => {
  try {
    const { userId } = req.user
    if (req.body.title.length < 10) {
      res.status(500).json({
        err: 'Tiêu đề bài viết không được để trống và phải nhiều hơn 10 kí tự',
      })
    }
    if (req.body.content.blocks.length === 0) {
      res.status(500).json({
        err: 'Có lỗi khi tạo bài viết',
      })
    }
    const att =
      req.body.content && Array.isArray(req.body.content.blocks)
        ? req.body.content.blocks.filter((url) => {
            if (url.type === 'image') {
              return url.data.file
            }
          })
        : []
    const url = att.map((e) => {
      return e.data.file.url
    })
    if (url.length !== 0) {
      const post = await PostModel.create({
        ...req.body,
        author: userId,
        vote: userId,
        attachment: url[0].toString(),
      })
      res.status(200).json({
        status: 'OK',
        data: {
          slug: post.slug,
          id: post._id,
          status: 'Bài viết được tạo thành công',
        },
      })
    } else if (url.length === 0) {
      const post = await PostModel.create({
        ...req.body,
        author: userId,
        vote: userId,
      })
      res.status(200).json({
        status: 'OK',
        data: {
          slug: post.slug,
          id: post._id,
          status: 'Bài viết được tạo thành công',
        },
      })
    }
  } catch (err) {
    res.status(500).json({
      err: 'Có lỗi khi tạo bài viết',
    })
  }
}
export const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params
    const att =
      req.body.content && req.body.content.blocks
        ? req.body.content.blocks.filter((url) => {
            if (url.type === 'image') {
              return url.data.file
            }
          })
        : []
    const url = att.map((e) => {
      return e.data.file.url
    })
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { ...req.body, attachment: url.toString() },
      { new: true, runValidators: true }
    )
    if (!updatedPost) {
      return res.status(404).json({
        error: 'Bài viết không tồn tại',
      })
    }
    res.status(200).json({
      status: 'OK',
      data: updatedPost,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: 'Có lỗi khi cập nhật bài viết',
    })
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params
    await PostModel.findByIdAndDelete(postId)
    res.status(200).json({
      status: 'OK',
      message: 'Bài viết đã được xóa thành công',
    })
  } catch (err) {
    next(err)
  }
}
export const uploadImage = async (req, res, next) => {
  try {
    const fileStr = req.file
    const uploadResponse = await cloudinary.uploader.upload(fileStr.path, {
      folder: 'postimg',
    })
    res.status(200).json({
      success: '1',
      file: {
        url: uploadResponse.url,
      },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
}
export const getPost = async (req, res, next) => {
  try {
    const post = await PostModel.findOne({ slug: req.params.slug })
      .populate('author', 'userName displayName avatar intro postSaved')
      .populate('category', 'name slug attachment')
    res.status(200).json({
      status: 'success',
      post: post,
      points: post.vote.length - post.unVote.length,
    })
  } catch (error) {
    res.json(error)
  }
}
export const getPostsByUserName = async (req, res, next) => {
  const { username } = req.params
  const user = await UserModel.find({
    userName: username,
  })
  const userId = user[0]._id.toString()
  try {
    const posts = await PostModel.find({
      author: userId,
    })
      .populate('author', 'userName avatar postSaved')
      .populate('category', 'name')
      .select('title description createdAt slug category attachment')
    res.status(200).json({
      status: 'OK',
      data: {
        posts,
      },
    })
  } catch (err) {
    res.status(500).json({
      error: err,
    })
  }
}
export const getAllPostsCategoryUser = async (req, res, next) => {
  try {
    const { userId } = req.user
    const find = await UserModel.findOne({ _id: userId })
    if (find.category.length > 0) {
      const posts = await PostModel.find({
        category: { $in: find.category },
      })
        .sort({ createdAt: -1 })
        .populate('author', 'userName avatar displayName postSaved ')
        .populate('category', 'name slug ')
      res.status(200).json({
        status: 'success',
        data: posts,
      })
    } else if (find.category.length === 0) {
      const posts = await PostModel.find()
        .sort({ createdAt: -1 })
        .populate('author', 'userName avatar displayName postSaved')
        .populate('category', 'name slug')
      res.status(200).json({
        status: 'success',
        data: posts,
      })
    }
  } catch (error) {
    res.json(error)
  }
}
