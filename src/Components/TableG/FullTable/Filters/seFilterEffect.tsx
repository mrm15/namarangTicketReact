import { useEffect } from 'react';
import { filterOfDataTypeObject } from '../../myTableGTypes.tsx';

interface UseFilterEffectProps {
    debouncedQuery: { value: any; showValue: any };
    operator: string;
    uniqueId: string;
    property: string;
    myData: any;
    setMyData: (data: any) => void;
}

const useFilterEffect = ({
                             debouncedQuery,
                             operator,
                             uniqueId,
                             property,
                             myData,
                             setMyData,
                         }: UseFilterEffectProps) => {
    useEffect(() => {
        const filters = myData.filters;
        let newFilterArray = [...filters]; // Create a copy of the existing filters array

        if (debouncedQuery.value?.length === 0) {
            // Remove the filter if the query is empty
            newFilterArray = filters.filter(
                (item: filterOfDataTypeObject) => item.uniqueId !== uniqueId
            );
        } else {
            // Find the existing filter object by key
            const existingIndex = newFilterArray.findIndex(
                (item: filterOfDataTypeObject) => item.uniqueId === uniqueId
            );

            if (existingIndex !== -1) {
                // Update the value of the existing filter object
                newFilterArray[existingIndex].value = debouncedQuery.value;
                newFilterArray[existingIndex].showValue = debouncedQuery.showValue;
                newFilterArray[existingIndex].operator = operator;
            } else {
                // Add a new filter object
                newFilterArray.push({
                    uniqueId,
                    property,
                    operator: operator,
                    value: debouncedQuery.value,
                    showValue: debouncedQuery.showValue,
                });
            }
        }

        // Update the myData state with the new filters array
        setMyData({
            filters: newFilterArray,
        });
    }, [debouncedQuery, operator,]);
};

export default useFilterEffect;
