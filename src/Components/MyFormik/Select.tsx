import React from 'react'
import {Field, ErrorMessage} from 'formik'
import TextError from './TextError'

function Select(props) {
    const {label, name, options, ...rest} = props
    try {
        return (
            <div className='div__group__input_select'>
                <label htmlFor={name}>{label}</label>
                <Field as='select' id={name} name={name} {...rest}>
                    {options?.map(option => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.key}
                            </option>
                        )
                    })}
                </Field>
                <ErrorMessage component={TextError} name={name}/>
            </div>
        )
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default Select
