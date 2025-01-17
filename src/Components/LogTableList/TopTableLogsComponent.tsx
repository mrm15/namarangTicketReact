import React, {useContext} from 'react';
import useAuth from "../../hooks/useAuth";
import {TableGContext} from "../TableG/TableGContext";
import {ROLES} from "../../Pages/ROLES";
import LittleSpinner from "../Loader/LittleSpinner.tsx";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.tsx";
import {toast} from "react-hot-toast";
import {randomNumberGenerator} from "../../utils/utilsFunction.tsx";

const TopTableLogsComponent = () => {

    const {auth} = useAuth();
    const hasFatherAccess = auth.userInfo?.roleAccessList?.includes(ROLES.fatherAccess[0]);
    const context = useContext(TableGContext);
    const {setMyData, myData} = context;

    const myAxios = useAxiosPrivate()
    const deleteLogsHandler = async () => {
        try {
            const idsArray = myData?.checkedItems.map(row => {
                return row._id
            })

            const secondItem = {
                data: {
                    ids: idsArray
                }
            }
            const result = await myAxios.delete("/logs/delete/", secondItem)
            if (result.status === 200) {
                toast.success(result?.data?.message)
                setMyData({reload: randomNumberGenerator(), checkedItems: []})
            } else {
                toast.error(` استاتوس:` + result.status + " " + result?.data?.message)
            }


            // do something
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={"mb-2"}>
            <div className={"flex gap-2"}>
                <button
                    disabled={myData?.queryData.isFetching}
                    onClick={() => {
                        myData?.queryData?.refetch()
                    }}
                    className={"btn-white-border-mir flex w-20 text-center justify-center"}>
                    <div>
                        تازه سازی
                    </div>

                    <div>
                        {myData?.queryData.isFetching ? <LittleSpinner/> : <>&nbsp;&nbsp;&nbsp;</>}
                    </div>
                </button>
                {
                    hasFatherAccess && <div>
                    <button
                      className={"btn-white-border-mir flex  text-center justify-center"}

                      onClick={deleteLogsHandler}
                    >
                      حذف منتخب
                    </button>
                  </div>
                }
            </div>
        </div>
    );
};

export default TopTableLogsComponent;