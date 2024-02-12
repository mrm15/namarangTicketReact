import React from 'react'
import {Field, ErrorMessage} from 'formik'
import TextError from './TextError'

function RadioButtons(props) {
    const {label, name, options, ...rest} = props
    try {
        return (
            <div className='div__group__input_select flex gap-4 border-2 rounded'>
                <label>{label}</label>
                <Field name={name}>
                    {({field}) => {
                        return options?.map(option => {
                            try{
                                return (
                                    <div className={'mt-3'} key={option?.key}>
                                        <input
                                            type='radio'
                                            id={name + option.key}
                                            {...field}
                                            {...rest}
                                            value={option.value}
                                            checked={field.value === option.value}
                                        />
                                        <label htmlFor={name + option.key} className={'mx-2'}>{option.key}</label>
                                    </div>
                                )
                            }catch (error){
                                return <>{error.toString()}</>
                            }
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
