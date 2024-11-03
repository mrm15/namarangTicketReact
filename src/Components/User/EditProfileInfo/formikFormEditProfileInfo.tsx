import * as Yup from "yup";
import {STRINGS} from "../../../utils/STRINGS";



const validationSchemaAddUser = Yup.object({
    // email: Yup.string().email('Invalid email format').required('Required'),

    phoneNumber: Yup.string().required(STRINGS.REQUIRED),
    // course: Yup.string().required('Required'),
    // courseDate: Yup.date().required('Required').nullable()

})
const dropdownOptions = [
    {key: 'Select your course', value: ''},
    {key: 'React', value: 'react'},
    {key: 'Angular', value: 'angular'},
    {key: 'Vue', value: 'vue'}
]

const formikFormEditProfileInfo = [

    {control: 'input', name: 'phoneNumber', label: 'شماره تماس اجباری منحصر ب فرد',
        disabled:true
    },
    {control: 'input', name: 'nationalCode', label: 'کد ملی',
        disabled:true
    },
    {control: 'input', name: 'userName', label: 'نام کاربری',},
    // {control: 'input', name: 'accountingCode', label: 'کد حسابداری',},
    {control: 'input', name: 'company', label: 'شرکت',},
    {control: 'input', name: 'title', label: 'عنوان',},
    {control: 'input', name: 'name', label: 'نام',},
    {control: 'input', name: 'familyName', label: 'نام خانوادگی',},
    {control: 'input', name: 'middleName', label: 'نام نمایشی',},
    {control: 'input', name: 'mobile', label: 'شماره موبایل',},
    {control: 'input', name: 'fax', label: 'فکس',},
    {control: 'input', name: 'phoneNumber1', label: 'شماره تماس اول',},
    {control: 'input', name: 'phoneNumber2', label: 'شماره تماس دوم',},
    {control: 'input', name: 'phoneNumber3', label: 'شماره تماس سوم',},
    {control: 'input', name: 'email', label: 'ایمیل',},
    {control: 'input', name: 'website', label: 'وب سایت',},
    {control: 'input', name: 'bankName', label: 'نام بانک',},
    {control: 'input', name: 'accountNumber', label: 'شماره حساب بانکی',},
    {control: 'input', name: 'cardNumber', label: 'شماره کارت',},
    {control: 'input', name: 'SHABA_Number', label: 'شماره شبا',},
    {control: 'input', name: 'economicCodeCompany', label: 'کد اقتصادی',},
    {control: 'input', name: 'nationalCodeCompany', label: 'شناسه ملی شرکت',},
    {control: 'input', name: 'registerNumberCompany', label: 'شماره ثبت شرکت',},
    {control: 'input', name: 'description', label: 'توضیحات',},
    {control: 'textarea', name: 'address', label: 'آدرس',},
    {control: 'input', name: 'country', label: 'کشور',},
    {control: 'input', name: 'province', label: 'استان',},
    {control: 'input', name: 'city', label: 'شهر',},
    {control: 'file', name: 'profilePictureUrl', label: ' تغییر عکس پروفایل',},
    {control: 'input', name: 'postalCode', label: 'کد پستی',},


]

export {
    validationSchemaAddUser,
    formikFormEditProfileInfo
}