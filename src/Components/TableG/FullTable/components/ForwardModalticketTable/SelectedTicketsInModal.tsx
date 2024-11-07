import React from 'react';

const SelectedTicketsInModal = ({ selectedItems }) => {
    try {
        return (
            <div className="ticket__show__in__modal__table  max-w-md mx-auto">
                <ul className="flex justify-between items-center border-b-2 pb-2 mb-2 text-gray-700 text-sm">
                    <li>عنوان</li>
                    <li>شماره تیکت</li>
                </ul>
                {selectedItems.map((singleTicket, index) => (
                    <ul
                        key={index}
                        className="flex justify-between items-center border-b py-2 text-gray-600 hover:bg-blue-50 transition-all"
                    >
                        <li className="text-sm font-medium">{singleTicket?.title}</li>
                        <li className="text-sm">{singleTicket?.ticketNumber}</li>
                    </ul>
                ))}
            </div>
        );
    } catch (error) {
        return <div className="text-red-500">{error.toString()}</div>;
    }
};

export default SelectedTicketsInModal;
