import {useEffect, useState} from "react";

export const FileInput = (props) => {
    const {field, form, ...rest} = props


    const [realod, setRealod] = useState(1)
    useEffect(() => {
        if (!(form?.values[field?.name] instanceof File)) {
            setRealod(realod + 1)
        }

    }, [form?.values[field?.name]]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {


        const files = e.target.files;
        const myFiles = Array.from(files)

        // Use the name attribute of the field to update its value
        // form.setFieldValue(field.name, myFiles.length > 0 ? myFiles : '')
        form.setFieldValue(field.name, myFiles[0])
    }

    return <input key={realod} type="file" {...rest} onChange={handleChange}/>;
};
