const fs = require('fs');
const { google } = require('googleapis');
const mime = require('mime');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_DRIVE_KEY; 
const FOLDER_ID = '1BvSWfIm3NshiHjGbCgyKhJPYvMDoO-vW';

const drive = google.drive({
  version: 'v3',
  auth: API_KEY
});

async function uploadImage(file) {
  const fileMetadata = {
    name: file.name,
    parents: [FOLDER_ID]
  };

  const media = {
    mimeType: mime.getType(file.name),
    body: file
  };

  try {
    const response = drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    });

    return {response: true, fileId: response.data.id};
  } catch (error) {
    console.error('Error uploading file:', error);
    return {response: false, fileId: ''}
  }
}
