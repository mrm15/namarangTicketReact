import React, {useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {toast} from "react-toastify";
import useList from "../../hooks/useList.tsx";

const requestUrl = '/sms/create'
const requestUSerList = '/user/userList'
const SendSmsForm = () => {


    const userList = useList(requestUSerList);

    console.log(userList)

    const [myData, setMyData] = useState({
        smsText: '',
        replyId: null, // if replyId is null user is sending SMS
        destinationNumber: '',
    });

    const myAxios = useAxiosPrivate()
    const clickHandler = async () => {
        console.log(myData)

        if (myData.destinationNumber === '') {
            toast.error('لطفا یک شماره وارد کنید.')
            return
        }
        if (myData.smsText === '') {
            toast.error('لطفا یک متن وارد کنید.')
            return
        }

        const userResult = confirm('آیا مطمئنی میخوای متن پیامک رو ارسال کنی؟');
        if (!userResult) {
            return
        }


        try {
            const result = await myAxios.post(requestUrl, myData);
            if (result?.data) {
                toast.success(result?.data?.message);
                setMyData({...myData,destinationNumber: '',  smsText: ''});

            }

        } catch (error) {
            console.log(error.toString())
        }

    }
    return (
        <div className={''}>
            <div className={'div__group__input_select'}>
                <label htmlFor={'sendSmsTestArea'}>متن پیامک ارسالی</label>
                <textarea
                    id={'sendSmsTextArea'}
                    value={myData.smsText}
                    onChange={e => {
                        const value = e.target.value;
                        setMyData({...myData,  smsText: value});
                    }}
                />
            </div>
            <div className={'div__group__input_select'}>
                <label htmlFor={''}>برگزیدن مخاطب</label>
                <select
                    onChange={(e) => setMyData({...myData, destinationNumber: e.target.value})}>
                    <option value="">انتخاب کنید</option>
                    {userList.map((row) => <option key={row.phoneNumber}
                                                   value={row.phoneNumber}>{row.key} _ {row.phoneNumber}</option>)}
                </select>
            </div>

            <div className={'div__group__input_select'}>
                <label htmlFor={'sendSmsTestArea'}>شماره مخاطب</label>
                <input
                    onChange={(e) => setMyData({...myData, destinationNumber: e.target.value})}
                    type="text" value={myData.destinationNumber}/>
            </div>

            <button className={'btn-submit-mir mt-2'}

                    onClick={clickHandler}
            >
                ارسال
            </button>

        </div>
    );
};

export default SendSmsForm;
