import dotenv from 'dotenv'
dotenv.config()
import { exec } from 'child_process'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from "url";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import mime from 'mime-types'


const client = new S3Client({
    forcePathStyle: true,
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
})

const PROJECT_ID = process.env.PROJECT_ID;
const BUCKET_NAME = process.env.BUCKET_NAME;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const init = async () => {
    console.log("Deploying Project....");

    const outputDir = path.join(__dirname, "output");

    const p = exec(`cd ${outputDir} && npm install && npm run build`)

    p.stdout.on('data', (data) => {
        console.log("Building Project: ", data.toString());
    })

    p.stdout.on('error', (data) => {
        console.log("Error: ", data.toString());

    })

    p.on('close', async () => {
        console.log("Build Completed");
        const distFolder = path.join(__dirname, "output", "build")
        const distFolderContents = fs.readdirSync(distFolder, {
            recursive: true
        });
        for (const file of distFolderContents) {
            const filePath = path.join(distFolder, file)
            if (fs.lstatSync(filePath).isDirectory()) continue;

            const command = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: `__outputs/${PROJECT_ID}/${file.replace(/\\/g, '/')}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })

            await client.send(command)
            console.log('uploaded', filePath)
        }
    })

}

init();