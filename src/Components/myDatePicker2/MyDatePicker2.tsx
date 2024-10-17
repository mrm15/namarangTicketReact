import React, { useEffect, useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
// gregorian calendar & locale
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_fa from "react-date-object/locales/gregorian_fa";
// persian calendar & locale
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { isMobileDevice } from "../../utils/utilsFunction";
import { IoCloseCircleOutline } from "react-icons/io5";


interface ConvertedDates {
    jsDate: Date;
    jsDateZeroTime: Date;
    gregorian: string;
    persian: string;
    [key: string]: any; // For additional dynamic keys if needed
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

    let { className = "" } = props;

    // Local state for managing the value of the date picker
    const [selectedDate, setSelectedDate] = useState<DateObject | null>(value)

    // Ref to close the calendar on keydown
    const datePickerRef = useRef<any>(null);

    const setValue = (dateObjectInput: DateObject | null): void => {
        if (!dateObjectInput) {
            onChange({
                jsDate: null,
                jsDateZeroTime: null,
                gregorian: null,
                persian: null,
            });
            setSelectedDate(null); // Clear the date by setting it to null
            return;
        }

        const jsDate: Date = dateObjectInput.toDate();
        const jsDateZeroTime: Date = new Date(jsDate.setHours(0, 0, 0, 0));

        const temp: ConvertedDates = {
            jsDate,
            jsDateZeroTime,
            gregorian: new DateObject(dateObjectInput)
                .convert(gregorian, gregorian_fa)
                .format(),
            persian: new DateObject(dateObjectInput).format(),
        };

        onChange(temp); // Pass the converted date object to the parent onChange
        setSelectedDate(dateObjectInput); // Update local state with the selected date
    };

    const clearDate = () => {
        setSelectedDate(null); // Clear the state to remove the date
        onChange(null); // Notify parent component that the date has been cleared
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
        <div style={{ direction: "rtl" }}
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
                <IoCloseCircleOutline />
            </button> {/* Button to clear date */}
        </div>
    );
}
