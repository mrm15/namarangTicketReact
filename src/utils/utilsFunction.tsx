import numeric from "./NumericFunction.tsx";
import moment from 'moment-jalaali';
import jalaali from 'jalaali-js';

/*********************************************/
import DateObject from "react-date-object"; // Import DateObject
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en"; // Import Gregorian calendar

export const dateObjectToIso8601 = (dateObject: DateObject | null): string | null => {
    if (!dateObject) {
        return null; // Return null if the dateObject is not provided
    }

    // Convert the dateObject to Gregorian to ensure it's using the correct calendar
    // Format the DateObject to ISO 8601 string using English digits

    return dateObject.convert(gregorian, gregorian_en).format("YYYY-MM-DDTHH:mm:ss"); // Return the formatted string
};



/*********************************************/

const stringToArray = (str: string): string[] => {
    return str.split("------");
};

const removeComma = (str: string | number): string => {
    if (!str) {
        return "";
    }

    if (typeof str === "string") {
        if (typeof str.replaceAll === "function") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
            return str.replaceAll(",", "");
        } else {
            return str.replace(/,/g, "");
        }
    } else {
        return str.toString().replace(/,/g, "");
    }

};
export const isFloat = (n) => Number(n) === n && n % 1 !== 0;
export const formatFloat = (value) => (isFloat(value) ? value?.toFixed(2) : value);


export const randomNumberGenerator = (): number => Math.random() * 10000000000;

const utilsFunction = {

    stringToArray,
    removeComma,
    randomNumberGenerator,
};

export default utilsFunction;

export const addRowIdtoTable = (t) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const table = [...t]
    const newTable = table?.map((v, index) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const row = {...v}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        row.RowId = index + 1

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return row
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return newTable

}


const downloadBlob = (content, filename, contentType) => {
    // Create a blob
    const blob = new Blob([content], {type: contentType});
    const url = URL.createObjectURL(blob);

    // Create a link to download it
    const pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}


export const makeReadyToDownloadFile = (arrayObjects, fileName, suffix = "") => {
    let str = '';
    arrayObjects.forEach(row => {

        const {
            firstName,
            lastName,
            phoneNumber,
            email
        } = row

        str = str + `
BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${lastName}  
TEL;TYPE=HOME,VOICE:${phoneNumber}
EMAIL;TYPE=PREF,INTERNET:${email}
END:VCARD
        `;
        //str = str + '\n';

    })


    suffix && (fileName += "." + suffix)
    downloadBlob(str, fileName, 'text/csv;charset=utf-8;')
}

export const getCurrentDate = (timeString = false) => {
    const currentDate = new Date();
    let formatter = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        // The 'calendar' option is not included here as it's not standard in all environments
    });

    if (timeString) {
        formatter = new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }


    let formattedDate = formatter.format(currentDate);

    formattedDate = formattedDate.replaceAll('/', '-');
    // Assuming numeric.p2e is a function to convert Persian numbers to English
    formattedDate = numeric.p2e(formattedDate);

    return formattedDate || '';
};

export const getCurrentDateWithZeroHours = (): DateObject => {
    const rightNow = new Date();
    rightNow.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000
    return new DateObject(rightNow); // Convert and return as DateObject
};

