#!/usr/bin/env node

/**
 * Download all images from R2 site-assets/ to local media/ folder
 */

const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function downloadAll() {
  const list = await client.send(new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME,
    Prefix: 'site-assets/',
  }));

  const mediaDir = path.join(__dirname, '..', 'media');
  if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir);

  console.log(`Found ${list.Contents?.length || 0} files in R2...`);

  for (const obj of list.Contents || []) {
    const filename = path.basename(obj.Key);
    if (!filename) continue;

    const localPath = path.join(mediaDir, filename);

    // Skip if already exists locally
    if (fs.existsSync(localPath)) {
      console.log('Skipped (exists):', filename);
      continue;
    }

    const response = await client.send(new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: obj.Key,
    }));

    const chunks = [];
    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }

    fs.writeFileSync(localPath, Buffer.concat(chunks));
    console.log('Downloaded:', filename);
  }

  console.log('Done!');
}

downloadAll().catch(console.error);
