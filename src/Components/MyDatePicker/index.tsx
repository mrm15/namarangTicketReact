import {useEffect, useRef} from 'react';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import numeric from "../../utils/NumericFunction";

interface propType {
    value: any;
    onChange: any;
    className?:string;
}

const FormDatePicker = (props: propType) => {

    const {value, onChange,className} = props

    const dateCal = useRef<HTMLInputElement>(null); // Specify the expected type for clarity

    useEffect(() => {


        const handleKeyDown = (event) => {
            if (event?.keyCode === 9) {
                (dateCal.current as any).closeCalendar();
            }
        };

        dateCal?.current?.addEventListener("keydown", handleKeyDown);
        // dateCal?.current?.addEventListener("focusout", handleBlur);

        // Cleanup function
        return () => {
            dateCal?.current?.removeEventListener("keydown", handleKeyDown);
            // dateCal?.current?.removeEventListener("focusout", handleBlur);

        };
    }, [dateCal]);


    return (<div>
        <DatePicker
            ref={dateCal}

            onChange={(date) => {


                if (date) {
                    const newValue = numeric.p2e(date.toLocaleString())
                    onChange(newValue)

                    // تاریخ رو همینجا ولیدیت میکنم چون آن بلر اینجا فایر نمیشه
                    // changeValueHandler(id, 'errorMessage', '')

                } else {
                    onChange('')


                }
            }}
            calendar={persian}
            placeholder="تاریخ"
            locale={persian_fa}
            value={value}
            className={className}

            calendarPosition="bottom-right"
            hideOnScroll


        />
    </div>);
};

export default FormDatePicker;
