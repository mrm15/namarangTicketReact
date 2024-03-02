import React from 'react';
import {BASE_URL} from "../../../api/axios.tsx";

const MyComponent = ({chatList}) => {


    const data = chatList?.chatList
    try {
        return (<div className={'w-full flex justify-center'}>


            <div className={'w-9/12'}>
                <div className={'rounded border-2 flex flex-wrap justify-between p-3'}>
                    <div> عنوان سفارش: {data.title} </div>
                    <div> عنوان سفارش: {data.lastDepartment} </div>
                    <div className={'flex'}>
                        <div>تاریخ ایجاد:</div>
                        <div className={'ltr'}>{data.createAt}&nbsp;</div>
                    </div>
                    <div className={''}>شماره تیکت : {data.ticketNumber}</div>
                </div>
                <div className={'rounded border-2 justify-between p-3'}>

                    {data?.data?.map((item, i) => {

                        console.log(item)
                        console.log('====================')

                        return <div className={'rounded border-2'}>
                            <div className={'flex'}>
                                <div>دپارتمان:</div>
                                <div> {item?.department_name}</div>
                            </div>
                            <div className={'flex'}>
                                <div>فرستنده:</div>
                                <div> {item?.user_name}</div>
                            </div>
                            <div className={'flex'}>
                                <div>عنوان:</div>
                                <div> {item?.title}</div>
                            </div>
                            <div className={'flex'}>
                                متن:
                                <div> {item?.description}</div>
                            </div>
                            <div className={'flex'}>
                                {item.files.map(row => {

                                    return <a target={'_blank'} href={BASE_URL + '/download/' + row.filePath}
                                              className={'rounded border-2 fontSize10'}
                                    > ضمیمه

                                        <div className={'rounded'}>
                                            <div className={''}>{row.fileName}</div>
                                            <div className={''}>حجم {row.fileSize}</div>

                                        </div>
                                    </a>
                                })}
                            </div>

                            <br/>
                            <br/>
                        </div>
                    })}
                    <div> محل قرار گیری پاسخ تیکت</div>
                </div>

            </div>
        </div>);
    } catch (error) {
        return <div>{error?.toString()}</div>
    }


};

export default MyComponent;
