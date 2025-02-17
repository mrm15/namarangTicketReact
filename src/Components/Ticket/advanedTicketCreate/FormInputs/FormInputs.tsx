import React, {ChangeEvent} from 'react';
import SelectFromUserList from "./SelectFromUserList.tsx";
import SelectSenderUser from "../SelectSenderUser.tsx";
import {bytesToMegabytes, handleDragOver} from "../../../../utils/utilsFunction.tsx";
import {FaPlus, FaTrash} from "react-icons/fa";
import LittleSpinner from "../../../Loader/LittleSpinner.tsx";
import {toast} from "react-toastify";
import {AxiosResponse} from "axios";
import {uploadFileUtil} from "../../../../utils/upload.tsx";
import {PAGES} from "../../../../Pages/Route-string.tsx";
import useAuth from "../../../../hooks/useAuth.tsx";
import {ROLES} from "../../../../Pages/ROLES.tsx";
import useAxiosPrivateFormData from "../../../../hooks/useAxiosPrivateFormData.tsx";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate.tsx";
import {useNavigate} from "react-router-dom";
import ShotUploadInAdvancedTicketCreate from "./ShotUploadInAdvancedTicketCreate.tsx";

const FormInputs = ({setTicketData, ticketData}) => {
    const {auth} = useAuth();
    const submitTicketUrl = '/ticket/create'

    const emptyFile = new File([], 'کلیک کنید +   بکشید و رها کنید')
    const maxNumberOfFiles = 3
    const myAxiosPrivateFormData = useAxiosPrivateFormData()

    const myAxiosPrivate = useAxiosPrivate()

    const navigateTo = useNavigate()
    const resetSendTicketForm = () => {
        setTicketData({
            ...ticketData,
            title: '',
            description: '',
            files: [emptyFile],
            screenShot:[],


        })
    }
    const hasAccessToSubmitFactorInSubmitOrderForm = auth?.userInfo?.roleAccessList?.includes(ROLES.submitBillInSubmitOrderForm[0])
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const myKey: string = e.target.name;
        const myValue: string = e.target.value;

        setTicketData({...ticketData, [myKey]: myValue});
    };

    const assignFileToState = (singleFile: File, index: number) => {
        // جچم فایل رو چک کنیم اگه از ماکزیمم زیاد تر بود بگم شرمنده آپلود نمیشه
        if (singleFile) {
            const fileSizeInMb = bytesToMegabytes(singleFile.size)
            if (fileSizeInMb > ticketData.maxFileSize) {
                toast.error(`حجم فایل نمیتواند بیشتر از ${ticketData.maxFileSize} مگابایت باشد`);
                return
            }
        }
        const files = [...ticketData.files];

        files[index] = singleFile;
        setTicketData({...ticketData, files});
    }
    const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > 1) {
            toast.info('لطفاً فقط یک فایل انتخاب کنید');
            return;
        }
        const singleFile = droppedFiles[0]
        // const files = [...ticketData.files, ...droppedFiles];
        // setTicketData({...ticketData, files});
        assignFileToState(singleFile, index)

    };
    const handleRemoveFile = (index: number) => {
        const files = ticketData.files
        files.splice(index, 1)
        setTicketData({...ticketData, files})

    }
    const addNewFileHandler = () => {
        // You can handle the maximum file limit check separately if needed
        const files = [...ticketData.files];
        if (files.length >= maxNumberOfFiles) {
            return
        }
        files.push(emptyFile); // Placeholder for the new file
        setTicketData({...ticketData, files});
    };

    const clickHandler = async (inputNumber: number) => {
        const {userList, ...myTicketData} = ticketData

        // فایل ها رو جدا میکنیم
        const uploadFiles = myTicketData.files.filter((singleFile): File => {
            // Check if singleFile is a File object
            // Add other required properties here
            return (singleFile instanceof File && singleFile.name && singleFile.size) && singleFile
        });


        // make Sure there is a title , there is description and files
        if (myTicketData.title === '') {
            toast.error(' لطفا عنوان را وارد کنید')
            return

        }
        if (myTicketData.description === '') {
            toast.error(' لطفا توضیحات را وارد کنید')
            return
        }
        if (uploadFiles.length === 0) {
            toast.error('لطفا حداقل یک فایل بارگزاری کنید')
            return
        }




        try {
            setTicketData({isSendingRequest: true})
            if (myTicketData.files.length > 0) {
                // اگه فایلی وجود داشت باید مقدار های فایل ها با آدرس شون جایگزین بشه پس اول این آرایه رو خالی میکنم
                if (uploadFiles.length > 0) {
                    myTicketData.files = [];
                }


                // بریم که فایل ها رو آپلود کنیم و   آی دی ها رو بریزیم توی آرایه
                // lets upload Files and  get IDs from backend and send Them in array
                for (const myFile of uploadFiles) {
                    try {
                        const responseOfRequest: AxiosResponse<any> | null = await uploadFileUtil(myFile, "ticketFile", myAxiosPrivateFormData);
                        if (responseOfRequest && responseOfRequest.status === 200) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                            const fileId: string | undefined = responseOfRequest?.data?.id;
                            if (fileId) {
                                myTicketData.files.push(fileId);
                            } else {
                                myTicketData.files.push('');
                            }
                        } else {
                            myTicketData.files.push('');
                        }
                    } catch (error) {
                        myTicketData.files.push('');
                    }
                }

                // make sure all files Uploaded and get ID or No
                if (myTicketData.files.includes('')) {
                    toast.error('همه فایل ها با بارگزاری نشدند. مجددا تلاش کنید.')
                    return
                }
                // now let's send All data send To back end

                const response: AxiosResponse = await myAxiosPrivate.post(submitTicketUrl, myTicketData);

                if (response.status === 200 && inputNumber === 0) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                    toast.success(response.data.message)
                    resetSendTicketForm()
                }
                if (response.status === 200 && inputNumber === 1) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
                    toast.success(response.data.message)
                    // اینجا ما میخوایم کاربر رو بفرستیم به سمت صدور فاکتور
                    // که اطلاعاتی که از بک میاد رو مستقیم میفرستیم توی کامپوننت صدور فاکتور
                    try {
                        const data = response.data.data
                        navigateTo(PAGES.submit_bill, {
                            state: {
                                data: {
                                    ...data,
                                    backUrl: PAGES.ticket_created_by_me,
                                }
                            }
                        })
                    } catch (error) {
                        console.log(error.toString())
                        toast.info('امکان صدور فاکتور وجود ندارد');
                    }


                }
            } else {
                // do som|e task here
            }
            // At first, we must upload file and then upload form
        } catch (error) {
            console.log(error)
            toast.error('فرم ثبت نشد لطفا مجددا تلاش کنید.');
        } finally {
            setTicketData({isSendingRequest: false})
        }
    };


    return (
        <div>
            {/*{JSON.stringify(ticketData)}*/}


            <div className="flex justify-center ">
                <div className="sm:w-100 md:w-96 ">
                    <SelectFromUserList
                        ticketData={ticketData}
                        setTicketData={setTicketData}
                    />
                    <SelectSenderUser/>
                    <div className="div__group__input_select w-full">
                        <label htmlFor="ticketTitle">عنوان سفارش</label>
                        <input
                            name={'title'}
                            onChange={handleChange}
                            value={ticketData.title}
                            id="ticketTitle" type="text" className="w-100 rounded border-2"
                            placeholder="تابلو نئون دکتر محمدی"/>
                    </div>
                    <div className="div__group__input_select w-full">
                        <label htmlFor="ticketDescription">توضیحات</label>
                        <textarea

                            value={ticketData.description}
                            name={'description'}
                            onChange={handleChange}
                            id="ticketDescription" className="w-100 rounded border-2"
                            placeholder="مثلا: فایل چلنیوم تک لبه رینگ به رنگ سبز زیمنسی"/>
                    </div>
                    {ticketData?.files?.map((file: File, index) => (

                        <div key={index} className="div__group__input_select w-full">
                            <label htmlFor={`file${index + 1}`}>بارگزاری فایل</label>
                            <input
                                onChange={(e) => {
                                    assignFileToState(e.target.files[0], index)
                                }}
                                id={`file${index + 1}`} type="file"
                                className="w-100 rounded border-2 hidden"/>
                            <div className={'flex items-center'}>
                                <label htmlFor={`file${index + 1}`}
                                       className={'customFileLabel cursor-pointer w-full '}
                                >
                                    <div
                                        id={`file${index + 1}`}
                                        className="same__input w-full h-32"
                                        onDrop={e => handleDrop(e, index)}
                                        onDragOver={handleDragOver}>
                                        <div>
                                            {file?.name}
                                        </div>
                                    </div>
                                </label>
                                <div className={"p-2 cursor-pointer"}
                                     onClick={() => handleRemoveFile(index)}
                                >
                                    <FaTrash

                                        className={'text-red-600 ms-2'}/>
                                </div>
                            </div>
                        </div>

                    ))}
                    <ShotUploadInAdvancedTicketCreate
                        setTicketData={setTicketData}
                        ticketData={ticketData}
                    />

                    <div onClick={addNewFileHandler}
                         className="flex  items-center rounded border-2 my-2 w-32 p-2 cursor-pointer select-none">
                        <div className="mx-1">افزودن فایل</div>
                        <FaPlus/>
                    </div>

                    <div className="div__group__input_select w-full">

                        <button
                            onClick={() => clickHandler(0)}
                            className="btn-submit-mir disabled:cursor-not-allowed"
                            disabled={ticketData.isSendingRequest}
                        >
                            {ticketData.isSendingRequest ? <div className={"flex justify-center"}>
                                <div>در حال ثبت سفارش</div>
                                <LittleSpinner/></div> : " ثبت سفارش"}

                        </button>
                    </div>
                    {hasAccessToSubmitFactorInSubmitOrderForm &&
                      <div className="div__group__input_select w-full">
                        <button
                          onClick={() => clickHandler(1)}
                          className="btn-submit-mir disabled:cursor-not-allowed"
                          disabled={ticketData.isSendingRequest}
                        >
                            {ticketData.isSendingRequest ? <div className={"flex justify-center"}>
                                <div>در حال ثبت سفارش</div>
                                <LittleSpinner/></div> : "ارسال و ثبت فاکتور"}
                        </button>
                      </div>}

                </div>
            </div>

        </div>
    );
};

export default FormInputs;