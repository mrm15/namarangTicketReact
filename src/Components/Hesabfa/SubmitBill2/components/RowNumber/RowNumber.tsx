import React, {useState} from 'react';
import {useSubmitBillContext} from "../../submitBillContext";
import Modal from "../../../../Modal/Modal.tsx";

const RowNumber = ({text, Id}) => {
    const [isOpenModal, setIsOpenModal] = useState(false); // State to manage the visibility of the modal
    const [newRowNumber, setNewRowNumber] = useState(text); // State to manage the new row number input by the user
    const [errorMessage, setErrorMessage] = useState(""); // State to manage the error message

    // Function to open the modal
    const openModal = () => {
        setNewRowNumber(text); // Reset to the current row number when opening the modal
        setErrorMessage(""); // Clear the error message when opening the modal
        setIsOpenModal(true);
    }

    // Function to close the modal
    const closeModal = () => setIsOpenModal(false);

    const {data, setData} = useSubmitBillContext(); // Get data and setData function from context
    const invoice = data.invoice; // Extract invoice data from the context

    // Function to update the order of items in the invoice
    const setNewOrderItems = () => {
        // Create a copy of the current invoice items
        const currentItems = [...invoice.InvoiceItems];

        // Find the index of the item to be moved
        const currentIndex = currentItems.findIndex(item => item.Id === Id);
        const newIndex = newRowNumber - 1;

        // Validate the new index to ensure it's within valid bounds
        if (currentIndex === -1 || newIndex < 0 || newIndex >= currentItems.length) {
            setErrorMessage(`یک مقدار بین 1 و ${currentItems.length} وارد کنید`);
            return;
        }

        // Move the item to the new position by removing it from the current index and inserting it at the new index
        const movedItem = currentItems.splice(currentIndex, 1)[0];
        currentItems.splice(newIndex, 0, movedItem);

        // Update RowIds to match the new order of items
        currentItems.forEach((item, index) => item.RowId = index + 1);

        // Update the invoice data with the new order of items
        setData({
            ...data,
            invoice: {
                ...invoice,
                InvoiceItems: currentItems
            }
        });

        // Close the modal after updating the order
        closeModal();
    }

    // Function to handle submitting the new row number
    const submitChangeRow = () => {
        // Convert the new row number to a number type
        const newValue = +(newRowNumber);
        const itemLength = invoice.InvoiceItems.length;

        // Check if the new row number is within valid bounds
        const isValid = (newValue > 0) && (newValue <= itemLength);
        if (!isValid) {
            setErrorMessage(`یک مقدار بین 1 و ${itemLength} وارد کنید`);
            return;
        }

        // Call the function to update the order of items
        setNewOrderItems();
    }

    return (
        <>
            {isOpenModal && (
                <Modal
                    showButtons={false} // Disable default buttons
                    closeModal={closeModal} // Function to close the modal
                    title={"شماره ردیف را وارد کنید"} // Title of the modal
                >
                    <div className={"text-xs text-red-600 h-3.5 overflow-hidden"}>
                        {/* Display error message if there is any */}
                        {errorMessage.length > 0 && errorMessage}
                    </div>
                    <div className="div__group__input_select">
                        <input
                            type={"number"} // Input type is number
                            onChange={(e) => {
                                setNewRowNumber(e.target.value); // Update the new row number state
                                setErrorMessage(""); // Clear error message when the user starts typing
                            }}
                            value={newRowNumber} // Set the value of the input to newRowNumber state
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') { // If the user presses Enter, submit the change
                                    submitChangeRow();
                                }
                            }}
                        />
                    </div>

                    <div className={"text-center mt-2"}>
                        <button
                            onClick={submitChangeRow} // Submit the change when the button is clicked
                            className={"btn-green-mir"}
                        >
                            تایید
                        </button>
                    </div>
                </Modal>
            )}
            <div
                onClick={openModal} // Open the modal when the text is clicked
                className={"px-3 cursor-pointer"}
            >
                {text}
            </div>
        </>
    );
}

export default RowNumber;
