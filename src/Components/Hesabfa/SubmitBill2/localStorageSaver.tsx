// Define a common interface for bill input data.
interface BillInput {
    title: string;
    billId: string;
    invoiceItems: any[];
}

// Extend the input with a timestamp for storage purposes.
interface InitialData extends BillInput {
    timeStamp: Date;
}

const invoiceItemsSaverId = "invoiceItemsSaverNamarang";
const numberOfSaveBills = 90;

/**
 * Retrieves the saved bills from local storage.
 * @returns An array of InitialData objects.
 */
export const getSavedBills = (): InitialData[] => {
    const data = localStorage.getItem(invoiceItemsSaverId);
    if (!data) return [];

    try {
        const parsedBills = JSON.parse(data);
        // Convert the saved timestamp strings back to Date objects
        return parsedBills.map((bill: any) => ({
            ...bill,
            timeStamp: new Date(bill.timeStamp)
        }));
    } catch (error) {
        console.error("Error parsing saved bills:", error);
        return [];
    }
};

/**
 * Saves the given bills array to local storage.
 * @param bills - The array of bills to save.
 */
const saveBills = (bills: InitialData[]): void => {
    localStorage.setItem(invoiceItemsSaverId, JSON.stringify(bills));
};

/**
 * Adds a new bill or updates an existing one based on billId.
 * Also sorts the bills by timestamp (newest first) and trims the array if needed.
 * @param bills - Current array of bills.
 * @param billData - The bill data containing title, billId, and invoiceItems.
 * @returns The updated array of bills.
 */
const updateBill = (
    bills: InitialData[],
    billData: BillInput
): InitialData[] => {

    const { title, billId, invoiceItems } = billData;
    const now = new Date();
    const billIndex = bills.findIndex(bill => bill.billId === billId);

    if (billIndex !== -1) {
        // Update the existing bill entry
        bills[billIndex] = {
            ...bills[billIndex],
            title,
            timeStamp: now,
            invoiceItems,
        };
    } else {
        // Add a new bill entry
        bills.push({
            ...billData,
            timeStamp: now,
        });
    }

    // Sort bills by timestamp in descending order (newest first)
    bills.sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime());

    // If the array exceeds the allowed number of saved bills, remove the oldest ones
    while (bills.length > numberOfSaveBills) {
        bills.pop();
    }

    return bills;
};

/**
 * The pure function to handle saving invoice items.
 * It retrieves existing bills, updates/adds the current bill, sorts and saves back.
 * @param billData - An object containing title, billId, and invoiceItems.
 */
export const localStorageSaver = (billData: BillInput): boolean => {
    if (billData.invoiceItems?.length) {
        // Get current saved bills from local storage
        let bills = getSavedBills();

        // Update the bill array with the current invoice data
        bills = updateBill(bills, billData);

        // Save the updated bills array back to local storage
        saveBills(bills);
        return true
    }
    return false;
};
