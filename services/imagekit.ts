import axios from 'axios';

const IMAGEKIT_PUBLIC_KEY = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || 'public_C+eb90mUDk9SaKV/4otCfze+N+g=';
const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/samfabrics';

interface UploadResponse {
  url: string;
  fileId?: string;
  name?: string;
}

// Upload image via backend API
export const uploadImage = async (base64Image: string, folder: string = 'products'): Promise<string> => {
  try {
    const response = await axios.post<UploadResponse>('/api/upload', {
      image: base64Image,
      folder,
    });
    return response.data.url;
  } catch (error) {
    console.error('ImageKit upload error:', error);
    throw new Error('Failed to upload image');
  }
};

// Upload multiple images
export const uploadImages = async (base64Images: string[], folder: string = 'products'): Promise<string[]> => {
  const uploadPromises = base64Images.map(img => uploadImage(img, folder));
  return Promise.all(uploadPromises);
};

// Convert File to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Upload file directly (combines fileToBase64 + uploadImage)
export const uploadFile = async (file: File, folder: string = 'products'): Promise<string> => {
  const base64 = await fileToBase64(file);
  return uploadImage(base64, folder);
};

// Upload multiple files
export const uploadFiles = async (files: File[], folder: string = 'products'): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadFile(file, folder));
  return Promise.all(uploadPromises);
};

export const imagekitConfig = {
  publicKey: IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
};
