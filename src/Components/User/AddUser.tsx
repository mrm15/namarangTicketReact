import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface IUser {
    userName: string;
    email: string;
    // Add an array to represent the checkboxes
    roles?: string;
    // ... other fields
}

interface UserFormProps {
    isEditMode: boolean;
    userId?: string;
}

const UserForm: React.FC<UserFormProps> = ({ isEditMode, userId }) => {
    const [initialValues, setInitialValues] = useState<IUser>({
        userName: '',
        email: '',
        role:'',
        // ...other default values
    });

    const handleSubmit = (values: IUser, { setSubmitting }: FormikHelpers<IUser>) => {

        debugger
        if (isEditMode && userId) {
            // axios.put(`/api/users/${userId}`, values)
            //     .then(/* handle success */)
            //     .catch(/* handle error */);
        } else {
            // axios.post('/api/users', values)
            //     .then(/* handle success */)
            //     .catch(/* handle error */);
        }
        setSubmitting(false);
    };

    const userSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        // Validate roles as an array
        roles: Yup.string().required('U'),
        // ...other validations
    })


    // Define your checkbox options
    const myHotForm= [
        {label:'myLabel' ,name:'name', type:'text' , value:'' ,placehodler:'myplace',checked:undefined},
        {label:'myLabel2' ,name:'name2', type:'text2' , value:'' ,placehodler:'myplace2',checked:undefined}
    ];

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form dir={'rtl'}>
                    {/* Other fields... */}

                    <div>
                        {myHotForm.map((row,index) => (
                            <label key={index}>
                                <Field
                                    type={row.type}
                                    name={row.name}
                                    placehodler={row.placehodler}

                                />
                                {row.label}
                            </label>
                        ))}
                    </div>

                    <button type="submit">
                        {isEditMode ? 'Update' : 'Add'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default UserForm;
