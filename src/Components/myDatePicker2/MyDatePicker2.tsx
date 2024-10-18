import React, {useEffect, useRef, useState} from "react";
import DatePicker, {DateObject} from "react-multi-date-picker";
// gregorian calendar & locale
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";
// persian calendar & locale
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import {dateObjectToIso8601, isMobileDevice} from "../../utils/utilsFunction";
import {IoCloseCircleOutline} from "react-icons/io5";
import gregorian_en from "react-date-object/locales/gregorian_en";
import {p2e} from "../../utils/NumericFunction.tsx";


interface ConvertedDates {
    jsDate: Date;
    jsDateZeroTime: Date;
    persian: string;
    hesabfaFormatDate: string,
    gregorian_fa: string,
    gregorian_en: string,
    persian_enDigits: string,
    // [key: string]: any; // For additional dynamic keys if needed
}

interface MyDatePicker2Props {
    value: DateObject | null;
    onChange: (dates: ConvertedDates | null) => void;
    className?: string;
    placeholder?: string;
}

export default function MyDatePicker2(props: MyDatePicker2Props) {
    const {
        value = null, // default value is null
        onChange = (x) => console.log(x),
        placeholder = "تاریخ",
    } = props;

    let {className = ""} = props;

    // Local state for managing the value of the date picker
    const [selectedDate, setSelectedDate] = useState<DateObject | null>(value)

    // Ref to close the calendar on keydown
    const datePickerRef = useRef<any>(null);
    const onChangeNullObject = {
        hesabfaFormatDate: null,
        jsDate: null,
        jsDateZeroTime: null,
        gregorian_en: null,
        gregorian_fa: null,
        persian: null,
        persian_enDigits: null,
    }
    const setValue = (dateObjectInput: DateObject | null): void => {

        if (!dateObjectInput) {
            onChange(onChangeNullObject);
            setSelectedDate(null); // Clear the date by setting it to null
            return;
        }


        // Original jsDate retains its original time
        const jsDate: Date = new Date(dateObjectInput.toDate()); // Use a new instance to keep original time

        // Format the DateObject to keep the original time
        const gregorian_en1 = new DateObject(dateObjectInput).convert(gregorian, gregorian_en).format("YYYY-MM-DDTHH:mm:ss"); // Maintain original time
        const gregorian_fa1 = new DateObject(dateObjectInput).convert(gregorian, gregorian_fa).format("YYYY-MM-DDTHH:mm:ss"); // Maintain original time

        // Create a new Date instance for zeroed time
        const jsDateZeroTime: Date = new Date(dateObjectInput.toDate());
        jsDateZeroTime.setHours(0, 0, 0, 0); // Set hours to 0 for the zero time version


        // Convert to ISO 8601 with zero time
        const temp123 = new DateObject(jsDateZeroTime)
        const hesabfaFormatDate = dateObjectToIso8601(temp123); // Use zero time for this format

        const persian1 = new DateObject(dateObjectInput).format();
        const persian_enDigits = p2e(persian1);


        const temp: ConvertedDates = {
            jsDate,
            jsDateZeroTime,
            hesabfaFormatDate,
            gregorian_en: gregorian_en1,
            gregorian_fa: gregorian_fa1,
            persian: persian1,
            persian_enDigits,
        };

        onChange(temp); // Pass the converted date object to the parent onChange
        setSelectedDate(dateObjectInput); // Update local state with the selected date
    };

    const clearDate = () => {
        setSelectedDate(null); // Clear the state to remove the date
        onChange(onChangeNullObject); // Notify parent component that the date has been cleared
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.keyCode === 9 && datePickerRef.current) {
                datePickerRef.current.closeCalendar();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // If the user is on mobile, add mobile-specific class
    if (isMobileDevice()) {
        className += " rmdp-mobile";
    }

    return (
        <div style={{direction: "rtl"}}
             className={"flex"}
        >
            <DatePicker
                value={selectedDate} // Controlled value via state
                onChange={setValue} // Handle change with setValue
                className={className}
                ref={datePickerRef} // Use ref to close the calendar with "Tab"
                calendar={persian}
                placeholder={placeholder}
                locale={persian_fa}
                calendarPosition="bottom-right"
                hideOnScroll
            />
            <button onClick={clearDate}>
                <IoCloseCircleOutline/>
            </button>
            {/* Button to clear date */}
        </div>
    );
}
