const cloudinary = require("cloudinary").v2; //v2 imprtant to save imge in his doisser

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// upload image to Cloudinary
const uploadPhotoCloudinary = async (fileUpload, dossier) => {
  try {
    const data = await cloudinary.uploader.upload(fileUpload, {
      upload_preset: dossier, //"users",
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    return error;
  }
};
// remove one image
const RemovePhotoCloudinary = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    return error;
  }
};
// remove images (type array)
const RemoveMultiplePhotosCloudinary = async (imagePublicIds) => {
  try {
    const result = await cloudinary.v2.api.delete_all_resources(imagePublicIds);
    return result;
  } catch (error) {
    return error;
  }
};
module.exports = {
  uploadPhotoCloudinary,
  RemovePhotoCloudinary,
  RemoveMultiplePhotosCloudinary,
};
