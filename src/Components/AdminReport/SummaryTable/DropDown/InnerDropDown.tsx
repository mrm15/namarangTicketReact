import React, {useState} from 'react';
import {v4 as uuidV4} from "uuid";
import DropDown from "./DropDown.tsx";
import MinusIcon from "../../../../assets/Svg/MinusIcon.tsx";
import PlusIcon from "../../../../assets/Svg/PlusIcon.tsx";

const InnerDropDown = ({item}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    try {
        return (
            <div
                className={"transition-all duration-1000 "}
                // key={uuidV4()}
                 style={{marginRight: '10px', padding: "10px 10px", borderRight: "1px solid rgba(0,0,0,0.5)" , borderRadius:10}}>
                <div onClick={toggleDropdown} style={{cursor: 'pointer'}}>
                    <div className={"flex "}>
                        <div>{item.subItems ? (isOpen ? <MinusIcon/> : <PlusIcon/>) : <span style={{opacity:"0.4"}}>🟣</span>}</div>
                        <div> {item?.title}: {item?.value}</div>
                    </div>
                </div>
                {isOpen && item.subItems && (<DropDown key={uuidV4()} data={item.subItems}/>)}
            </div>
        )
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default InnerDropDown;