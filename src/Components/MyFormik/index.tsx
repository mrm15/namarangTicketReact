import {Formik, Form} from 'formik'
import FormikControl from './FormikControl'
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import "./styles.scss"


function MyComponent({formikForm, initialValues, validationSchema, afterSubmit , requestUrl}) {


    const myPrivateAxios = useAxiosPrivate()

    debugger
    const onSubmit =async(values, {resetForm}) => {
        console.log(values)
        debugger
        // @ts-ignore
        console.log('Form data', values);
        try {
            const response =  await myPrivateAxios.post(""+ requestUrl, values); // Ensure you pass the values to your API call
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
