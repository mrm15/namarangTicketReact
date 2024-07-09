import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useAuth from "../../../hooks/useAuth.tsx";
import {ROLES} from "../../../Pages/ROLES.tsx";
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import {getBillData, getBillDataOpen} from "../../../config/api.tsx";
import {PREFIX_URL} from "../../../api/axios.tsx";
import Loader1 from "../../Loader/Loader1.tsx";
import Loader from "../../Loader";
import BillTable from "./BillTable.tsx";
import {FaExclamationTriangle} from "react-icons/fa";
import ErrorInBill from "./ErrorInBill.tsx";

const ShowBill = () => {
    // @ts-ignore
    const {auth} = useAuth();
    const {factorNumber} = useParams()

    const [hesabfaBillData, setHesabfaBillData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState({
        factorStatus: false,
        errorMessage: ""
    });

    const roleAccessList = auth.userInfo?.roleAccessList;
    const hasAccessToShowBill = roleAccessList?.includes(ROLES.showBillAccess[0])
    const hasAccessToDownloadPdf = roleAccessList?.includes(ROLES.downloadBillAsPdf[0])
    const hasAccessToDownloadCSV = roleAccessList?.includes(ROLES.downloadBillAsCsv[0])
    const myLocation = useLocation();
    const orderCode = myLocation.state?.data?.orderCode;


    useEffect(() => {
        const getDataSetState = async () => {
            try {
                const result = await axios.get(PREFIX_URL + getBillDataOpen + factorNumber);
                setHesabfaBillData(result.data.data);
                setIsLoading(false);
            } catch (error: any) {
                setHasError({
                    factorStatus: true,
                    errorMessage: error.toString()
                })
            }

        }

        void getDataSetState();
    }, []);


    if (hasError.factorStatus) {
        return <ErrorInBill errorMessage={hasError.errorMessage}/>
    }
    if (!factorNumber) {
        return <div>
            <hr/>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                color: '#d32f2f',
                backgroundColor: '#fdecea',
                border: '1px solid #f44336',
                borderRadius: '4px',
                padding: '10px',
                margin: '10px 0'
            }}>
                <FaExclamationTriangle size={24} style={{marginRight: '10px'}}/>
                <span>            اخطار شما مجوز دسترسی به این صفحه را ندارید
</span>
            </div>
            <hr/>

        </div>
    }

    try {
        return (
            <>
                {isLoading ? <Loader/> :
                    <div className={'m-3'}>

                        <div className={'font-bold text-center '}>
                            کارخانه حروف سازی نمارنگ
                        </div>

                        {/*<div className={"bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"}>*/}
                        {/*    اینجا قراره یه فاکتور با استایل جدید نمایش داده بشه.*/}
                        {/*    <hr/>*/}
                        {/*    معرکه نیست؟*/}
                        {/*    <hr/>*/}
                        {/*    خلق یک اثر جدید*/}
                        {/*    <hr/>*/}
                        {/*</div>*/}
                        {/*<pre dir={'ltr'}>*/}
                        {/*      ✅      hasAccessToDownloadPdf is {hasAccessToDownloadPdf ? "Active" : "inActive"}*/}
                        {/*    <hr/>*/}
                        {/*      ✅      hasAccessToDownloadCSV is {hasAccessToDownloadCSV ? "Active" : "inActive"}*/}
                        {/*    <hr/>*/}
                        {/*      ✅      orderCode is {orderCode || 'کد سفارش مشخص نیست'}*/}
                        {/*    <hr/>*/}
                        {/*</pre>*/}
                        <div>
                            <BillTable hesabfaBillData={hesabfaBillData}/>
                        </div>
                    </div>
                }
            </>
        );
    } catch (error) {
        return <pre>{error.toString()}</pre>
    }
};

ShowBill.propTypes = {};

export default ShowBill;
