import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import {useQuery} from "@tanstack/react-query";
import {getProductList} from "../../../../config/api.tsx";
import LittleSpinner from "../../../Loader/LittleSpinner.tsx";
import Select, {components} from 'react-select';
import {useEffect, useState} from "react";
import {addRowIdtoTable, formatNumber} from "../../../../utils/utilsFunction.tsx";
import {calculateSumOfEachRow} from "../../SubmitBill/functions.tsx";
import {useSubmitBillContext} from "../submitBillContext.tsx";
import NamarangLogoSvg from "../../../../assets/Svg/NamarangLogoSvg.tsx";


const ShowProductListForSelect = () => {

    const {data, setData} = useSubmitBillContext()
    const [selectedOption, setSelectedOption] = useState<any>(null); // state جدید برای ذخیره انتخاب
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
            let temp = [...data.invoice.InvoiceItems, tempRow]

            temp = addRowIdtoTable(temp)
            const temp2 = calculateSumOfEachRow(temp)
            setData({invoice: {...data.invoice, InvoiceItems: temp2}})

        }
        setSelectedOption(null)
    }


    const [myOptions, setMyOptions] = useState([]);
    useEffect(() => {
        const productList: any[] = productListUseQuery.data?.data?.List;

        if (productList?.length > 0) {
            const ActiveProducts = productList.filter(({Active}) => Active) // Keep only active products
                .filter((product) => product.SellPrice > 0);
            const productListNormalized = ActiveProducts.map(row => {
                return {
                    Id: row.Id,
                    Description: row.Description || row.SalesTitle,
                    NodeFamily: row.NodeFamily || "",
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

                const label = "" + " " + row.Name + " " + row.ItemCode + "  __ " + row.Description + " __" + row.NodeFamily;
                const value = row.Id;
                return {value, label, ...row};
            });
            setMyOptions(temp)
        }

    }, [productListUseQuery.data])
    /************************************************************/

    const filterOption1 = (option, inputValue) => {
        // Create a regular expression from the input value, escaping special characters
        const regex = new RegExp(inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        // Test if the option's label matches the regular expression
        return regex.test(option.label);
    };

    const filterOption = (option, inputValue) => {
        // Normalize the input and option label to lowercase
        // نقطه و سایر علائم رو در نظر نمیگیرم تا اگه کاربر
        // 123
        // یا 1.2.3
        // رو زد بازم چسب 1.2.3 رو توی لیستش ببینه

        const normalizedInput = inputValue.toLowerCase().replace(/[.,;!?]/g, "");
        const normalizedLabel = option.label.toLowerCase().replace(/[.,;!?]/g, "");
        // Split the input into individual words
        const inputWords = normalizedInput.split(' ');
        // Check if all input words are present in the option label
        return inputWords.every(word => normalizedLabel.includes(word));
    };
    const CustomOption = (props) => (
        <components.Option {...props}>
            <div className={"flex  gap-2 fontSize10 w-80"}>
                <div className={" rounded border border-gray-400"}><NamarangLogoSvg width={50} height={50}/></div>
                <div className={"flex flex-col justify-around"}>
                    <div>
                        {props.data.label.split("__")[0]}
                    </div>
                    <div className={"fontSize10 text-gray-700"}>
                        {props.data.NodeFamily}

                    </div>
                    <div className={"flex  items-center"}>
                        <div className={"badge-bg-blue-text-white"}>
                            {props.data.Unit}
                        </div>
                        <div className={"badge-bg-green-text-white"}>
                            {formatNumber(props.data.fixedPrice)}
                            &nbsp; تومان
                        </div>

                    </div>
                </div>
            </div>

        </components.Option>
    );


    try {
        return (
            <div className={'flex flex-wrap justify-between'}>
                {
                    productListUseQuery.isLoading ?
                        <LittleSpinner/>
                        :
                        <div className="w-full">
                            <Select
                                value={selectedOption} // اینجا مقدار selectedOption رو برای نمایش در Select میدی
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
                                components={{Option: CustomOption}}
                                filterOption={filterOption}

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
