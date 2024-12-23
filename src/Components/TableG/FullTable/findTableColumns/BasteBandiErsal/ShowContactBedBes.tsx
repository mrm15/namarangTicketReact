import React from 'react';
import {formatNumber} from "../../../../../utils/utilsFunction";
import {FiChevronsDown, FiChevronsUp} from "react-icons/fi";
import {AiOutlineCheckCircle} from "react-icons/ai";

const ShowContactBedBes = ({info}) => {


    try {
        const contactCredit = info?.row?.original?.Contact?.Credits
        const contactLiability = info?.row?.original?.Contact?.Liability


        const userBedOrBesValue = contactCredit - contactLiability
        const userBedOrBesStatus = userBedOrBesValue > 0 ?
            <div className={"flex"}>
                <span>&nbsp;بس</span>
                <span><FiChevronsUp/></span>
            </div>
            : userBedOrBesValue < 0 ?
                <div className={"flex"}>
                    <div>&nbsp;بد</div>
                    <div><FiChevronsDown/></div>
                </div> :
                <><AiOutlineCheckCircle/></>
        const userBedOrBesColor = userBedOrBesValue > 0 ? "blue" : userBedOrBesValue < 0 ? "red" : "green"

        return (
            <div>
                <span style={{color: userBedOrBesColor, fontWeight: "bold"}}
                      className={"flex"}>
                            <div className={"ltr"}>&nbsp;{formatNumber(userBedOrBesValue)} &nbsp;</div>
                             <div className={"flex"}>  <div>{userBedOrBesStatus}</div></div>
                        </span>
            </div>
        );
    } catch (error) {
        return <div> نامشخص</div>
    }
};

export default ShowContactBedBes;