import {filterOfDataTypeObject} from "../../../myTableGTypes";

export default function ({myData, uniqueId}): { value: any, showValue: any } {
    const temp = myData.filters.find((item: filterOfDataTypeObject) => item.uniqueId === uniqueId)
    return temp || {value: "", showValue: "",}


}
//  findValueInFilterObject