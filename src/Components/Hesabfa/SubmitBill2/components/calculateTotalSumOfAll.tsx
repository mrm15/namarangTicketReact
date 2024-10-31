import { IInvoice, IInvoiceItem, IOther } from "../initialDataTypes";

const calculateTotalSumOfAll = (invoice: IInvoice): number => {
    let totalSum = 0;

    try {
        const myInvoiceItems: IInvoiceItem[] = invoice.InvoiceItems ?? [];

        if (myInvoiceItems.length > 0) {
            // Sum up each row's total in the invoice items
            const sum1 = myInvoiceItems.reduce((acc: number, item: IInvoiceItem) => acc + (item.sum || 0), 0);

            // Adjust the total sum based on additional or subtractive items in Others

            const sum2 = (invoice.Others ?? []).reduce((acc: number, other: IOther) => {
                const amount = other.Amount || 0;
                return other.Add ? acc + amount : acc - amount;
            }, totalSum);


            totalSum = sum1 + sum2;
        }

    } catch (error) {
        console.error(error);
    }

    return totalSum;
};

export default calculateTotalSumOfAll;
