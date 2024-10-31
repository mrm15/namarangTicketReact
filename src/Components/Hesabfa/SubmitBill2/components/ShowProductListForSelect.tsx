import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import {useQuery} from "@tanstack/react-query";
import {getProductList} from "../../../../config/api.tsx";
import LittleSpinner from "../../../Loader/LittleSpinner.tsx";
import Select from "react-select";
import {useEffect, useState} from "react";
import productList from "./ProductList.tsx";
import {addRowIdtoTable} from "../../../../utils/utilsFunction.tsx";
import {calculateSumOfEachRow} from "../../SubmitBill/functions.tsx";
import {useSubmitBillContext} from "../submitBillContext.tsx";


const ShowProductListForSelect = () => {

    const {data, setData} = useSubmitBillContext()
    // Refactored function
    /************************************************************/
    const myAxiosGetProducts = useAxiosPrivate();

    const queryFnGetProducts = async (url) => {
        const temp = await myAxiosGetProducts.get(url)
        return temp.data;
    }

    const productListUseQuery = useQuery({
        queryKey: ["getProductList"],
        // url: string, myAxios: any, page: number, pageSize: number, filters: any
        queryFn: () => queryFnGetProducts(getProductList),
        staleTime: 86400000,  // === 60*60*24*1000
        enabled: true,
    })

    const addProductToTable = (row: any) => {
        if (row) {
            const tempRow = {...row}
            delete tempRow.value
            delete tempRow.label
            let temp = [tempRow, ...data.invoice.InvoiceItems]

            temp = addRowIdtoTable(temp)
            const temp2 = calculateSumOfEachRow(temp)
            setData({invoice: {...data.invoice, InvoiceItems: temp2}})
        }
    }


    const [myOptions, setMyOptions] = useState([]);
    useEffect(() => {
        const productList: any[] = productListUseQuery.data?.data?.List;

        if (productList?.length > 0) {
            const productListNormalized = productList.map(row => {
                return {
                    Id: row.Id,
                    Description: row.Description || row.SalesTitle,
                    ItemCode: row.Code,
                    Unit: row.Unit,
                    Quantity: 1,
                    UnitPrice: row.SellPrice,
                    Discount: 0,
                    Tax: 0,
                    SubUnit: row.SubUnit,
                    ///////////////////////////
                    Name: row.Name,
                    fixedPrice: row.SellPrice,
                    dividedBy: 1,
                    Units: [
                        {id: 1, value: row.Unit, divideNumber: 1},
                        {id: 2, value: row.SubUnit, divideNumber: row.ConversionFactor},
                    ],
                    sum: 0,
                };
            })

            const temp = productListNormalized.map((row: any) => {
                const label = row.Description + " " + row.Name + " " + row.ItemCode + " ";
                const value = row.Id;
                return {value, label, ...row};
            });
            setMyOptions(temp)
        }

    }, [productListUseQuery.data])
    /************************************************************/

    try {
        return (
            <div className={'flex flex-wrap justify-between'}>
                {
                    productListUseQuery.isLoading ?
                        <LittleSpinner/>
                        :
                        <div className="w-full">
                            <Select
                                onChange={addProductToTable}
                                options={myOptions}
                                placeholder={'انتخاب کالا'}
                                className="z__index2"
                                isDisabled={false}
                                isLoading={false}
                                isClearable={true}
                                isRtl={true}
                                // styles={customStyles}
                                isSearchable={true}
                            />
                        </div>}
            </div>
        )

    } catch (error) {
        return (
            <div>
                {error.toString()}
            </div>
        );
    }
};

export default ShowProductListForSelect;
