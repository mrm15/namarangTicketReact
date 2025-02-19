import React from 'react';
import SelectCustomerSection from "./SelectCustomerSection";
import InputTextFill from "./InputTextFill.tsx";
import FileUploadAdvancedTicket from "./FileUploadAdvancedTicket.tsx";
import SubmitOrderButton from "./SubmitOrderButton.tsx";

const AdvancedTicketCreateComponent = () => {
    return (
        <div className={"flex justify-center"}>
            <div className={"sm:w-100 md:w-1024 p-3 border-2 "}>
                <SelectCustomerSection/>
                <InputTextFill myKey={"title"} placeholder={"عنوان سفارش را وارد کنید"} title={"عنوان سفارش"}/>
                <InputTextFill myKey={"description"} placeholder={"توضیحات سفارش را اینجا وارد کنید"}
                               title={"توضیحات"}/>
                <FileUploadAdvancedTicket
                    titleOfSection={"آپلود فایل نهایی- تک فایل"}
                    myKey={"files"}
                />
                <div className={"mt-2"}>&nbsp;</div>
                <hr/>
                <FileUploadAdvancedTicket
                    titleOfSection={"بارگزاری اسکرین  شات کار"}
                    acceptedFormats={[".jpg", ".jpeg", ".png",]}
                    myKey={"screenShot"}
                />
                <SubmitOrderButton/>
            </div>
        </div>
    );
};

export default AdvancedTicketCreateComponent;