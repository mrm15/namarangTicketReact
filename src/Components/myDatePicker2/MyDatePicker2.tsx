import React, {useState} from "react"
import DatePicker, {DateObject} from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

const date = new DateObject({calendar: persian, locale: persian_fa})

console.log(date.format()) //۱۴۰۰/۰۴/۱۳
console.log(date.month.name) //تیر

export default function MyDatePicker2() {
    const newDate = new DateObject()
    debugger
    const [value, setValue] = useState(new DateObject())

    debugger
    return (
        <div className={"m-16"} style={{direction: "rtl"}}>
            <DatePicker
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={value}
                onChange={setValue}
            />
        </div>
    )
}
