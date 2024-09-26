import React from 'react';
import DepartmentList from "./DepartmentList.tsx";

const UsualUserViewSection = ({mode, setSelectedData, destinationUserList}) => {
    return (
        <div>
            <div>
                <div className={' flex gap-2'}>
                    <div className={'w-full'}>
                        <div> انتخاب کاربر</div>
                        <DepartmentList
                            myOptions={destinationUserList}
                            myKey={'user'}
                            setSelectedData={setSelectedData}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UsualUserViewSection;
