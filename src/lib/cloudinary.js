import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDENARY_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDENARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDENARY_API_SECRET,
});

export default cloudinary;