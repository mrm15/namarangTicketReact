import React from 'react';
import {BASE_URL} from "../../../api/axios.tsx";
import ResponseSection from "./ResponseSection.tsx";
import {FaFile} from 'react-icons/fa';
import {PAGES} from "../../../Pages/Route-string.tsx";
import BillDataButtonInChatList from "./BillDataButtonInChatList.tsx";

const ChatList = ({chatList, setReload, reload}) => {

    const data = chatList?.chatList
    try {
        return (<div className={'w-full flex justify-center'}>


            <div className={'md:w-full lg:w-9/12  border__gray'}>
                <div className={'rounded border-2 flex flex-wrap justify-between p-3 '}>
                    <div> عنوان سفارش: {data?.title} </div>
                    <div> دپارتمان: {data.lastDepartment} </div>
                    <div className={'flex'}>
                        <div>تاریخ ایجاد:</div>
                        <div className={'ltr'}>{data.createAt}&nbsp;</div>
                    </div>
                    <div className={''}>شماره تیکت : {data.ticketNumber}</div>
                </div>
                <div className={'rounded  justify-between p-3 my-3 '}>

                    {data?.data?.map((item, index) => {
                        const isTicketSender = item.isTicketSender;
                        const isVisibleToUser = item.visibleToUser
                        const billNumber = item?.billNumber
                        const billStatus = item?.billStatus
                        const type = item?.type // تایپ رو گرفتم تا بدونم  این تیکت هست یا توی تیکت ریپلای که حذف کردنش آسون تر باشه
                        const id = item.id // آیدی رو گرفتم که بتونم موقع حذف بدونم چیو حذف کنم
                        const tempBillData = {
                            billNumber, billStatus, type, id ,
                            ticketId:id,
                        }

                        try {
                            return (
                                <div key={index}
                                     className={(isTicketSender ? 'rtl' : 'ltr') + ' '
                                         + `${isVisibleToUser === false ? 'opacity-30  rounded' : ''}`
                                     }

                                >
                                    {isVisibleToUser === false && <div className={'fontSize10'}>پیام مخفی</div>}
                                    <div className={'sm:w-full md:w-10/12 lg:w-1/2 rounded mt-2 p-2   chat__box rtl'}>
                                        <div className={'flex'}>
                                            <div>دپارتمان:</div>
                                            <div> {item?.department_name}</div>
                                        </div>
                                        <div className={'flex'}>
                                            <div>فرستنده:</div>
                                            <div> {item?.user_name}</div>
                                        </div>

                                        {/*<div className={'flex'}>*/}
                                        {/*    <div>عنوان:</div>*/}
                                        {/*    <div className={'font-bold'}> {item.title}</div>*/}
                                        {/*</div>*/}

                                        <div className={'flex'}>

                                            <div> {item?.description}</div>
                                        </div>
                                        <div className={'flex'}>
                                            {item?.files?.map((row: any, index: React.Key) => {
                                                const temp = ((row.fileSize) / 1024)
                                                const fileSize = temp.toFixed();


                                                let href = '';
                                                if (typeof row.filePath === 'string') {
                                                    href = `${BASE_URL}/download/${row.filePath as string}`;
                                                }

                                                return <a key={index} target={'_blank'}
                                                          href={href}
                                                          className={'rounded fontSize10 flex flex-wrap p-1 border__gray mx-1 '}
                                                >
                                                    <div><FaFile/></div>
                                                    <div className={'break-all'}>{row.fileName}</div>
                                                    <div className={'mx-2 ltr'}> {fileSize} KB</div>

                                                </a>
                                            })}
                                        </div>
                                        <div>
                                            {billNumber && <BillDataButtonInChatList billData={tempBillData}/>}

                                        </div>
                                        <div className={'mx-2 ltr fontSize10'}> {item.createAt} </div>
                                    </div>
                                    <div style={{
                                        width: '35px',
                                        borderRadius: '50%',
                                        border: '1px solid #3c3c3c',
                                        padding: '5px'
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 512 512">
                                            <path
                                                d="M256 288A144 144 0 1 0 256 0a144 144 0 1 0 0 288zm-94.7 32C72.2 320 0 392.2 0 481.3c0 17 13.8 30.7 30.7 30.7H481.3c17 0 30.7-13.8 30.7-30.7C512 392.2 439.8 320 350.7 320H161.3z"/>
                                        </svg>
                                    </div>

                                </div>
                            )
                        } catch (error) {
                            return <div>{error.toString()}</div>
                        }
                    })}
                    <div>
                        <ResponseSection setReload={setReload} reload={reload} chatList={chatList}/>

                    </div>
                </div>

            </div>
        </div>);
    } catch (error) {
        return <div>{error?.toString()}</div>
    }


};

export default ChatList;
