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






    {control: 'input' , name:'name', label: 'نام دپارتمان' , options: null},
    {control: 'input' , name:'description', label: 'توضیحات' , options: null},
    {control: 'select' , name:'managerUserId', label: 'مدیر دپارتمان' , options: null},
    {control: 'select' , name:'parentDepartmentId', label: 'دپارتمان والد' , options: null},
    {control: 'input' , name:'location', label: 'لوکیشن' , options: null},
    {control: 'textarea' , name:'address', label: 'آدرس' , options: null},
    {control: 'input' , name:'phoneNumber', label: 'شماره تماس' , options: null},
    {control: 'input' , name:'emailAddress', label: 'ایمیل' , options: null},
    {control: 'input' , name:'contactInfo', label: 'اطلاعات تماس' , options: null},
    {control: 'color' , name:'departmentTaskColor', label: 'رنگ تسک' , options: isActiveRadioOptions},
    {control: 'radio' , name:'departmentAccessToSendTicket', label: 'ارسال  تیکت توسط دپارتمان' , options: isActiveRadioOptions},
    {control: 'radio' , name:'departmentAccessToReplyTicket', label: 'ارسال پاسخ به تیکت های موجود' , options: isActiveRadioOptions},
    {control: 'radio' , name:'departmentAccessToArchiveTicket', label: 'دسترسی به تیکت آرشیو' , options: isActiveRadioOptions},
    {control: 'radio' , name:'departmentAccessToTaskSection', label: 'دسترسی به تسک' , options: isActiveRadioOptions},
    {control: 'radio' , name:'departmentAccessToArchiveTasks', label: 'آرشیو تسک ها' , options: isActiveRadioOptions},
    {control: 'radio' , name:'accessToSameDepartmentToAssignTask', label: 'ایجاد تسک برای همدپارتمانی ها' , options: isActiveRadioOptions},
    {control: 'radio' , name:'accessToOtherUsersToAssignTask', label: 'ایجاد تسک برای همه' , options: isActiveRadioOptions},
    {control: 'radio' , name:'sendSmsAfterSubmitResponse', label: 'ارسال پیامک بعد از تیکت ریپلای' , options: isActiveRadioOptions},
    {control: 'textarea' , name:'smsText', label: 'متن پیامک' , options: null},


]

export {
    checkboxOptions,
    validationSchemaAddUser,
    formikFormAddDepartment
}