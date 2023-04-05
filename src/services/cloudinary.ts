import { environment } from '../lib/environment';

export async function uploadCloudinaryFile(base64: string) {
  const formData = new FormData();
  formData.append('file', base64);
  formData.append('api_key', environment.CLOUDINARY_API_KEY);
  formData.append('upload_preset', 'ml_default');

  const requestOptions = {
    method: 'POST',
    body: formData,
  };

  return fetch(
    `https://api.cloudinary.com/v1_1/${environment.CLOUDINARY_CLOUD_NAME}/image/upload`,
    requestOptions
  )
    .then((res) => res.json())
    .then((res: { url: string }) => res.url);
}
