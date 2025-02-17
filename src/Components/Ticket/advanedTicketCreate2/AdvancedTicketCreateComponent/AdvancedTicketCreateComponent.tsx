import React from 'react';
import SelectCustomerSection from "./SelectCustomerSection";
import InputTextFill from "./InputTextFill.tsx";
import ShotUploadInAdvancedTicketCreate
    from "../../advanedTicketCreate/FormInputs/ShotUploadInAdvancedTicketCreate.tsx";
import ShotUploadSection from "./ShotUploadSection.tsx";
import FileUploadAdvancedTicket from "./FileUploadAdvancedTicket.tsx";

const AdvancedTicketCreateComponent = () => {
    return (
        <div className={"flex justify-center"}>
            <div className={"sm:w-100 md:w-1024 "}>
                <SelectCustomerSection/>
                <InputTextFill  myKey={"title"} placeholder={"عنوان سفارش را وارد کنید"} title={"عنوان سفارش"} />
                <InputTextFill  myKey={"description"} placeholder={"توضیحات سفارش را اینجا وارد کنید"} title={"توضیحات"} />
                <ShotUploadSection />
                <FileUploadAdvancedTicket />
            </div>
        </div>
    );
};

export default AdvancedTicketCreateComponent;