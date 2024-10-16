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
/****
import {useState} from "react";
import DatePicker, {DateObject} from "react-multi-date-picker";

//gregorian calendar & locale
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";

//persian calendar & locale
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

//arabic calendar & locale
import arabic from "react-date-object/calendars/arabic";
import arabic_fa from "react-date-object/locales/arabic_fa";

//indian calendar & locale
import indian from "react-date-object/calendars/indian";
import indian_fa from "react-date-object/locales/indian_fa";


export default function MyDatePicker2() {
    const [state, setState] = useState<any>({format: "MM/DD/YYYY"})

    const convert = (date, format = state.format) => {
        const object = {date, format}

        setState({
            gregorian: new DateObject(object).convert(gregorian, gregorian_fa).format(),
            persian: new DateObject(object).format(),
            arabic: new DateObject(object).convert(arabic, arabic_fa).format(),
            indian: new DateObject(object).convert(indian, indian_fa).format(),
            jsDate: date.toDate(),
            ...object
        })
    }

    const Span = ({children}) => <span style={{fontWeight: "bold"}}>{children}</span>

    return (
        <div className={"m-16"}>
            <div>
                <div>
                    <Span>کلیک کنید: </Span>
                    <DatePicker
                        value={state.date}
                        onChange={convert}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                    />
                </div>
                <div>
                    <Span>فرمت: </Span>
                    <select
                        value={state.format}
                        onChange={e => {
                            debugger
                            convert(state.date, e.target.value)
                        }}
                        className="select"
                    >
                        <option>MM/DD/YYYY</option>
                        <option>DD-MM-YYYY</option>
                        <option>YYYY,MM,DD</option>
                        <option>dddd DD MMMM YYYY</option>
                        <option>ddd MMM DD YYYY HH:mm:ss</option>
                        <option>MMM/DD/YYYY hh:mm:ss a</option>
                        <option>MMM/DD/YYYY HH:mm:ss</option>
                    </select>
                </div>
                <div>
                    <Span>میلادی: </Span>
                    <span>{state.gregorian}</span>
                </div>
                <div>
                    <Span>هجری شمسی: </Span>
                    <span>{state.persian}</span>
                </div>
                <div>
                    <Span>هجری قمری: </Span>
                    <span>{state.arabic}</span>
                </div>
                <div>
                    <Span>هندی: </Span>
                    <span>{state.indian}</span>
                </div>
                <div>
                    <Span>تاریخ جاوااسکریپت: </Span>
                    <span>{state.jsDate?.toString?.()}</span>
                </div>
            </div>
        </div>
    )
}
*/