export const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
}
export const bytesToMegabytes = (bytes) => {
    return bytes / (1024 * 1024);
}
export const timestampToTimeFromHesabfa = (TimeStampDate: number | Date | string | undefined): string => {
    try {
        // Check if the input is undefined
        if (TimeStampDate === undefined) {
            throw new Error("Input date is undefined");
        }

        // Parse input into a Date object if it's a string or number
        let dateObject: Date;
        if (typeof TimeStampDate === 'string' || typeof TimeStampDate === 'number') {
            dateObject = new Date(TimeStampDate);
        } else {
            dateObject = TimeStampDate;
        }

        // Check if the date object is valid
        if (isNaN(dateObject.getTime())) {
            throw new Error("Invalid date");
        }

        // Format the date using the Persian calendar
        const formatter = new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Tehran'
        });

        return formatter.format(dateObject);
    } catch (error) {
        return `Error: ${error?.toString()}`;
    }
};
export const persianDateToTimestamp = (persianDate: string): number | string => {
    try {
        // Parse the Persian date
        const gregorianDate = moment(persianDate, 'jYYYY/jMM/jDD').toDate();

        // Check if the date object is valid
        if (isNaN(gregorianDate.getTime())) {
            throw new Error("Invalid Persian date");
        }

        // Return timestamp
        return gregorianDate.getTime();
    } catch (error) {
        return `Error: ${error?.toString()}`;
    }
};
export const timestampToFormattedDateToSendHesabfa = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);

    // IRST is UTC + 3:30
    const offsetMinutes = 3 * 60 + 30;

    // Get the time in milliseconds and adjust for IRST
    const localTime = date.getTime() + offsetMinutes * 60 * 1000;
    const irDate = new Date(localTime);

    const year = irDate.getUTCFullYear();
    const month = String(irDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(irDate.getUTCDate()).padStart(2, '0');

    const hours = String(irDate.getUTCHours()).padStart(2, '0');
    const minutes = String(irDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(irDate.getUTCSeconds()).padStart(2, '0');
    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${day} ${"00"}:${"00"}:${"00"}`;
}
export const dateFromHesabfaToTimeStamp = (dateString: string) => {
    // Split the date and time components
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    // Create a new Date object using the parsed components
    const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    // Get the timestamp in milliseconds
    return (date.getTime() / 1000) + "";
}
export const formattedNumber = (number: { toLocaleString: () => any; }) => number.toLocaleString(); // "1,234,567,890"

export const formatNumber = (value) => {
    if (typeof value !== 'number') {
        value = +value
    }
    if (isNaN(value)) {
        return 0
    }
    const newValueNumber = +value
    const newValueNumberSeperated = newValueNumber.toLocaleString()
    // const persianFormat = numeric.e2p(newValueNumberSeperated) + ""

    // const temp = newValueNumberSeperated.replaceAll(".","/")


    return newValueNumberSeperated
}

export const HesabfaTimeStampWithTToPersianTime = (isoString) => {
    if (!isoString) {
        throw new Error('Invalid ISO string');
    }

    // Parse the ISO string to a Date object
    const date = new Date(isoString);

    // Convert to Iran time (UTC+3:30)
    const IRAN_TIME_OFFSET = 3.5 * 60 * 60 * 1000; // 3.5 hours in milliseconds
    const iranTime = new Date(date.getTime() + IRAN_TIME_OFFSET);

    // Helper function to convert Gregorian date to Persian date
    const toPersianDate = (gregorianDate) => {
        const gYear = gregorianDate.getFullYear();
        const gMonth = gregorianDate.getMonth() + 1; // getMonth() is zero-based
        const gDay = gregorianDate.getDate();

        const gDM = [31, (gYear % 4 === 0 && gYear % 100 !== 0) || gYear % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const jDM = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

        let jy, jm, jd;
        let gy = gYear - 1600;
        let gm = gMonth - 1;
        let gd = gDay - 1;

        let gDayNo = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

        for (let i = 0; i < gm; ++i)
            gDayNo += gDM[i];
        gDayNo += gd;

        let jDayNo = gDayNo - 79;

        let jNp = Math.floor(jDayNo / 12053);
        jDayNo %= 12053;

        jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);

        jDayNo %= 1461;

        if (jDayNo >= 366) {
            jy += Math.floor((jDayNo - 1) / 365);
            jDayNo = (jDayNo - 1) % 365;
        }

        let i;
        for (i = 0; i < 11 && jDayNo >= jDM[i]; ++i) {
            jDayNo -= jDM[i];
        }

        jm = i + 1;
        jd = jDayNo + 1;

        return {jy, jm, jd};
    };

    const persianDate = toPersianDate(iranTime);
    return `${persianDate.jy}/${String(persianDate.jm).padStart(2, '0')}/${String(persianDate.jd).padStart(2, '0')}`;
};

export const formatDateForBackend = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00`;
};

export const convertPersianDateToTimestamp = (persianDate) => {
    // Split the date string into parts
    const [year, month, day] = persianDate.split('/').map(Number);

    // Convert the Persian date to Gregorian
    const {gy, gm, gd} = jalaali.toGregorian(year, month, day);

    // Create a new Date object using the Gregorian date
    const gregorianDate = new Date(gy, gm - 1, gd);

    // Get the timestamp
    return gregorianDate.getTime();
}
export const isMobileDevice = () => {

    const result = (
        typeof window !== "undefined" &&
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(
            window.navigator.userAgent
        )
    );
    console.log(result)
    return result

}







