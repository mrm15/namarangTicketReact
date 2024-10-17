import {AxiosInstance, AxiosResponse} from 'axios';
import {Id, toast} from "react-toastify";

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
        debugger
        const response = await axiosPrivateFormData.post(url, myFormData);


        if (response.status === 200) {
            console.log(`${key} upload successful`, response.data);
            return response; // Assuming the backend returns data including an ID or file reference
        } else {
            console.log(`${key} upload failed`, response);
            return null;
        }
    } catch (error) {
        toast("خطا در بارگزاری فایل")
        console.error(`Error uploading ${key}:`, error);
        return null;
    }
};


export async function uploadFileUtil(file: string | Blob, key: string, axiosPrivateFormData: AxiosInstance) {
    debugger
    const myFormData = new FormData();
    // myFormData.append(key, file);
    myFormData.append("singleFile", file);

    myFormData.append("tag", key);

    const resultOfHere = await upload({axiosPrivateFormData, url: "/upload", myFormData, key})
    debugger
    return resultOfHere
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


interface IhandleIfThereIsUploadFiles {
    axiosPrivateFormData: AxiosInstance;
    val: File | File[];
    tag: string;
}

