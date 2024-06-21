import { v2 as cloudinary } from "cloudinary";

import { UserModel } from "../models/UserModel";
import { PostModel } from "../models/PostModel";

export const getAllPosts = async (req, res) => {
  try {
    const { sort, page = 1, limit = 20 } = req.query;

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    let sortOptions = {};
    let countOptions = {};
    if (sort === "top") {
      sortOptions = { point: -1 }; // Sắp xếp theo lượt like giảm dần
    } else if (sort === "new") {
      sortOptions = { createdAt: -1 }; // Sắp xếp theo ngày tạo mới nhất
    } else if (sort === "view") {
      sortOptions = { views: -1 }; // Sắp xếp theo lượt xem giảm dần
    } else if (sort === "hot") {
      sortOptions = { views: -1 }; // Sắp xếp theo lượt xem giảm dần
      countOptions = { createdAt: { $gte: startDate, $lte: endDate } };
    }

    let query = PostModel.find()
      .sort(sortOptions)
      .populate("author", "userName avatar displayName postSaved")
      .populate("category", "name slug")
      .select(
        "title content description createdAt slug category attachment vote views point comment_count"
      );
    // .select('-_id') // trừ field nào không muốn lấy

    if (page && limit) {
      const pageNumber = Number(page);
      const limitNumber = Number(limit);
      query = query.skip((pageNumber - 1) * limitNumber).limit(limitNumber);

      let totalPosts = await PostModel.countDocuments(countOptions);
      let totalPages = Math.ceil(totalPosts / limitNumber);

      if (sort === "hot") {
        query = query.find({ createdAt: { $gte: startDate, $lte: endDate } });
      }
      // Kiểm tra nếu không có bài đăng trong 3 ngày gần nhất
      if (sort === "hot" && totalPosts === 0) {
        query = PostModel.find();
      }
      const posts = await query;

      res.status(200).json({
        status: "OK",
        data: {
          posts,
          pagination: {
            totalPosts,
            totalPages,
            currentPage: pageNumber,
            limit: limitNumber,
          },
        },
      });
    } else {
      const posts = await query;
      res.status(200).json({
        status: "OK",
        data: {
          posts,
          pagination: {
            totalPosts,
            totalPages,
            currentPage: pageNumber,
            limit: limitNumber,
          },
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
export const getPostsByCategory = async (req, res, next) => {
  const { cateId } = req.params;
  try {
    const posts = await PostModel.find({
      category: cateId,
    })
      .populate("author", "userName avatar displayName postSaved")
      .populate("category", "name slug")
      .select("title description createdAt slug category attachment ");
    res.status(200).json({
      status: "OK",
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
export const createPost = async (req, res, next) => {
  try {
    const { userId } = req.user;
    console.log(req.body);
    console.log(userId);
    // Kiểm tra đầu vào
    if (!req.body.title || req.body.title.length < 10) {
      return res.status(400).json({
        err: "Tiêu đề bài viết không được để trống và phải nhiều hơn 10 kí tự",
      });
    }

    if (!req.body.content || req.body.content.length === 0) {
      return res.status(400).json({
        err: "Nội dung bài viết không được để trống",
      });
    }

    // Xử lý attachment
    const att =
      req.body.content && Array.isArray(req.body.content)
        ? req.body.content.filter(
            (url) => url.type === "image" && url.data.file
          )
        : [];

    const url = att.map((e) => e.data.file.url);

    // Tạo bài viết
    const postData = {
      ...req.body,
      author: userId,
      vote: userId,
      attachment: url.length ? url[0].toString() : undefined,
    };

    const post = await PostModel.create(postData);

    res.status(201).json({
      status: "OK",
      data: {
        slug: post.slug,
        id: post._id,
        status: "Bài viết được tạo thành công",
      },
    });
  } catch (err) {
    console.error("Error creating post:", err); // Log chi tiết lỗi
    res.status(500).json({
      err: "Có lỗi khi tạo bài viết",
    });
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const att =
      req.body.content && req.body.content.blocks
        ? req.body.content.blocks.filter((url) => {
            if (url.type === "image") {
              return url.data.file;
            }
          })
        : [];
    const url = att.map((e) => {
      return e.data.file.url;
    });
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { ...req.body, attachment: url.toString() },
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({
        error: "Bài viết không tồn tại",
      });
    }
    res.status(200).json({
      status: "OK",
      data: updatedPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Có lỗi khi cập nhật bài viết",
    });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await PostModel.findByIdAndDelete(postId);
    res.status(200).json({
      status: "OK",
      message: "Bài viết đã được xóa thành công",
    });
  } catch (err) {
    next(err);
  }
};
export const uploadImage = async (req, res, next) => {
  try {
    const fileStr = req.file;
    const uploadResponse = await cloudinary.uploader.upload(fileStr.path, {
      folder: "postimg",
    });
    res.status(200).json({
      success: "1",
      file: {
        url: uploadResponse.url,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};
export const getPost = async (req, res, next) => {
  try {
    const post = await PostModel.findOne({ slug: req.params.slug })
      .populate("author", "userName displayName avatar intro postSaved")
      .populate("category", "name slug attachment");
    res.status(200).json({
      status: "success",
      post: post,
      points: post.vote.length - post.unVote.length,
    });
  } catch (error) {
    res.json(error);
  }
};
export const getPostsByUserName = async (req, res, next) => {
  const { username } = req.params;
  const user = await UserModel.find({
    userName: username,
  });
  const userId = user[0]._id.toString();
  try {
    const posts = await PostModel.find({
      author: userId,
    })
      .populate("author", "userName avatar postSaved")
      .populate("category", "name")
      .select("title description createdAt slug category attachment");
    res.status(200).json({
      status: "OK",
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
export const getAllPostsCategoryUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const find = await UserModel.findOne({ _id: userId });
    if (find.category.length > 0) {
      const posts = await PostModel.find({
        category: { $in: find.category },
      })
        .sort({ createdAt: -1 })
        .populate("author", "userName avatar displayName postSaved ")
        .populate("category", "name slug ");
      res.status(200).json({
        status: "success",
        data: posts,
      });
    } else if (find.category.length === 0) {
      const posts = await PostModel.find()
        .sort({ createdAt: -1 })
        .populate("author", "userName avatar displayName postSaved")
        .populate("category", "name slug");
      res.status(200).json({
        status: "success",
        data: posts,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

export const getTop10PostOfMonth = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const posts = await PostModel.find({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    })
      .sort({ views: -1 }) // Sắp xếp theo lượt xem giảm dần
      .limit(10) // Giới hạn lấy 10 bài viết
      .populate("author", "userName avatar displayName postSaved")
      .populate("category", "name slug")
      .select("title description createdAt slug category attachment views"); // Lựa chọn các trường cần thiết

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        status: "No posts found",
        data: [],
      });
    }

    res.status(200).json({
      status: "OK",
      data: {
        posts,
      },
    });
  } catch (err) {
    console.error("Error fetching top 10 posts:", err);
    res.status(500).json({
      status: "ERROR",
      message: "Failed to fetch top 10 posts",
      error: err.message,
    });
  }
};


//
export const updateView = async (req, res, next) => {
  // const postId = req.body.postId
  const postId = req.params.postId;
  const prevViews = await PostModel.findById({ _id: postId });
  try {
    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        views: prevViews.views + 1,
      },
      {
        new: true,
        runValidator: true,
      }
    );
    res.status(200).json({
      status: "OK",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};
export const votePost = async (req, res, next) => {
  const { userId } = req.user;
  const action = req.body.action;
  const postId = req.params.postId;
  const findPost = await PostModel.findOne({ _id: postId });
  // 1 vote
  if (action === "1" || "vote") {
    try {
      const find = await PostModel.find({
        _id: { $in: postId },
        vote: { $in: userId },
      });
      if (find.length === 0) {
        const data = await PostModel.findOneAndUpdate(
          { _id: postId },
          {
            $push: {
              vote: userId,
            },
            $pull: {
              unVote: userId,
            },
            $inc: { point: 1 },
          },
          {
            new: true,
          }
        );
        res.status(200).json({
          status: "success",
          points: data.vote.length - data.unVote.length,
          type: "vote",
        });
      } else if (find.length !== 0) {
        const data = await PostModel.findOneAndUpdate(
          {
            _id: postId,
          },
          {
            $pull: {
              vote: userId,
            },
            $inc: { point: -1 },
          },
          {
            new: true,
          }
        );
        res.status(200).json({
          status: "OK",
          points: data.vote.length - data.unVote.length,
          type: "unvote",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  // 2 unvote
  else if (action === "2" || "unvote") {
    try {
      const find = await PostModel.find({
        _id: { $in: postId },
        vote: { $in: userId },
      });
      if (find.length === 0) {
        try {
          const findUnVote = await PostModel.find({
            _id: { $in: postId },
            unVote: { $in: userId },
          });
          if (findUnVote.length === 0) {
            const data = await PostModel.findOneAndUpdate(
              { _id: postId },
              {
                $push: {
                  unVote: userId,
                  $inc: { point: -1 },
                },
              },
              {
                new: true,
              }
            );
            res.status(200).json({
              status: "success",
              points: data.vote.length - data.unVote.length,
            });
          } else if (findUnVote.length !== 0) {
            const data = await PostModel.findOneAndUpdate(
              {
                _id: postId,
              },
              {
                $pull: {
                  unVote: userId,
                  $inc: { point: 1 },
                },
              },
              {
                new: true,
              }
            );
            res.status(200).json({
              status: "OK",
              points: data.vote.length - data.unVote.length,
            });
          }
        } catch (err) {
          next(err);
        }
      } else if (find.length !== 0) {
        await PostModel.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              vote: userId,
              $inc: { point: -1 },
            },
          },
          {
            new: true,
          }
        );
        try {
          const findUnVote = await PostModel.find({
            _id: { $in: postId },
            unVote: { $in: userId },
          });
          if (findUnVote.length === 0) {
            const data = await PostModel.findOneAndUpdate(
              { _id: postId },
              {
                $push: {
                  unVote: userId,
                  $inc: { point: 1 },
                },
              },
              {
                new: true,
              }
            );
            res.status(200).json({
              status: "success",
              points: data.vote.length - data.unVote.length,
            });
          } else if (findUnVote.length !== 0) {
            const data = await PostModel.findOneAndUpdate(
              {
                _id: postId,
              },
              {
                $pull: {
                  vote: userId,
                },
              },
              {
                new: true,
              }
            );
            res.status(200).json({
              status: "OK",
              points: data.vote.length - data.unVote.length,
            });
          }
        } catch (err) {
          next(err);
        }
      }
    } catch (err) {
      next(err);
    }
  }
};

// saved post
export const getPostUserSaved = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId).populate("postSaved");

    res.status(200).json({
      status: "success",
      savedPost: user.postSaved,
    });
  } catch (error) {
    next(error);
  }
};

export const addPostUserSaved = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { postId } = req.body;

    const user = await getUserById(userId);
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!user.postSaved.includes(postId)) {
      user.postSaved.push(postId);
      await user.save();
      return res.status(200).json({ message: "Post saved successfully" });
    } else {
      return res.status(200).json({ message: "Post already saved" });
    }
  } catch (error) {
    next(error);
  }
};

export const removePostUserSaved = async (req, res, next) => {
  const { userId, postId } = req.params;
  try {
    const user = await getUserById(userId);
    // Đảm bảo rằng savedPosts là một mảng
    if (!Array.isArray(user.savedPosts)) {
      user.savedPosts = [];
    }

    const postIndex = user.postSaved.indexOf(postId);
    if (postIndex !== -1) {
      user.postSaved.splice(postIndex, 1);
      await user.save();
      return res.status(200).json({ message: "Post removed successfully" });
    } else {
      return res.status(404).json({ error: "Post not found in saved list" });
    }
  } catch (error) {
    next(error);
  }
};