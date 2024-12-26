import React, {useEffect, useState} from 'react';
import {getBillData} from "../../config/api.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";

const sleep = async (milliSeconds: number) => {
    await new Promise((resolve) => setTimeout(resolve, milliSeconds));

}
const array = [
    "27039",
    "27046",
    "26588",
    "27093",
    "27094",
    "27104",
    "26968",
    "27101",
    "27191",
    "27189",
    "27090",
    "26878",
    "27256",
    "27256",
    "27285",
    "26959",
    "27060",
    "26625",
    "27074",
    "26289",
    "26843",
    "26910",
    "25023",
    "27330",
    "26191",
    "26602",
    "27179",
    "27066",
    "27114",
    "26060",
    "26691",
    "26691",
    "26395",
    "26803",
    "27390",
    "26289",
    "26445",
    "27268",
    "25798",
    "27040",
]


const Tttttt = () => {

    const myAxiosPrivate = useAxiosPrivate()
    const [lines, setLines] = useState<string[]>([]);

    const addToSting = async (billNumber) => {

        try{
            const result = await myAxiosPrivate.get(getBillData + billNumber)
            const newData = result?.data?.data?.ContactTitle
            setLines((prevLines) => [...prevLines, newData]);
        }catch (error){
            console.log(error)
        }

    }

    const newCal = async () => {
        const arrayLen = array.length
        let counter = 0
        while (counter < arrayLen) {
            await addToSting(array[counter])
            counter++;

            await sleep(500)


        }
    }




    return (

        <div>
            <button className={"btn-gay-mir"} onClick={newCal}>
                start
            </button>
            <div

                style={{ whiteSpace: 'pre-wrap' }}
            >
                {lines.map((line, index) => (
                    <div key={index}>{index+1}_ {line}</div>
                ))}
            </div>
        </div>
    );
};

export default Tttttt;