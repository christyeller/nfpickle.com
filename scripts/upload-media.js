#!/usr/bin/env node

/**
 * Upload all images from attachments/ folder to Cloudflare R2
 * Run manually: node scripts/upload-attachments.js
 * Or automatically via pre-commit hook
 */

const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const MEDIA_DIR = path.join(__dirname, '..', 'media');
const UPLOADED_LOG = path.join(MEDIA_DIR, '.uploaded');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];

// MIME types
const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
};

async function main() {
  // Check if media folder exists
  if (!fs.existsSync(MEDIA_DIR)) {
    console.log('No media folder found. Nothing to upload.');
    return;
  }

  // Check R2 configuration
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL } = process.env;

  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    console.log('R2 not configured. Skipping upload.');
    return;
  }

  // Initialize S3 client
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });

  // Load previously uploaded files
  let uploadedFiles = new Set();
  if (fs.existsSync(UPLOADED_LOG)) {
    const content = fs.readFileSync(UPLOADED_LOG, 'utf-8');
    uploadedFiles = new Set(content.split('\n').filter(Boolean));
  }

  // Get all image files in media folder
  const files = fs.readdirSync(MEDIA_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext) && !file.startsWith('.');
  });

  if (files.length === 0) {
    console.log('No images found in media folder.');
    return;
  }

  // Filter out already uploaded files
  const newFiles = files.filter(file => !uploadedFiles.has(file));

  if (newFiles.length === 0) {
    console.log('All images already uploaded.');
    return;
  }

  console.log(`Found ${newFiles.length} new image(s) to upload...`);

  const newlyUploaded = [];

  for (const file of newFiles) {
    const filePath = path.join(MEDIA_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const key = `site-assets/${file}`;

    try {
      const fileBuffer = fs.readFileSync(filePath);

      await client.send(new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
      }));

      const url = `${R2_PUBLIC_URL}/${key}`;
      console.log(`✓ Uploaded: ${file}`);
      console.log(`  URL: ${url}`);

      newlyUploaded.push(file);
    } catch (error) {
      console.error(`✗ Failed to upload ${file}:`, error.message);
    }
  }

  // Update uploaded log
  if (newlyUploaded.length > 0) {
    const allUploaded = [...uploadedFiles, ...newlyUploaded];
    fs.writeFileSync(UPLOADED_LOG, allUploaded.join('\n'));
    console.log(`\n${newlyUploaded.length} image(s) uploaded successfully.`);
  }
}

main().catch(console.error);
