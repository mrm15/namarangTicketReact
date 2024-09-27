import React, {useContext} from 'react';
import {randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";
import {TableGContext} from "../../../TableGContext.tsx";

const CheckBoxHeader = ({info}) => {

    console.log("CheckBoxHeader Rendered")
    const context = useContext(TableGContext);
    const {myData, setMyData} = context;
    //console.log(myData)
    const columnDef = info.column.columnDef
    const handleClickCheckBoxInHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;

        // اینجا باید توی آرایه نگاه کنیم ببینیم اگه اون مورد توی آرایه ی آیتم بود که حذفش کنیم تا مقدار جدید رو بریزیم توی آرایه
        // در واقع باید چکد آیتم رو فیلتر کنم و اگه یکی از تیبل دیتا توش بود حذفش کنم
        const tempCheckedItems = myData.checkedItems.filter(row=>{
            const tempId = row[uniqId]
            const result =myData.tableData.find(rrow=>rrow[uniqId]===tempId);
            // خب اگه پیدا کردی باید بگی شرمنده نمیخوام بیاد توی تمپ
            return !result
        })

        console.log(tempCheckedItems)


        // شاید کاربر زده باشه صفحه ی بعدی و بخواد مقادیر جدید رو وارد کنه پس باید مقادیر قبلی که توی آرایه بودن رو نگه داریم
        setMyData({
            checkedItems: (isChecked
                ? [...tempCheckedItems, ...myData.tableData] // Merge existing checked items and new table data
                : []),

        })
    }
    // اینجا میگم  اگه توی اون آبجکت  تایپ سلکت رو گذاشته بودی پس منم اینجا  چک باکس رو توی هدر نوشن میدم و دیگه به هیچی توجه نمیکنم که هدر بزارم یا هر چیزی فقط یه چک باکس میزارم
    // نکته مهم این که من جدولم جوریه که  صفحه عوض میشه دوباره درخواست میزنه ولی ری اکت تیبل  توی عوض شدن صفحه همون چک باکس ها رو نگه میداره
    // واسه همین من اینو خودم نوشتم که کاربرم بتونه توی چند صفحه چک بزنه
    // روی چک زدن چک باکس هم  همه دیتا رو میریزم توی آرایه

    const uniqId = columnDef.uniqId
    const showCheckBoxInHeader = (columnDef.type === "select")
    // && header.column.columnDef.showCheckBoxInHeader !== false ||
    // header.column.columnDef.type === "select"
    // && header.column.columnDef.showCheckBoxInHeader === undefined ||
    // header.column.columnDef.type === "select"
    // && header.column.columnDef.showCheckBoxInHeader === true
    // آیا باید هدر رو چک بزنم؟ در صورتی که همه ی اون دیتایی که نمایش داده میشه توی اون آرایه ای که دارم دیتا رو نگه میدارم باشه
    const checkedIds: any[] = myData.checkedItems.map(item => item[uniqId])


    const isCheckedInHeader = checkedIds.length > 0 && myData.tableData.every(row => checkedIds.includes(row[uniqId]));


    return (
        <div>
            <input type="checkbox"
                   checked={isCheckedInHeader}
                   onChange={handleClickCheckBoxInHeader}
            />
        </div>
    )
};

export default CheckBoxHeader;
