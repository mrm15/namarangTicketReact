import React, {useContext} from 'react';
import {TableGContext} from "../../../TableGContext";

const CheckBoxCell = ({cellInfo}) => {
    // console.log("CheckBoxCell Rendered")

    const context = useContext(TableGContext);
    const {myData, setMyData} = context;

    const columnDef = cellInfo?.column?.columnDef
    const uniqId = columnDef.uniqId
    const currentIdValue = cellInfo?.row?.original[uniqId]
    const currentRow = cellInfo?.row?.original

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {



        const checked = e.target.checked
        if (checked) {

            // look is this object In Array?
            const isThereInArray = myData.checkedItems.some(row => row[uniqId] === currentIdValue)

            if (isThereInArray) {
                return
            }
            const currentCheckedItems = [...myData.checkedItems, currentRow]
            setMyData({checkedItems: currentCheckedItems})
        } else {
            const newItemArray = myData.checkedItems.filter(row => row[uniqId] !== currentIdValue)

            setMyData({checkedItems: newItemArray})
        }

    }



    const isCheck = myData.checkedItems.find(row => row[uniqId] === currentIdValue)


    return (
        <div className={"text-center"}>
            <input
                type="checkbox"
                   checked={!!isCheck}
                   onChange={handleChange}
            />
        </div>
    )
};
export default CheckBoxCell