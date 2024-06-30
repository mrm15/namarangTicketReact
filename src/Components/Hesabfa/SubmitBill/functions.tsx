export const calculateSumOfEachRow = (newInvoiceItems) => {

    // جمع هر سطر رو اینجا حساب میکنیم
    const temp = newInvoiceItems.map(t => {
        const row = {...t}
        row.sum = row.UnitPrice * row.Quantity
        return  row;
    })


    return temp
}