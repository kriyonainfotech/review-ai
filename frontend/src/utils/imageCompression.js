import imageCompression from 'browser-image-compression';

export const compressImage = async (file) => {
    const options = {
        maxSizeMB: 1, // Max size 1MB
        maxWidthOrHeight: 1920, // Max dimensions 1920px
        useWebWorker: true,
    };

    try {
        console.log(`Original size: ${file.size / 1024 / 1024} MB`);
        const compressedFile = await imageCompression(file, options);
        console.log(`Compressed size: ${compressedFile.size / 1024 / 1024} MB`);
        return compressedFile;
    } catch (error) {
        console.error("Image compression error:", error);
        return file; // Return original file if compression fails
    }
};
