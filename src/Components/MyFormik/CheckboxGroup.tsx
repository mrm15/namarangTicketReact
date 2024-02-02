import React from 'react'
import {Field, ErrorMessage} from 'formik'
import TextError from './TextError'

function CheckboxGroup(props) {
    const {label, name, options, ...rest} = props
    try {
        return (
            <div className='div__group__input_select select-none'>
                <label>{label}</label>
                <Field name={name}>
                    {({field}) => {
                        return options?.map(option => {

                            return (
                                <div className={'flex mt-2'} key={option.key}>

                                    <div className={'flex '}>
                                        <label htmlFor={option.value}>{option.key} </label>
                                        <input

                                            type='checkbox'
                                            id={option.value}
                                            {...field}
                                            {...rest}
                                            value={option.value}
                                            checked={field.value.includes(option.value)}
                                        />

                                    </div>

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

export default CheckboxGroup
