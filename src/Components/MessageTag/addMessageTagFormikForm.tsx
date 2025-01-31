import * as Yup from "yup";
import {STRINGS} from "../../utils/STRINGS.ts";
// eslint-disable-next-line react-hooks/rules-of-hooks

const checkboxOptions = [
    {key: 'HTML', value: 'html'},
    {key: 'CSS', value: 'css'},
    {key: 'JavaScript', value: 'javascript'}
]

const validationSchemaAddUser = Yup.object({
    // email: Yup.string().email('Invalid email format').required('Required'),

    name: Yup.string().required(STRINGS.REQUIRED),
    // course: Yup.string().required('Required'),
    // courseDate: Yup.date().required('Required').nullable()

})


const isActiveRadioOptions = [
    {key: 'فعال', value: '1'},
    {key: 'غیر فعال', value: '0'},
]
const formikFormAddMessageTag = [
    {control: 'input' , name:'name', label: 'نام نمایشی تگ پیام' , options: null},
    {control: 'input' , name:'messageTagCode', label: ' کد عددی تگ ترتیب ' , options: null},
    {control: 'input' , name:'description', label: 'توضیحات تگ ' , options: null},
    {control: 'color' , name:'colorCode', label: 'رنگ تگ انتخابی ' , options: isActiveRadioOptions},
    {control: 'radio' , name:'isActive', label: 'فعال باشه یا نه؟ ' , options: isActiveRadioOptions},
]

export {
    checkboxOptions,
    validationSchemaAddUser,
    formikFormAddMessageTag
}