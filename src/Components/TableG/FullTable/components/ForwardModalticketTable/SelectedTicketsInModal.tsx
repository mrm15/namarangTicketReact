import React from 'react';

const SelectedTicketsInModal = ({selectedItems}) => {
    try{
        return (

            <div className={'ticket__show__in__modal__table'}>
                {/*{JSON.stringify(selectedItems)}*/}

                <ul>
                    {/*<li>ردیف</li>*/}
                    <li>عنوان</li>
                    <li>شماره تیکت</li>
                    {/*<li>توضیحات</li>*/}
                </ul>
                {selectedItems.map((singleTicket, index) => {


                    return <ul key={index} className={''}>

                            {/*<li className={'w-1'}>{index + 1}</li>*/}
                            <li className={''}>{singleTicket?.title}</li>
                            <li className={''}>{singleTicket?.ticketNumber}</li>
                            {/*<li className={''}>{singleTicket?.description}</li>*/}

                    </ul>
                })}


            </div>
        );
    }catch (error){
        return <div>{error.toString()}</div>
    }
};

export default SelectedTicketsInModal;
