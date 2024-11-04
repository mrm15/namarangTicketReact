import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoiceDollar, FaClipboardCheck, FaTruck } from 'react-icons/fa';
import {PAGES} from "../../../../Pages/Route-string.tsx";

const CustomerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">داشبورد</h1>

            <section className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-3">میانبرها</h2>

                <div className="flex gap-2" >
                    <button
                        onClick={() => navigate(PAGES.showMyBillListForCustomer)}
                        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-md text-lg flex items-center space-x-2 transition duration-300"
                    >
                        <FaFileInvoiceDollar className="text-2xl" />
                        &nbsp;
                        <span>فاکتورهای من</span>
                    </button>

                    <button
                        onClick={() => navigate(PAGES.ticket_Create)}
                        className="bg-green-400 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-md text-lg flex items-center space-x-2 transition duration-300"
                    >
                        <FaClipboardCheck className="text-2xl" />
                        &nbsp;
                        <span>ثبت سفارش</span>
                    </button>

                    <button
                        onClick={() => navigate(PAGES.ticket_created_by_me)}
                        className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-4 px-6 rounded-md text-lg flex items-center space-x-2 transition duration-300"
                    >
                        <FaTruck className="text-2xl" />
                        &nbsp;
                        <span>پیگیری سفارش</span>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default CustomerDashboard;
