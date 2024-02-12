import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input (props) {

    const { label, name,disabled, ...rest } = props
  return (
    <div className='div__group__input_select'>
      <label htmlFor={name}>{label}</label>
      <Field  id={name} name={name} {...rest} disabled={disabled} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Input
