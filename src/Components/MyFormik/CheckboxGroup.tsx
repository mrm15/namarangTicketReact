import {Field, ErrorMessage} from 'formik'
import TextError from './TextError'

function CheckboxGroup(props) {
    const {label, name, options, ...rest} = props
    try {
        return (
            <div className='div__group__input_select '>
                <label>{label}</label>
                <Field name={name}>
                    {({field}) => {
                        return options?.map(option => {

                            try {
                                return (
                                    <div className={'flex mt-2 checkbox__formik'} key={option?.key}>

                                        <div className={''}>

                                            <input

                                                type='checkbox'
                                                id={option?.value}
                                                {...field}
                                                {...rest}
                                                value={option?.value}
                                                checked={field?.value?.includes(option?.value)}
                                            />
                                            <label htmlFor={option?.value}>{option?.key} </label>

                                        </div>

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

export default CheckboxGroup
