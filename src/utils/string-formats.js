const uploadUrl = import.meta.env.VITE_UPLOAD_URL

export const capitalize = (string) => string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);

export const renderUpload = (fullPath) => {
     return `${uploadUrl}/${fullPath}`
}