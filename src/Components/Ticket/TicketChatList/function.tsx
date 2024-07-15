export const isAPhoto = (fileName: string) => {
    const photoExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff', '.svg'];
    const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();
    return photoExtensions.includes(extension);
}
