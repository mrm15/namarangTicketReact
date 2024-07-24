import {randomNumberGenerator} from "../utils/utilsFunction.tsx";

interface inputTypes {
    tableData: any[];
    currentPageNumber: number;
    totalRowsInPage: number;
}

export const makeRowIdBasedOnPageNumber = ({
                                               tableData, currentPageNumber,
                                               totalRowsInPage
                                           }) => {
    const table = [...tableData]
    // const startIndex = (totalRowsInPage * currentPageNumber) - totalRowsInPage
    const startIndex = totalRowsInPage * (currentPageNumber - 1)
    table.forEach((row, index) => {
        row.RowId = startIndex + index + 1
    })
    return table
}