import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

import FormDatePicker from "../MyDatePicker";
import {FileInput} from "./FileInput.tsx";

function FileUpload (props) {
    const { label, name, allowedExtensions, ...rest } = props;
    const acceptExtensions = allowedExtensions?.join(', ');
    try {
        return (
            <div className='div__group__input_select'>
                <label htmlFor={name}>{label}</label>
                <Field
                    name={name}
                    type={'file'}
                    // multiple={true}
                    accept={acceptExtensions} // Only allow specified file types
                    component={FileInput}

                />
                <ErrorMessage component={TextError} name={name} />
            </div>
        )
    }catch (error){
        return <>{error?.toString()}</>
    }
}

export default FileUpload
