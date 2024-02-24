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


export async function uploadFileUtil(file: string | Blob, key: string, axiosPrivateFormData: AxiosInstance) {

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


interface IhandleIfThereIsUploadFiles {
    axiosPrivateFormData: AxiosInstance;
    val: File | File[];
    tag: string;
}

export const handleIfThereIsUploadFiles = async ({val, axiosPrivateFormData,tag}: IhandleIfThereIsUploadFiles) => {
    let values = {...val}


    const uploadResults = {};

    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            const value = values[key];

            // Check if the value is an instance of File
            if (value instanceof File) {

                console.log(`Uploading file for key: ${key}`);
                const tId: Id = toast.loading('در حال بارگزاری فایل...')
                const result = await uploadFileUtil(value, key, axiosPrivateFormData);
                toast.dismiss(tId)
                if (result.status === 200) {
                    debugger
                    // Store the upload result or file ID
                    toast.success(result.data.message)
                    uploadResults[key] = result.data.id;
                } else {
                    toast.error('آپلود فایل شکست خورد')
                    throw new Error('آپلود فایل شکست خورد')
                }
            }
                // If the value is an array of files, iterate and upload each file
            // فعلا این قسمت توسعه داده نشده و هیچ بک اندی نداره.
            else if (Array.isArray(value) && value.every(item => item instanceof File)) {

                uploadResults[key] = [];
                for (const file of value) {
                    console.log(`Uploading file for key: ${key}`);
                    const tId = toast.loading('در حال بارگزاری فایل...')
                    const result = await uploadFileUtil(file, key, axiosPrivateFormData);
                    toast.dismiss(tId)

                    if (result?.status === 200) {
                        // Store the upload result or file ID
                        uploadResults[key].push(result);
                    } else {
                        toast.error('آپلود فایل شکست خورد')
                        throw new Error('آپلود فایل شکست خورد')
                    }


                }
            }
        }
    }


    for (const key in uploadResults) {

        values[key] = uploadResults[key]

    }

    return values


}
