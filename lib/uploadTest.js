require('dotenv').config()
// Require File System
const fs = require('fs')
// Require AWS SDK
const AWS = require('aws-sdk')
// Set AWS region
AWS.config.update({ region: 'us-east-1' })
// Create S3 Object instance
const s3 = new AWS.S3()

console.log('s3', s3)

const imageRemoteName = `catImage_${new Date().getTime()}.png`

// Access command line arguments to get file path
const fildPath = process.argv[2]
// Define bucket based on environment variable
const bucketName = process.env.BUCKET_NAME

console.log('bucketName', bucketName)

// Read the file first
fs.readFile(fildPath, (err, filedata) => {
  if (err) throw err

  console.log('filedata', filedata)
  // Create param object for s3 upload
  const params = {
    Bucket: bucketName,
    // Key: 'folder/something1',
    Key: imageRemoteName,
    Body: filedata,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  }

  // Upload to s3
  s3.upload(params, (err, s3data) => {
    if (err) throw err

    console.log('s3data', s3data)
  })
})
