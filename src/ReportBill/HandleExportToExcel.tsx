import {toast} from "react-toastify";
import {getBillList} from "../config/api.tsx";
import {timestampToFormattedDateToSendHesabfa, timestampToTimeFromHesabfa} from "../utils/utilsFunction.tsx";
import {p2e} from "../utils/NumericFunction.tsx";
import {excelExportForHesabfa} from "../utils/excelExport.tsx";
import {getDataFromHesabfaBasedOnFilterState, getHeaderAndRows} from "./functions.tsx";

export const HandleExportToExcel = async ({myAxios, awesomeData , setAwesomeData = undefined}) => {



    const resultOfGetFactorList =await getDataFromHesabfaBasedOnFilterState(awesomeData.filterItems,myAxios)
    if (resultOfGetFactorList.status === 200) {
        const incomeData: [] = resultOfGetFactorList.data.data.List;

        const {
            fileName,
            dataSheet1,
            headersSheet1,
            headersSheet2,
            dataSheet2
        } = getHeaderAndRows(incomeData);

        if(setAwesomeData){
            setAwesomeData({totalData:dataSheet2 })
        }else {
            excelExportForHesabfa({
                fileName,
                dataSheet1,
                headersSheet1,
                headersSheet2,
                dataSheet2
            })
        }

    } else {
        toast.error("صدور اکسل با خطا مواجه شد");

    }
}


