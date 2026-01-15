import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3'

// Lazy initialization of R2 client
let r2Client: S3Client | null = null

function getR2Client(): S3Client {
  if (!r2Client) {
    const accountId = process.env.R2_ACCOUNT_ID
    const accessKeyId = process.env.R2_ACCESS_KEY_ID
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY

    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'R2 configuration missing. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY environment variables.'
      )
    }

    r2Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  }
  return r2Client
}

function getBucketName(): string {
  const bucket = process.env.R2_BUCKET_NAME
  if (!bucket) {
    throw new Error('R2_BUCKET_NAME environment variable is not set.')
  }
  return bucket
}

function getPublicUrl(): string {
  const url = process.env.R2_PUBLIC_URL
  if (!url) {
    throw new Error('R2_PUBLIC_URL environment variable is not set.')
  }
  return url
}

/**
 * Upload a file to Cloudflare R2
 */
export async function uploadToR2(
  file: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const client = getR2Client()
  const bucket = getBucketName()

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: contentType,
  })

  await client.send(command)

  return getR2PublicUrl(key)
}

/**
 * Delete a file from Cloudflare R2
 */
export async function deleteFromR2(key: string): Promise<void> {
  const client = getR2Client()
  const bucket = getBucketName()

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  await client.send(command)
}

/**
 * List objects in R2 with a given prefix
 */
export async function listR2Objects(prefix: string): Promise<string[]> {
  const client = getR2Client()
  const bucket = getBucketName()

  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
  })

  const response = await client.send(command)
  return response.Contents?.map((obj) => obj.Key || '') || []
}

/**
 * Generate a public URL for an R2 object
 */
export function getR2PublicUrl(key: string): string {
  return `${getPublicUrl()}/${key}`
}

/**
 * Get the R2 key from a folder and filename
 */
export function getR2Key(folder: string, filename: string): string {
  return `media/${folder}/${filename}`
}

/**
 * Generate a unique filename based on timestamp and random string
 */
export function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalFilename.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}
