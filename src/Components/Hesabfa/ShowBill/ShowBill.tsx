import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useAuth from "../../../hooks/useAuth.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {getBillData, getBillDataOpen} from "../../../config/api.tsx";
import {PREFIX_URL} from "../../../api/axios.tsx";

const ShowBill = () => {
    // @ts-ignore
    const {auth} = useAuth();


    const roleAccessList = auth.userInfo?.roleAccessList;
    const hasAccessToShowBill = roleAccessList?.includes(ROLES.showBillAccess[0])
    const hasAccessToDownloadPdf = roleAccessList?.includes(ROLES.downloadBillAsPdf[0])
    const hasAccessToDownloadCSV = roleAccessList?.includes(ROLES.downloadBillAsCsv[0])
    const myLocation = useLocation();
    const orderCode = myLocation.state?.data?.orderCode;


    const [hesabfaBillData, setHesabfaBillData] = useState({})
    useEffect(() => {

        const getDataSetState = async() => {
            const result = await axios.get( PREFIX_URL +getBillDataOpen + 1003);
            setHesabfaBillData(result.data.data)
        }

        void getDataSetState()

    }, [orderCode]);


    if (!hasAccessToShowBill) {
        return <div>
            ظاهرا شما اشتباهی به این صفحه هدایت شده اید.
            <br/>
            شما مجوز دسترسی به صفحه نمایش فاکتور را ندارید.
        </div>
    }
    try {
        return (
            <div>

                <div className={"bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"}>
                    اینجا قراره یه فاکتور با استایل جدید نمایش داده بشه.
                    <hr/>
                    معرکه نیست؟
                    <hr/>
                    خلق یک اثر جدید
                    <hr/>
                </div>
                <pre dir={'ltr'}>
                  ✅      hasAccessToDownloadPdf is {hasAccessToDownloadPdf ? "Active" : "inActive"}
                    <hr/>
                  ✅      hasAccessToDownloadCSV is {hasAccessToDownloadCSV ? "Active" : "inActive"}
                    <hr/>
                  ✅      orderCode is {orderCode || 'کد سفارش مشخص نیست'}
                    <hr/>
                    <hr/>

            </pre>
                <div>
                    {JSON.stringify(hesabfaBillData)}
                </div>

            </div>
        );
    } catch (error) {
        return <pre>{error.toString()}</pre>
    }
};

ShowBill.propTypes = {};

export default ShowBill;
