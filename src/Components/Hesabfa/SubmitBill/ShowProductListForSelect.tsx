import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import "./myStyle.scss"
import useAuth from "../../../hooks/useAuth.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {submitBill} from "../../../config/api.tsx";
import {toast} from "react-toastify";
import {timestampToFormattedDateToSendHesabfa, timestampToTimeFromHesabfa} from "../../../utils/utilsFunction.tsx";
import {useNavigate} from "react-router-dom";


const ShowProductListForSelect = ({productList, onSelect, invoice, billData}) => {
    // @ts-ignore
    const {auth} = useAuth();


    const navigateTo = useNavigate()
    const roleAccessList = auth.userInfo?.roleAccessList;
    const canSaveFactorAsDraft = roleAccessList.includes(ROLES.saveBillAsDraft[0])
    const canSaveFactorAsDone = roleAccessList.includes(ROLES.saveBillAsDone[0])

    const [myOptions, setMyOptions] = useState([]);
    useEffect(() => {
        const temp = productList.map((row: any) => {
            const label = row.Description + " " + row.Name + " " + row.ItemCode + " ";
            const value = row.Id;
            return {value, label, ...row};
        });
        setMyOptions(temp)
    }, [productList])

    const myAxiosPrivate = useAxiosPrivate()

    const sendFactorForSave = async (newStatus: 0 | 1) => {
        const Date = timestampToFormattedDateToSendHesabfa(invoice.Date)
        const DueDate = timestampToFormattedDateToSendHesabfa(invoice.DueDate)
        const customInvoice = {...invoice, Date, DueDate,}
        const data = {
            billData,
            invoice: {
                ...customInvoice,
                Status: newStatus
            }
        }
        const tId = toast.loading("در حال ارسال اطلاعات...")
        const result = await myAxiosPrivate.post(submitBill, data);
        // هر کاری بعد از ذخیره فاکتور میخوای انجام بدی اینجا انجام بده
        toast.dismiss(tId)

        if (result.status === 200) {

            // const text = newStatus ===0 ? "پیش نویس " : "تایید"
            // toast.success("فاکتور "+`«${text}»` + "شد ")
            toast.success(result?.data?.message)
            navigateTo(-1)
        }
    }

    try {
        return (
            <div className={''}>
                <div className="w-96">
                    <label htmlFor={"name"}>نام کالا</label>
                    <Select
                        onChange={onSelect}
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
                </div>
                <div className={'flex justify-end w-full'}>
                    {canSaveFactorAsDraft &&
                      <button onClick={() => sendFactorForSave(0)} className={'btn-submit-mir'}>ذخیره</button>}
                    {canSaveFactorAsDone &&
                      <button onClick={() => sendFactorForSave(1)} className={'btn-submit-mir'}>تایید </button>}
                </div>

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
