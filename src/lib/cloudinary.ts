import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

// Transformation presets
export const transformations = {
  thumbnail: 'c_fill,w_200,h_200,q_auto,f_auto',
  medium: 'c_fill,w_600,h_400,q_auto,f_auto',
  large: 'c_limit,w_1920,h_1920,q_auto:good,f_auto',
}

// Build Cloudinary URL with transformation
export function buildCloudinaryUrl(
  publicId: string,
  transformation: keyof typeof transformations = 'medium'
): string {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations[transformation]}/${publicId}`
}

// Upload image to Cloudinary
export async function uploadToCloudinary(
  file: Buffer | string,
  options: {
    folder?: string
    public_id?: string
    tags?: string[]
  } = {}
) {
  try {
    const result = await cloudinary.uploader.upload(file as string, {
      folder: options.folder || 'nfp/pages',
      public_id: options.public_id,
      tags: options.tags || ['nfp-website'],
      resource_type: 'auto',
    })

    return {
      cloudinaryId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload image to Cloudinary')
  }
}

// Delete image from Cloudinary
export async function deleteFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete image from Cloudinary')
  }
}

// Get image details from Cloudinary
export async function getCloudinaryResource(publicId: string) {
  try {
    const result = await cloudinary.api.resource(publicId)
    return result
  } catch (error) {
    console.error('Cloudinary fetch error:', error)
    throw new Error('Failed to fetch image from Cloudinary')
  }
}
