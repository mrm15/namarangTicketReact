import React, {useEffect, useRef, useState} from 'react';
import axios from "../api/axios";

const SendSms = () => {

    // اینجا میخوام هر یک دقیقه یک ریکویت بزنم بک اند تا پیاما رو ارسال کنه. و نتیجه رو روی صفحه چاپ کنه
    const [resultMessage, setResultMessage] = useState("")

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const res = await axios.get("/handleSendPendingSms");
                setResultMessage(prevState => prevState + "<br><br>&nbsp;&nbsp;&nbsp;" + res?.data?.message);
            } catch (error) {
                setResultMessage(prevState => prevState + "<br><br>&nbsp;&nbsp;&nbsp;" + error.toString());
            }
        };

        const intervalId = setInterval(sendRequest, 1000 * 2); // 1 minute interval

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    const messagesEndRef = useRef(null);


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [resultMessage]);

    return (
        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <div dangerouslySetInnerHTML={{ __html: resultMessage }} />
            <div ref={messagesEndRef} />
        </div>
    );
};

export default SendSms;
