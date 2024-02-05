import {useEffect, useState} from "react";

export const FileInput = (props) => {
    const {field, form, ...rest} = props

    console.log(props);

    const [realod, setRealod] = useState(1)
    useEffect(() => {
        if (!(form?.values[field?.name] instanceof File)) {
            setRealod(realod+1)
        }

    }, [form?.values[field?.name]]);


    const handleChange = (e) => {


        const files = e.target.files;
        let myFiles = Array.from(files)
        myFiles = myFiles[0]
        // Use the name attribute of the field to update its value
        // form.setFieldValue(field.name, myFiles.length > 0 ? myFiles : '')
        form.setFieldValue(field.name, myFiles)
    }

    return <input key={realod} type="file" {...rest} onChange={handleChange}/>;
};
