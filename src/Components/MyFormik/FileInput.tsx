
export const FileInput = ({ field, form, ...rest }) => {
    const handleChange = (e) => {


        const files = e.target.files;
        let myFiles = Array.from(files)
        myFiles = myFiles[0]
        // Use the name attribute of the field to update its value
        // form.setFieldValue(field.name, myFiles.length > 0 ? myFiles : '')
        form.setFieldValue(field.name, myFiles)
    }

    return <input type="file" {...rest} onChange={handleChange} />;
};
