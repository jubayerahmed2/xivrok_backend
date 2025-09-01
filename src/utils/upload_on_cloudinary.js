import cloudinary from "cloudinary";
import fs from "fs";
import envVariables from "../config/env";

cloudinary.v2.config({
    cloud_name: envVariables.CLOUDINARY_CLOUD_NAME,
    api_key: envVariables.CLOUDINARY_API_KEY,
    api_secret: envVariables.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFile) => {
    try {
        if (!localFile) return null;

        const uploadedFile = await cloudinary.v2.uploader.upload(localFile, {
            resource_type: "auto"
        });

        console.log(
            `Cloudinary file uploaded successfully url: ${uploadedFile.url}`
        );

        fs.unlinkSync(localFile);
        return uploadedFile;
    } catch (error) {
        console.log(
            `Something went wrong while upload image on cloudinary. Error: ${error}`
        );

        fs.unlinkSync(localFile);

        return null;
    }
};

export { uploadOnCloudinary };
