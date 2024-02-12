import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

import FormDatePicker from "../MyDatePicker";
import {FileInput} from "./FileInput.tsx";
import {ColorInputElement} from "./ColorInputElement.tsx";

function InputColor (props) {
    const { label, name, ...rest } = props

    try {
        return (
            <div className='div__group__input_select'>
                <label htmlFor={name}>{label}</label>
                <Field
                    name={name}
                    component={ColorInputElement}
                />
                <ErrorMessage component={TextError} name={name} />
            </div>
        )
    }catch (error){
        return <>{error?.toString()}</>
    }
}

export default InputColor
