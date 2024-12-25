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

const isActiveRadioOptions = [
    {key: 'بله', value: 'true'},
    {key: 'خیر', value: 'false'},
]
const formikFormAddDepartment = [

    {control: 'input' , name:'name', label: 'نام وضعیت تیکت' , options: null},
    {control: 'input' , name:'statusCode', label: 'statusCode*' , options: null},
    {control: 'input' , name:'description', label: 'توضیحات' , options: null},
    {control: 'color' , name:'colorCode', label: 'رنگ وضعیت انتخابی' , options: isActiveRadioOptions},
    {control: 'radio' , name:'isActive', label: 'وضعیت در سایت قابل انتخاب؟ ' , options: isActiveRadioOptions},
    {control: 'input' , name:'order', label: 'شماره ترتیب ' , options: null},
    {control: 'radio' , name:'isFinal', label: 'استاتوس نهایی؟' , options: isActiveRadioOptions},

]

export {
    checkboxOptions,
    validationSchemaAddUser,
    formikFormAddDepartment
}