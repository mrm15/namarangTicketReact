import React, {useEffect} from 'react';
import {useScreenshotContext} from "./ScreenShotContext.tsx";

const ScreenShotTable = () => {

    const {setData, data} = useScreenshotContext()

    const currentDate= +new Date

    return (
        <div className={"text-center"}>

            {/*{JSON.stringify(data.tableColumnArray)}*/}
            <div className="shot__font">
                <table className="min-w-full max-w-fit bg-white border border-gray-300 shot__font">
                    <thead>
                    <tr className="bg-gray-100shot__font ">
                        <th className="py-2 px-4 border-b border shot__font">نام مشتری</th>
                        {data.tableColumnArray.map(row => <th
                            key={row.id}
                            className="py-2 px-4 border-b border shot__font"
                        >{row.title}</th>)}
                        <th className="py-2 px-4 border-b border shot__font ">تاریخ</th>

                    </tr>
                    </thead>
                    <tbody>

                    <tr className="hover:bg-gray-50 shot__font">
                        <td className="py-2 px-4 border-b border shot__font">{data.fileName}</td>
                        {data.tableColumnArray.map(row => <td
                            key={row.id}
                            className="py-2 px-4 border-b border shot__font"
                        >{row.value?.split("\n")?.map((line: any, index: React.Key) => <div
                            className={"shot__font"}
                            key={index}>
                            <>{line}</>
                        </div>)}</td>)}
                        <td className="py-2 px-4 border-b border shot__font">
                            {data.dateOnScreenShot}
                        </td>

                    </tr>
                    <tr>
                        <td colSpan={2 + data.tableColumnArray.length}
                            className={""}
                        >
                            <input type="text"
                                   className={"w-full p-2 outline-0 text-center shot__font"}
                                   placeholder={"توضیحات"}
                                   value={data.description}
                                   onChange={e => setData({description: e.target.value})}
                            />
                        </td>
                    </tr>

                    </tbody>
                </table>
                <div className={"flex justify-between"}>
                   <div className={"text-left fontSize14"}> شماره فاکتور:
                       {data?.billData?.Number}</div>
                   <div className={"text-right fontSize14"}>
                       {currentDate}</div>
                </div>
            </div>
        </div>
    );
};

export default ScreenShotTable;
