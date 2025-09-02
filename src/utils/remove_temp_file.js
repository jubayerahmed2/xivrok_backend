import fs from "fs";
// from /public/temp

const removeTemporaryFile = (filePath) => {
    fs.unlinkSync(filePath);
};

export { removeTemporaryFile };
