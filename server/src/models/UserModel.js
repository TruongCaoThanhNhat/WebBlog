import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    userName: {
      type: "string",
      unique: true,
      trim: true,
      required: [
        true,
        "Tên tài khoản là bắt buộc và phải chứa từ 6 đến 30 ký tự",
      ],
      minlength: [
        3,
        "Tên tài khoản là bắt buộc và phải chứa từ 6 đến 30 ký tự",
      ],
    },
    socialIdFacebook: {
      type: "string",
    },
    password: {
      type: "string",
      trim: true,
      required: [true, "Mật khẩu nên chứa từ 6 đến 100 ký tự"],
      minlength: [8, "Mật khẩu nên chứa từ 6 đến 100 ký tự"],
    },
    email: {
      type: "string",
    },
    displayName: {
      type: "string",
    },
    gender: {
      type: "string",
      default: "",
    },
    intro: {
      type: "string",
      default: "",
    },
    avatar: {
      type: "string",
      default:
        "https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    },
    cover: {
      type: "string",
    },
    mobile: {
      type: "string",
    },
    identification: {
      type: "string",
    },
    address: {
      type: "string",
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    postSaved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    dateOfBirth: {
      type: "string",
    },
    monthOfBirth: {
      type: "string",
    },
    yearOfBirth: {
      type: "string",
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: [],
      },
    ],
    role: {
      type: "string",
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Role',
      // required: false,
    },
  },
  {
    timestamps: true,
  }
);
schema.index({ displayName: "text", userName: "text" });
// schema.pre('save', function (next) {
//   const user = this
//   bcrypt.hash(user.password, 10, (err, hash) => {
//     if (err) {
//       return next(err)
//     } else {
//       user.password = hash
//       next()
//     }
//   })
// })
export const UserModel = mongoose.model("User", schema);
