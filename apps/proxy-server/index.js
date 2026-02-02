require('dotenv').config();
const express = require("express");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const mime = require("mime-types");
const app = express();
const PORT = 8000;

const s3Client = new S3Client({
    forcePathStyle: true,
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
});

const BUCKET_NAME = process.env.BUCKET_NAME;

app.use(async (req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
    const filePath = req.path === '/' ? '/index.html' : req.path;
    const key = `__outputs/${subdomain}${filePath}`;
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key
        });
        const data = await s3Client.send(command);
        const contentType = mime.lookup(key) || 'application/octet-stream';
        res.set('Content-Type', contentType);
        data.Body.pipe(res);
    } catch (error) {
        console.error(`Error ${key}:`, error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Proxy Server Running on Port ${PORT}`);
});