import * as Yup from "yup";
import {STRINGS} from "../../../utils/STRINGS.ts";
// eslint-disable-next-line react-hooks/rules-of-hooks

const checkboxOptions = [
    {key: 'HTML', value: 'html'},
    {key: 'CSS', value: 'css'},
    {key: 'JavaScript', value: 'javascript'}
]

const validationSchemaAddCustomer = Yup.object({

    phoneNumber: Yup.string().required(STRINGS.REQUIRED),
    name: Yup.string().required(STRINGS.REQUIRED),
    province: Yup.string().required(STRINGS.REQUIRED),
    city: Yup.string().required(STRINGS.REQUIRED),

})
const formikFormAddCustomer = [

    {control: 'input', name: 'phoneNumber', label: 'شماره تماس اجباری منحصر ب فرد',},
    {control: 'input', name: 'nationalCode', label: 'کد ملی',},
    {control: 'input', name: 'company', label: 'شرکت',},
    {control: 'input', name: 'name', label: 'نام',},
    {control: 'input', name: 'familyName', label: 'نام خانوداگی',},
    {control: 'input', name: 'mobile', label: 'شماره موبایل دومی',},
    {control: 'input', name: 'accountNumber', label: 'شماره حساب بانکی',},
    {control: 'input', name: 'description', label: 'توضیحات',},
    {control: 'textarea', name:  'address', label: 'آدرس',},
    {control: 'input', name: 'country', label: 'کشور',},
    {control: 'input', name: 'province', label: 'استان',},
    {control: 'input', name: 'city', label: 'شهر',},
    {control: 'input', name: 'postalCode', label: 'کد پستی',},


]

export {
    checkboxOptions,
    validationSchemaAddCustomer,
    formikFormAddCustomer
}