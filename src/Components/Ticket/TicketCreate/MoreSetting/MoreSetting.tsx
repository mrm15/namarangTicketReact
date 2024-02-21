import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CollapsibleSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border rounded-md overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 cursor-pointer" onClick={toggleSection}>
                <h2 className="text-lg font-semibold">{title}</h2>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div
                className={`transition-all duration-300 ${isOpen ? 'h-auto opacity-100' : 'h-0 opacity-0'} overflow-hidden`}
            >
                <div className="px-4 py-2">{children}</div>
            </div>
        </div>
    );
};

export default CollapsibleSection;
