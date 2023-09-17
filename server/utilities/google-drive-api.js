const fs = require("fs");
const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "./utilities/zvawebsite-3b41b59d4bd6.json",
  scopes: ["https://www.googleapis.com/auth/drive"]
});

const drive = google.drive({ version: "v3", auth });

async function uploadFile(uploadedFile) {
  fs.writeFileSync("./utilities/" + uploadedFile.originalname, uploadedFile.buffer);
  const readableStream = fs.createReadStream("./utilities/" + uploadedFile.originalname);
  setTimeout(()=>{
    fs.unlinkSync("./utilities/" + uploadedFile.originalname);
  }, 5000);

  try {
    const response = await drive.files.create({
      requestBody: {
        name: uploadedFile.originalname, // Name of the file in Google Drive
        mimeType: uploadedFile.mimeType, // Mime type of the file
        parents: ['1BvSWfIm3NshiHjGbCgyKhJPYvMDoO-vW']
      },
      media: {
        mimeType: uploadedFile.mimeType,
        body: readableStream
      }
    });

    return {response: true, id: response.data.id}
  } catch (error) {
    console.error("Error uploading file:", error);
    return {response: false, id: 'undefined'}
  }

}

async function deleteFile(fileId){
  try {
    await drive.files.delete({
      fileId: fileId
    });
  
    console.log('File deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

module.exports = {
  uploadFile: uploadFile,
  deleteFile: deleteFile
};
