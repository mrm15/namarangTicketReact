import React from 'react'
import {Field, ErrorMessage} from 'formik'
import TextError from './TextError'

function RadioButtons(props) {
    const {label, name, options, ...rest} = props
    try {
        return (
            <div className='div__group__input_select'>
                <label>{label}</label>
                <Field name={name}>
                    {({field}) => {
                        return options.map(option => {
                            return (
                                <div className={'mt-3'} key={option.key}>
                                    <input
                                        type='radio'
                                        id={option.value}
                                        {...field}
                                        {...rest}
                                        value={option.value}
                                        checked={field.value === option.value}
                                    />
                                    <label htmlFor={option.value}>{option.key}</label>
                                </div>
                            )
                        })
                    }}
                </Field>
                <ErrorMessage component={TextError} name={name}/>
            </div>
        )
    } catch (error) {
        return <>{error.toString()}</>
    }
}

export default RadioButtons
