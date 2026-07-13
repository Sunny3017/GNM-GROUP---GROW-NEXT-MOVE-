import axios from 'axios';

// Note: In a production app, you should use ImageKit's SDK or a secure server-side upload.
// For this project, we'll implement a simple upload to ImageKit via their API.
// You need to provide your ImageKit Public Key and URL Endpoint.

const IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

export const uploadImage = async (file, publicKey) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("publicKey", publicKey);
    // Note: Authentication for client-side upload usually requires a signature from your backend.
    // For simplicity in this build, we'll assume the backend handles the heavy lifting or 
    // we use a simplified upload approach.
    
    // HOWEVER, for a cleaner MERN approach, we should send the file to our BACKEND 
    // and let the backend upload it to ImageKit. This is more secure.
    
    const adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
    
    const backendFormData = new FormData();
    backendFormData.append('image', file);

    try {
        const { data } = await axios.post('/api/properties/upload', backendFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${adminInfo.token}`
            }
        });
        return data; // Should return { url, fileId }
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
};
