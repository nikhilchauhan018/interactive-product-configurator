export class UploadService {
  async processUpload(fileData: any) {
    const name = fileData.name || fileData.fileName || 'upload.png';
    const rawType = fileData.type || fileData.mimeType || 'image/png';
    const type = rawType.toLowerCase();
    const base64 = fileData.base64 || fileData.base64Data || fileData.dataUrl || '';
    const size = fileData.size || fileData.fileSize || 0;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(type)) {
      throw new Error(`Invalid file type: ${type}. Supported formats: PNG, JPG, WebP, SVG.`);
    }

    const maxSize = 15 * 1024 * 1024;
    if (size > maxSize) {
      throw new Error('File exceeds maximum upload size of 15MB.');
    }

    // In local/mock service, return formatted data URI or object URL
    const url = base64.startsWith('data:')
      ? base64
      : `data:${type};base64,${base64}`;

    return {
      success: true,
      url,
      fileName: name,
      fileType: type,
      sizeBytes: size,
      uploadedAt: new Date().toISOString(),
    };
  }
}

export const uploadService = new UploadService();
