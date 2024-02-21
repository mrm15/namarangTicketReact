import * as Yup from "yup";
import {STRINGS} from "../../utils/STRINGS.ts";
// eslint-disable-next-line react-hooks/rules-of-hooks

const checkboxOptions = {key: 'تعیین وضعیت', value: "1"}


const validationSchemaAddUser = Yup.object({
    // email: Yup.string().email('Invalid email format').required('Required'),

    name: Yup.string().required(STRINGS.REQUIRED),
    // course: Yup.string().required('Required'),
    // courseDate: Yup.date().required('Required').nullable()

})


const AddFilesFormikForm = [
    {control :'input' ,    name:'id' , label:'id',  },
    {control :'input' , name:'fileName' , label:'fileName',  },
    {control :'input' , name:'fileType' , label:'fileType',  },
    {control :'input' , name:'fileSize' , label:'fileSize',  },
    {control :'input' , name:'userId' , label:'userId',  },
    {control :'input' , name:'uploadDate' , label:'uploadDate',  },
    {control :'input' , name:'filePath' , label:'filePath',  },
    {control :'input' , name:'description' , label:'description',  },
    {control :'input' , name:'tag' , label:'tag',  },
    {control :'input' , name:'downloadCount' , label:'downloadCount',  },
    {control :'input' , name:'createAt' , label:'createAt',  },
    {control :'input' , name:'updateAt' , label:'updateAt',  },
]

export {
    checkboxOptions,
    validationSchemaAddUser,
    AddFilesFormikForm
}