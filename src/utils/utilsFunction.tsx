import numeric from "./NumericFunction.tsx";
import moment from 'moment-jalaali';

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
    let blob = new Blob([content], {type: contentType});
    let url = URL.createObjectURL(blob);

    // Create a link to download it
    let pom = document.createElement('a');
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

export const getCurrentDate = () => {
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        // The 'calendar' option is not included here as it's not standard in all environments
    });

    let formattedDate = formatter.format(currentDate);

    formattedDate = formattedDate.replaceAll('/', '-');
    // Assuming numeric.p2e is a function to convert Persian numbers to English
    formattedDate = numeric.p2e(formattedDate);

    return formattedDate || '';
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
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export const dateFromHesabfaToTimeStamp = (dateString: string) => {
    // Split the date and time components
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    // Create a new Date object using the parsed components
    const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    // Get the timestamp in milliseconds
    return (date.getTime()/1000) + "";
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




