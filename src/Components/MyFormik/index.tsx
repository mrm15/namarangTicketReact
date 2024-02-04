import {Formik, Form} from 'formik'
import FormikControl from './FormikControl'
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import "./styles.scss"
import {toast} from "react-toastify";
import {axiosPrivateFormData} from "../../api/axios.tsx";
import useAxiosPrivateFormData from "../../hooks/useAxiosPrivateFormData.tsx";


function MyComponent({formikForm, initialValues, validationSchema, afterSubmit, requestUrl}) {


    const myPrivateAxios = useAxiosPrivate()
    const axiosPrivateFormData = useAxiosPrivateFormData()

    const handleIfThereIsUploadFiles = async (val) => {
        let values = {...val}


        const uploadResults = {};

        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                const value = values[key];

                // Check if the value is an instance of File
                if (value instanceof File) {

                    console.log(`Uploading file for key: ${key}`);
                    const tId = toast.loading('در حال بارگزاری فایل...')
                    const result = await uploadFile(value, key);
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
                    debugger
                    uploadResults[key] = [];
                    for (const file of value) {
                        console.log(`Uploading file for key: ${key}`);
                        const tId = toast.loading('در حال بارگزاری فایل...')
                        const result = await uploadFile(file, key);
                        toast.dismiss(tId)
                        debugger
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

    async function uploadFile(file, key) {
        const myFormData = new FormData();
        // myFormData.append(key, file);
        myFormData.append("singleFile", file);
        myFormData.append("tag", key);


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


    const onSubmit = async (values, {resetForm}) => {

        debugger
        console.log('Form data', values);

        try {

            const newValues = await handleIfThereIsUploadFiles(values)

            const toastId = toast.loading('در حال ارسال اطلاعات...')
            const response = await myPrivateAxios.post("" + requestUrl, newValues); // Ensure you pass the values to your API call


            toast.dismiss(toastId)
            if (response.status === 200) { // Check for a successful response status
                console.log('Submission Successful', response.data);
                resetForm(); // Reset the form after successful submission
                !!afterSubmit && afterSubmit()

            } else {
                console.log('Submission Failed', response);
                // Handle unsuccessful submission if needed
            }
        } catch (error) {
            console.error('Submission error', error);
            // Handle submission error if needed
        }

    }


    try {
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {formik => {
                    return (
                        <Form>
                            <div className={'flex flex-wrap gap-6'}>
                                {formikForm?.map((row, index) => {
                                    return <FormikControl
                                        key={index}
                                        control={row.control}
                                        label={row.label}
                                        name={row.name}
                                        options={row?.options}
                                        isShow={row?.isShow}
                                    />
                                })}
                            </div>


                            <div className={'w-full text-center mt-8'}>
                                <button
                                    type={'submit'}
                                    className={'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded hover:cursor-pointer'}
                                    // disabled={!formik.isValid}
                                >

                                    &nbsp;
                                    &nbsp;
                                    ثبت
                                    &nbsp;
                                    &nbsp;
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        )
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default MyComponent
