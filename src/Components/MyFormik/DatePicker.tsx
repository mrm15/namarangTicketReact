import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

import FormDatePicker from "../MyDatePicker";

function DatePicker (props) {
  const { label, name, ...rest } = props

    try {
        return (
            <div className='div__group__input_select'>
                <label htmlFor={name}>{label}</label>
                <Field name={name}>
                    {({ form, field }) => {
                        const { setFieldValue } = form
                        const { value } = field
                        return (
                            <>
                                <FormDatePicker
                                    id={name}
                                    {...field}
                                    {...rest}
                                    value={value}
                                    onChange={val => setFieldValue(name, val)}
                                />
                                {/*<DateView*/}
                                {/*    id={name}*/}
                                {/*    {...field}*/}
                                {/*    {...rest}*/}
                                {/*    selected={value}*/}
                                {/*    onChange={val => setFieldValue(name, val)}*/}
                                {/*/>*/}
                            </>
                        )
                    }}
                </Field>
                <ErrorMessage component={TextError} name={name} />
            </div>
        )
    }catch (error){
      return <>{error?.toString()}</>
    }
}

export default DatePicker
