import {Form, Formik} from 'formik'
import FormikControl from './FormikControl'
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
// import "./styles.scss" //  i import it in the App.css  cz lazy load need this style //@import "Components/MyFormik/styles.scss";
import {Id, toast} from "react-toastify";
import useAxiosPrivateFormData from "../../hooks/useAxiosPrivateFormData.tsx";
import {uploadFileUtil} from "../../utils/upload.tsx";


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



    const onSubmit = async (values, {resetForm}) => {

        debugger
        console.log('Form data', values);

        let toastId: Id
        try {
            const newValues = await handleIfThereIsUploadFiles(values)

            toastId = toast.loading('در حال ارسال اطلاعات...')
            const response = await myPrivateAxios.post("" + requestUrl, newValues); // Ensure you pass the values to your API call
            toast.dismiss(toastId)


            if (response.status === 200) { // Check for a successful response status
                toast.success(response?.data?.message)
                toast.success('عملیات با موفقیت انجام شد.')

                resetForm(); // Reset the form after successful submission
                !!afterSubmit && afterSubmit()

            } else {
                toast.error(response?.data?.message)
                toast.error('عملیات شکت خورد.')
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
                                        // control={row.control}
                                        // label={row.label}
                                        // name={row.name}
                                        // options={row?.options}
                                        // isShow={row?.isShow}
                                        {...row}
                                    />
                                })}
                            </div>


                            <div className={'w-full text-center mt-8'}>
                                <button
                                    type={'submit'}
                                    className={'btn-submit-mir'}
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
