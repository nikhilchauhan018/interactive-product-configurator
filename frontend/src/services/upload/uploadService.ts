import { apiRequest } from '../api/apiClient.js';

export interface UploadResult {
  success: boolean;
  url: string;
  fileName: string;
  fileType: string;
  sizeBytes: number;
  uploadedAt: string;
}

export async function uploadImageFile(file: File): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const res = await apiRequest<UploadResult>('/api/uploads', {
          method: 'POST',
          body: JSON.stringify({
            name: file.name,
            type: file.type,
            size: file.size,
            base64,
          }),
        });
        resolve(res);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file on client.'));
    reader.readAsDataURL(file);
  });
}
