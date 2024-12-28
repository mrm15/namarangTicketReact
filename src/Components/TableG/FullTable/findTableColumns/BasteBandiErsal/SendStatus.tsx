import React from 'react';
import { randomNumberGenerator} from "../../../../../utils/utilsFunction.tsx";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate.tsx";
import useAuth from "../../../../../hooks/useAuth.tsx";
import {ROLES} from "../../../../../Pages/ROLES.tsx";
import {PAGES} from "../../../../../Pages/Route-string.tsx";
import ForwardOnClick from "../../../../../ReportBill/ForwardOnClick.tsx";
import DeleteBill from "./DeleteBill.tsx";
import ChangeBillStatus from "./ChangeBillStatus/ChangeBillStatus.tsx";

const SendStatus = ({
                        info,
                        url,
                        navigateTo, // Replace 'any' with the actual type if known
                        myAxios,
                        setMyData,
                    }) => {


    const myAxiosP = useAxiosPrivate();

    const {auth} = useAuth();

    const cellValue = info.getValue();
    const sendStatus = cellValue || "نامشخص"
    // وضعیت رو با عدد میخوام نشون بدم
    // بسته بندی 8
    // اسال شده 9


    const rnd = randomNumberGenerator().toString()

    const billNumber = info?.row?.original?.Number

    // آیا بتونه دکمه ی تغییر وضعیت رو ببینه؟
    const canSeeChangeBillStatusButton = auth?.userInfo?.roleAccessList?.includes("canSeeChangeBillStatusButton")
    const hasAccessToGetScreenShotBills = auth?.userInfo?.roleAccessList?.includes(ROLES.screenShotBills[0])
    const hasAccessViewBills = auth?.userInfo?.roleAccessList?.includes(ROLES.viewBills[0])
    const hasAccessToEditBillInChatList = auth?.userInfo?.roleAccessList?.includes(ROLES.editBillInChatList[0])


    const roleAccessList = auth.userInfo?.roleAccessList;
    const accessToDeleteBill = roleAccessList.includes(ROLES.deleteBill[0])

    const billObject = info?.row?.original

    return (
        <div className={"flex flex-wrap items-center gap-1 "}>
            {canSeeChangeBillStatusButton && <ChangeBillStatus setMyData={setMyData} info={info}/>}
              <div className={"flex flex-wrap gap-1"}>
                  {hasAccessViewBills && <a className={"btn-small-show"} target={"_blank"}
                                            href={PAGES.showBill + "/" + billNumber}>{"مشاهده"}</a>}
                  {hasAccessToEditBillInChatList && <div>
                      <ForwardOnClick
                          className={"btn-small-edit"}
                          value={billNumber} NewPage={PAGES.submit_bill}
                          options={{
                              state: {
                                  data: {billNumber: billNumber}
                              }
                          }}
                      />
                  </div>}
              </div>

            {accessToDeleteBill &&
              <DeleteBill
                setMyData={setMyData}
                billNumber={billNumber}
                info={info}
              />
            }
            {hasAccessToGetScreenShotBills &&
              <div>
                <ForwardOnClick
                    className={"btn-small-edit"}
                  buttonCaption={" شات"}
                  value={billNumber} NewPage={PAGES.screenshot}
                  options={{
                      state: {
                          data: {bill: billObject}
                      }
                  }}
                />
              </div>
            }
            {hasAccessToGetScreenShotBills &&
              <div>
                {/*<ChangeStatus*/}
                {/*  className={"btn-small-edit"}*/}
                {/*  buttonCaption={" شات"}*/}
                {/*  value={billNumber} NewPage={PAGES.screenshot}*/}
                {/*  options={{*/}
                {/*      state: {*/}
                {/*          data: {bill: billObject}*/}
                {/*      }*/}
                {/*  }}*/}
                {/*/>*/}
              </div>
            }


        </div>
    );
};

export default SendStatus;
