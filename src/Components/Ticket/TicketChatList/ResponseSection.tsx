import {FaTrash} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import {handleDragOver, randomNumberGenerator} from "../../../utils/utilsFunction.tsx";
import useAxiosPrivateFormData from "../../../hooks/useAxiosPrivateFormData.tsx";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.tsx";
import {AxiosResponse} from "axios";
import {uploadFileUtil} from "../../../utils/upload.tsx";

const requestUrl = '/ticketReply/create';
const ResponseSection = ({chatList,setReload,reload}) => {



    const messagesEndRef = useRef(null);
    // Function to scroll to the bottom of the container
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            setTimeout(()=>{
                messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
            },500)
        }
    };
    // Scroll to the bottom of the container when messages update
    useEffect(() => {

        debugger
        scrollToBottom();
    }, [reload]);



    const [sendData, setSendData] = useState({
        description: '',
        visibleToUser: true,
        attachments: []
    })

    const myAxiosPrivate = useAxiosPrivate()
    const myAxiosPrivateFormData = useAxiosPrivateFormData()
    const submitHandler = async () => {

        const attachments = []
        // try Upload Files
        try {
            // بریم که فایل ها رو آپلود کنیم و   آی دی ها رو بریزیم توی آرایه
            // lets upload Files and  get IDs from backend and send Them in array
            if (attachments.length > 0) {
                for (const myFile of attachments) {
                    try {
                        const responseOfRequest: AxiosResponse<any> | null = await uploadFileUtil(myFile, "replyTicket", myAxiosPrivateFormData);
                        if (responseOfRequest && responseOfRequest.status === 200) {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
                            const fileId: string | undefined = responseOfRequest?.data?.id;
                            if (fileId) {
                                attachments.push(fileId);
                            } else {
                                attachments.push('');
                            }
                        } else {
                            attachments.push('');
                        }
                    } catch (error) {
                        attachments.push('');
                    }
                }
            }
        } catch (error) {
            attachments.push('');
        }

        const temp = {
            ticketNumber: chatList.chatList.ticketNumber,
            description: sendData.description,
            visibleToUser: sendData.visibleToUser,
            attachments: attachments
        }

        const respose = await myAxiosPrivate.post(requestUrl, temp);

        const {data} = respose;
        setReload({value: randomNumberGenerator()})

    }


    let index = 0;
    try {
        return <div

            className={'border-2 my-2'}>
            <textarea

                onChange={(e) => setSendData({...sendData, description: e.target.value})}
                className={'p-2 w-full border__gray'}
                placeholder={'متن پاسخ را وارد کنید'}>{sendData.description}</textarea>
            <div className={'flex items-center'}>

                <input
                    onChange={(e) => {
                        // assignFileToState(e.target.files[0], index)
                    }}
                    id={`file${index + 1}`} type="file" className="w-100 rounded border-2 hidden"/>

                <div className={'flex items-center'}>
                    <label htmlFor={`file${index + 1}`}
                           className={'customFileLabel cursor-pointer w-full'}
                    >
                        <div
                            id={`file${index + 1}`}
                            className="same__input w-full"
                            // onDrop={e => handleDrop(e, index)}
                            onDragOver={handleDragOver}>
                            <div>
                                {/*{file?.name}*/}
                                بکشید و رها کنید
                            </div>
                        </div>
                    </label>
                    <FaTrash
                        // onClick={() => handleRemoveFile(index)}
                        className={'text-red-600 ms-2'}/>
                </div>


                <button
                    ref={messagesEndRef}
                    onClick={submitHandler}
                    className={'width__50_Percent bg-amber-100 h-full'}> ارسال
                </button>
            </div>
        </div>
    } catch (error) {
        return <div>{error.toString()}</div>
    }
};

export default ResponseSection;