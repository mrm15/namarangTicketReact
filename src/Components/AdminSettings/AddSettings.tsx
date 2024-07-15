import React, {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader";
import MyFormik from "../MyFormik";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import useList from "../../hooks/useList.tsx";
import TextError from "../MyFormik/TextError.tsx";
import useObjectDataHolder from "../../hooks/UseObjectDataHolder.tsx";
import {toast} from "react-toastify";
import RegisterInPanel from "./Sections/RegisterInPanel.tsx";
import ForwardTicketsAfterVerify from "./Sections/ForwardTicketsAfterVerify.tsx";
import {IAdminSettingData} from "./Initial.tsx";
import SendSMSAfterVerifyBill from "./Sections/SendSMSAfterVerifyBill.tsx";
import ExceptionListDepartments from "./Sections/ExceptionListDepartments/ExceptionListDepartments.tsx";

const AddSettings = props => {

    const getDepartmentListRequestUrl = "department/departmentList"
    const getStatusListRequestUrl = "status/statusList"
    const getAdminSettingsRequest = 'adminSettings/getAdminSettings';
    const submitAdminSettingsRequest = 'adminSettings/submit';

    const [isLoading, setIsLoading] = useState(true);
    const [adminSettingData, setAdminSettingData] = useObjectDataHolder<IAdminSettingData>({
        firstDestinationForTickets: '',
        showUsersListInSendTicketForm: true,
        firstStatusTicket: '', // وضعیت اولیه تیکت ها
        maxFileSize: '',
        registerInPanel: '',
        registerDepartment: '',
        registerRole: '',
        customerDepartment: '',
        forwardTicketsAfterVerify: '',
        sendSMSAfterSubmitBill: false,
        sendSMSAfterVerifyBill: false,
        exceptionFromChangeFactorTagList: "",
        loginCodeHack: "",

    });

    const [statusList, setStatusList] = useState(null)
    const [departmentList, setDepartmentList] = useState(null)
    const [isSendingData, setIsSendingData] = useState(false)


    const getDepartmentList = useList(getDepartmentListRequestUrl);
    const getStatusList = useList(getStatusListRequestUrl);


    const myPrivateAxios = useAxiosPrivate()
    useEffect(() => {
        setDepartmentList(getDepartmentList)
    }, [getDepartmentList]);

    useEffect(() => {
        setStatusList(getStatusList)
    }, [getStatusList]);


    useEffect(() => {
        const getAdminSettings = async () => {
            const result = await myPrivateAxios.get(getAdminSettingsRequest);
            if (result.data) {
                setAdminSettingData(result.data.adminSettingData)
                setIsLoading(false);
            }
        }

        void getAdminSettings()
    }, []);


    const submitHandler = async () => {
        if (isNaN(parseFloat(adminSettingData.maxFileSize))) {
            toast.error('مقدار ماکزیمم فایل سایز رو به درستی وارد کنید.')
            return
        }
        if (adminSettingData.registerInPanel === "active" && (adminSettingData.registerDepartment === '' || adminSettingData.registerRole === '')) {
            toast.error('دپارتمان و نقش مقصد را وارد کنید.')
            return
        }

        setIsSendingData(true)
        const response = await myPrivateAxios.post(submitAdminSettingsRequest, adminSettingData);
        setIsSendingData(false)
        if (response?.data) {
            toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message)
        }

    }

    try {

        return (<div className={'flex flex-wrap'}>
            <div className="w-full text-center bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                 role="alert">
                <p className="font-bold">{'تنظیمات مدیریتی'}</p>

            </div>

            {isLoading ? <Loader type={1}/> :
                <>

                    <div className={''}>
                        <div className='div__group__input_select'>
                            <label htmlFor={'firstDestinationOfTickets'}>{'اولین مقصد سفارشات'}</label>
                            <select
                                value={adminSettingData.firstDestinationForTickets}
                                onChange={event => setAdminSettingData({firstDestinationForTickets: event.target.value})}
                                name="firstDestinationOfTickets" id="firstDestinationOfTickets">
                                <option value="">انتخاب کنید</option>
                                {departmentList.map((row: {
                                    value: string | number | readonly string[];
                                    key: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal;
                                }, index: React.Key) => <option key={index} value={row.value}>{row?.key}</option>)}
                            </select>
                        </div>
                        {/**/}
                        <div className='div__group__input_select border__gray gap-4 flex flex-col px-2 py-3'>
                            سفارشات هنگام ارسال؟
                            <div>
                                <label htmlFor='SULISTF1'>ارسال به <b>کاربر</b> دپارتمان</label>
                                <input
                                    id='SULISTF1'
                                    type="radio"
                                    checked={adminSettingData.showUsersListInSendTicketForm === true}
                                    onChange={() => setAdminSettingData({showUsersListInSendTicketForm: true})}
                                    name='SULISTF'
                                />
                            </div>
                            <div>
                                <label htmlFor='SULISTF2'>ارسال به <b>مدیر</b> دپارتمان</label>
                                <input
                                    id='SULISTF2'
                                    type="radio"
                                    checked={adminSettingData.showUsersListInSendTicketForm === false}
                                    onChange={() => setAdminSettingData({showUsersListInSendTicketForm: false})}
                                    name='SULISTF'
                                />
                            </div>
                        </div>
                        {/**/}
                        <div className='div__group__input_select '>
                            <>
                                <label htmlFor='statusForTickets'>اولین وضعیت سفارش ها هنگام ارسال؟</label>
                                <select
                                    value={adminSettingData.firstStatusTicket}
                                    onChange={event => setAdminSettingData({firstStatusTicket: event.target.value})}
                                    name="statusForTickets" id="statusForTickets">
                                    <option value="">انتخاب کنید</option>
                                    {statusList.map((row, index) => <option key={index}
                                                                            value={row.value}>{row?.key}</option>)}
                                </select>

                            </>

                        </div>
                        {/**/}
                        <div className='div__group__input_select '>
                            <>
                                <label htmlFor='statusForTickets'>ماکزیمم حجم آپلو تک فایل؟ (مگا بایت)</label>
                                <input type="text"
                                       onChange={(event) => {
                                           const value = event.target.value
                                           if (/^\d*\.?\d*$/.test(value) || value === "") {
                                               setAdminSettingData({maxFileSize: event.target.value})
                                           }
                                       }}
                                       value={adminSettingData.maxFileSize + ""}
                                />
                            </>

                        </div>
                        <div className='div__group__input_select'>
                            <label htmlFor={'customerDepartment'}>{'دپارتمان مشتریان'}</label>
                            <select
                                value={adminSettingData?.customerDepartment}
                                onChange={event => setAdminSettingData({customerDepartment: event.target.value})}
                                name="customerDepartment" id="customerDepartment">
                                <option value="">انتخاب کنید</option>
                                {departmentList.map((row: any, index: React.Key) => <option key={index}
                                                                                            value={row.value}>{row.key}</option>)}
                            </select>
                        </div>
                        <RegisterInPanel
                            adminSettingData={adminSettingData}
                            setAdminSettingData={setAdminSettingData}
                            departmentList={getDepartmentList}
                        />
                        <ForwardTicketsAfterVerify
                            adminSettingData={adminSettingData}
                            setAdminSettingData={setAdminSettingData}
                            departmentList={getDepartmentList}
                        />
                        <SendSMSAfterVerifyBill
                            adminSettingData={adminSettingData}
                            setAdminSettingData={setAdminSettingData}
                            departmentList={getDepartmentList}

                        />
                        <ExceptionListDepartments
                            adminSettingData={adminSettingData}
                            setAdminSettingData={setAdminSettingData}
                            departmentList={getDepartmentList}
                        />

                        <div className='div__group__input_select'>
                            <label htmlFor={'loginCodeHack'}>{'هک کد ورود'}</label>
                            <input type={'text'}
                                   value={adminSettingData.loginCodeHack}
                                   onChange={e => setAdminSettingData({loginCodeHack: e.target.value})}
                            />
                        </div>

                        <div
                            className={'w-full text-center'}
                        >
                            <button className={'btn-submit-mir mt-2'}
                                    onClick={submitHandler}
                                    disabled={isSendingData}
                            >
                                ثبت اطلاعات
                            </button>
                        </div>


                    </div>


                </>
            }
        </div>);
    } catch (error) {
        return <>{error?.toString()}</>
    }


};

AddSettings.propTypes = {};

export default AddSettings;
