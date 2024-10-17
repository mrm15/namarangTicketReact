import {Formik, Form} from 'formik'
import FormikControl from './FormikControl'
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";


function EnrollmentForm({formikForm, initialValues, validationSchema, afterSubmit}) {


    const myPrivateAxios = useAxiosPrivate()

    // ///////////////////////////////////////////
    const onSubmit = async (values, {resetForm}) => {
        try {
            const response = await myPrivateAxios.post("/user/add", values); // Ensure you pass the values to your API call
            if (response.status === 200) { // Check for a successful response status
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
    };


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
                            {formikForm?.map((row, index) => {
                                return <FormikControl
                                    key={index}
                                    control={row.control}
                                    label={row.label}
                                    name={row.name}
                                    options={row?.options}
                                />


                            })}


                            <button type='submit' disabled={!formik.isValid}>
                                Submit
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

export default EnrollmentForm
