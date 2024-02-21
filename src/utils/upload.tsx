import { AxiosInstance, AxiosResponse } from 'axios';
interface UploadOptions {
    axiosPrivateFormData: AxiosInstance;
    url: string;
    myFormData: FormData;
    key: string;
}

// Adjust the return type based on your backend response
type UploadResponse = AxiosResponse<any> | null;

export const upload = async ({
                                 axiosPrivateFormData,
                                 url,
                                 myFormData,
                                 key,
                             }: UploadOptions): Promise<UploadResponse> => {
    try {
        const response = await axiosPrivateFormData.post(url, myFormData);

        if (response.status === 200) {
            console.log(`${key} upload successful`, response.data);
            return response; // Assuming the backend returns data including an ID or file reference
        } else {
            console.log(`${key} upload failed`, response);
            return null;
        }
    } catch (error) {
        console.error(`Error uploading ${key}:`, error);
        return null;
    }
};


export async function uploadFileUtil(file: string | Blob, key: string , axiosPrivateFormData : AxiosInstance) {
    const myFormData = new FormData();
    // myFormData.append(key, file);
    myFormData.append("singleFile", file);
    myFormData.append("tag", key);


    return await upload({axiosPrivateFormData, url: "/upload", myFormData, key})

    try {
        const response = await axiosPrivateFormData.post("/upload", myFormData,);

        if (response.status === 200) {
            console.log(`${key} upload successful`, response.data);
            return response; // Assuming the backend returns data including an ID or file reference
        } else {
            console.log(`${key} upload failed`, response);
            return null;
        }
    } catch (error) {
        console.error(`Error uploading ${key}:`, error);
        return null;
    }
}
