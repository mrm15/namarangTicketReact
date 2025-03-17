import React, {useState} from 'react';

const SingleItemInTable = ({contactsValue}) => {

    const [show, setShow] = useState(false)
    const setShowOnOff = () => {
        setShow(!show)
    }
    try {

        if (show === false) {
            return <td
                className={"cursor-pointer"}
                onClick={setShowOnOff}
            >
                مشاهده جزئیات
            </td>
        }else {
            return (
                <td
                >
                    <button
                        onClick={setShowOnOff}
                        className={"btn-small-show cursor-pointer"}


                    >
                        بستن جزئیات
                    </button>
                    {contactsValue?.map((row, index) => {
                        return <ul key={index} className={"flex gap-2 border-b-2 w-fit  items-center"}>
                            <li>{index + 1}</li>
                            <li className={"w-32 py-2 px-2"}>{row?.phoneNumber}</li>
                            <li className={"w-32 py-2 px-2"}>{row?.myContactName}</li>
                            <li className={"w-32 py-2 px-2"}>{row?.value.toFixed(2)}</li>
                        </ul>
                    })}
                </td>
            );
        }

    } catch (error) {
        console.error('Error rendering ShowTableData:', error);
        return (
            <div className="p-4 text-red-500">
                ...
            </div>
        );
    }
};

export default SingleItemInTable;
