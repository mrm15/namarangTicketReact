import {useState, useCallback} from 'react';

// Define the type for the custom hook
type DataSetter<T> = (keyValuePairs: Partial<T>) => void;

const useObjectDataHolder = <T extends object>(initialObject: T): [T, DataSetter<T>] => {
    const [data, setData] = useState<T>(initialObject);

    const dataSetter = useCallback((keyValuePairs: Partial<T>) => {
        setData(prevData => ({...prevData, ...keyValuePairs}));
    }, []);

    return [data, dataSetter];
}

export default useObjectDataHolder;
