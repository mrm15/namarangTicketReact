import {useEffect, useState} from "react";

export const ColorInputElement = (props) => {
    const {field, form, ...rest} = props


    const [realod, setRealod] = useState(1)
    useEffect(() => {


    }, [form?.values[field?.name]]);


    const handleChange = (e) => {
        const value = e.target.value;
        form.setFieldValue(field.name, value)
    }

    return <>
        <input
            key={realod}
            type="color"
            {...field} // Automatically hooks up inputs to Formik
            {...rest}
            onChange={handleChange}/>
        <div className={'flex'}>
            <div>کد رنگ انتخابی:</div>
            <div className={'ltr font-mono'}>  {field.value === '' ? 'خالی' : field?.value?.toUpperCase()}</div>

        </div>
    </>;
};
