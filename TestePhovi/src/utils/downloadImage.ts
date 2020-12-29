//import * as imageDownload from "image-download";

const imageDownload = require("image-download");

export const downloadImage = async (url: {}) => {
    let myBuff;
    await imageDownload(url).then( (buffer) => {
        myBuff = buffer;
    })
    .catch( (err) => {
        console.log("Error downloading image");
        console.error(err);
    })
    return myBuff;
}