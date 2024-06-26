import dotenv from "dotenv";
import { v2 as cloudinary, uploader } from "cloudinary";

dotenv.config();
const cloudinaryConfig = () =>
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
export { cloudinaryConfig, uploader };
