import React, {useState} from 'react';
import {FaTrash} from 'react-icons/fa'; // Importing the delete icon


const ExceptionListDepartments = ({setAdminSettingData, adminSettingData, departmentList}) => {

    let departmentListArray = adminSettingData?.exceptionFromChangeFactorTagList?.split(",");

    // remove ['']  from array if exist
    departmentListArray = departmentListArray.filter((row: string) => row !== '')
    if (!departmentListArray) {
        departmentListArray = []
    }

    // console.log(departmentListArray)
    // تبدیل اون رشته از استرینگ ها به  آرایه ای از آبجکت ها بر اساس لیست دپارتمان ها برای نمایش
    const departmentListArrayOfObjects = departmentListArray?.map((t) => {
        const row = {name: "", id: ""};

        row.name = departmentList?.find(row => row.value === t)?.key;
        row.id = t;
        return row
    });
    const removeFromArrayList = (id) => {
        const searchString = id + ","
        const exceptionFromChangeFactorTagList = adminSettingData.exceptionFromChangeFactorTagList.replace(searchString, "")
        setAdminSettingData({exceptionFromChangeFactorTagList})

    }
    const addToArrayList = (id: string) => {

        // اول چک کنم ببینم این آی دی توی لیست آرایه  هست یا نه اگه بود که هیچی اگه نبود اضافه کن

        const existId = departmentListArrayOfObjects?.find(i => i.id === id);
        if (existId) return;

        const newString = id + ","
        const exceptionFromChangeFactorTagList = adminSettingData.exceptionFromChangeFactorTagList + newString;

        setAdminSettingData({exceptionFromChangeFactorTagList})
    }
    try {
        return (
            <div className={'border border-2 rounded  p-3 mt-3'}>
                <div> دپارتمان هایی که توی حالت ویرایش تگ فاکتور رو تغییر نمیدن</div>

                <div className='div__group__input_select'>
                    <label htmlFor={'customerDepartment'}>{'انتخاب دپارتمان'}</label>
                    <select
                        onChange={event => addToArrayList(event.target.value)}
                        name="customerDepartment" id="customerDepartment">
                        {departmentList?.map((row: any, index: React.Key) => <option key={index}
                                                                                     value={row.value}>{row.key}</option>)}
                    </select>
                </div>


                <div className={'border border-2 rounded flex flex-wrap shadow  min_height_45 mt-3'}>
                    {departmentListArrayOfObjects?.map((row, index) => {
                        return <div key={index}
                                    className={'bg-gray-300 flex flex-wrap items-center px-1 m-1'}
                        >
                            <span className={'text-red-700'} onClick={() => removeFromArrayList(row.id)}>
                                <FaTrash/>
                            </span>&nbsp;<span>{row.name}</span>
                        </div>
                    })}
                </div>
            </div>)
    } catch (error) {
        return <>{error.toString()}</>
    }
};

export default ExceptionListDepartments;
