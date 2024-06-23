"use server";

import cloudinary from "@/lib/cloudinary";

// Function to validate file mime type
export const isValidMimeType = (file, allowedMimeTypes) => {
  return allowedMimeTypes.includes(file.type);
};

// Function to validate file size
export const isValidFileSize = (file, fileSizeLimit) => {
  return file.size <= fileSizeLimit;
};

export const fileUpoad = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: process.env.NEXT_PUBLIC_CLOUDENARY_FOLDER ?? 'vastknowledges',
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });

  return result;
};
