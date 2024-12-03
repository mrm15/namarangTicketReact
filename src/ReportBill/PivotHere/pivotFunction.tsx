export const calculatePivot = ({filterTextForPivot, totalData, myKey, sumKey, countKey,}) => {
    // Filter rows that contain any of the keywords in filterTextForPivot
    const rowsArrayWithSpecificWord = totalData.filter((row) => {
        // Check if any of the keywords are included in the myKey field of the row
        return filterTextForPivot.some((singleWord) => row[myKey].includes(singleWord));
    }).map((row) => {
        // Return only the specified keys
        return {
            [myKey]: row[myKey],
            [sumKey]: row[sumKey],
            [countKey]: row[countKey],
            myItemCode:row.myItemCode,
            rowHolder: {...row}
        };
    });


    // Reduce the filtered rows to unique values with summed counts and sums
    const result = rowsArrayWithSpecificWord.reduce((acc, row) => {
        const existingRow = acc.find(item => item[myKey] === row[myKey])
        if (existingRow) {
            existingRow["counter"] += 1;
            existingRow[sumKey] += row[sumKey];
            existingRow[countKey] += row[countKey];
            existingRow.myItemCode = row.myItemCode;
            existingRow["rowData"].push(row.rowHolder)
        } else {
            acc.push({
                [myKey]: row[myKey],
                [sumKey]: row[sumKey],
                [countKey]: row[countKey],
                counter: 1,
                myItemCode:row.myItemCode,
                rowData : [{...row.rowHolder}],
            });
        }

        return acc;
    }, []);


    return result;
};
