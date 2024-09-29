import React, {useEffect} from 'react';
import {useScreenshotContext} from "./ScreenShotContext.tsx";
import {findNewItemArray} from "./function.tsx";
import {useLocation} from "react-router-dom";
import MyDatePicker from "../MyDatePicker";

const ScreenShotTable = () => {

    const {setData, data} = useScreenshotContext()


    return (
        <div className={"text-center"}>

            {/*{JSON.stringify(data.tableColumnArray)}*/}
            <div className="">
                <table className="min-w-full max-w-fit bg-white border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100 ">
                        <th className="py-2 px-4 border-b border">نام مشتری</th>
                        {data.tableColumnArray.map(row => <th
                            key={row.id}
                            className="py-2 px-4 border-b border"
                        >{row.title}</th>)}
                        <th className="py-2 px-4 border-b border">تاریخ</th>

                    </tr>
                    </thead>
                    <tbody>

                    <tr className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border">{data.fileName}</td>
                        {data.tableColumnArray.map(row => <td
                            key={row.id}
                            className="py-2 px-4 border-b border"
                        >{row.value?.split("\n")?.map((line: any, index: React.Key) => <div key={index}>
                            <>{line}</>
                        </div>)}</td>)}
                        <td className="py-2 px-4 border-b border">
                            {data.dateOnScreenShot}
                        </td>

                    </tr>
                    <tr>
                        <td colSpan={2 + data.tableColumnArray.length}
                            className={""}
                        >
                            <input type="text"
                                   className={"w-full p-2 outline-0 text-center"}
                                   placeholder={"توضیحات"}
                                   value={data.description}
                                   onChange={e => setData({description: e.target.value})}
                            />
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScreenShotTable;
