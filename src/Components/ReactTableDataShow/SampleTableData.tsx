import React from 'react';
import TestComponent from "./TestComponent.tsx";

export type Person = {
    id: number;
    firstName: string;
    lastName: any;
    age: number;
    email: string;
    address: string;
    phoneNumber: string;
    occupation: string;
    company: string;
    country: string;
    city: string;
    zipCode: string;
    state: string;
    status: string;
    additionalField1?: string;
    additionalField2?: string;
    additionalField3?: string;
    additionalField4?: string;
    additionalField5?: string;
    additionalField6?: string;
    additionalField7?: string;
    additionalField8?: string;
    additionalField9?: string;
    additionalField10?: string;
    additionalField11?: string;
    additionalField12?: string;
    additionalField13?: string;
    additionalField14?: string;
    additionalField15?: string;
    additionalField16?: string;
    additionalField17?: string;
    additionalField18?: string;
    additionalField19?: string;
    additionalField20?: string;
    additionalField21?: string;
    additionalField22?: string;
    additionalField23?: string;
    additionalField24?: string;
    additionalField25?: string;
};

const test = <TestComponent />;

export const data: Person[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 25, email: 'john@example.com', address: '123 Main St', phoneNumber: '555-1234', occupation: 'Engineer', company: 'Tech Co', country: 'USA', city: 'New York', zipCode: '10001', state: 'NY', status: 'Active', additionalField1: 'Value1', additionalField2: 'Value2', additionalField3: 'Value3', additionalField4: 'Value4', additionalField5: 'Value5', additionalField6: 'Value6', additionalField7: 'Value7', additionalField8: 'Value8', additionalField9: 'Value9', additionalField10: 'Value10', additionalField11: 'Value11', additionalField12: 'Value12', additionalField13: 'Value13', additionalField14: 'Value14', additionalField15: 'Value15', additionalField16: 'Value16', additionalField17: 'Value17', additionalField18: 'Value18', additionalField19: 'Value19', additionalField20: 'Value20', additionalField21: 'Value21', additionalField22: 'Value22', additionalField23: 'Value23', additionalField24: 'Value24', additionalField25: 'Value25' },
    // Add more rows as needed
];

export const columns = [
    { accessorKey: 'id', header: 'ID', id: 'id', size: 80 },
    { accessorKey: 'firstName', header: 'First Name', id: 'firstName', size: 150 },
    { accessorKey: 'lastName', header: 'Last Name', id: 'lastName', size: 150 },
    { accessorKey: 'age', header: 'Age', id: 'age', size: 100 },
    { accessorKey: 'email', header: 'Email', id: 'email', size: 200 },
    { accessorKey: 'address', header: 'Address', id: 'address', size: 250 },
    { accessorKey: 'phoneNumber', header: 'Phone Number', id: 'phoneNumber', size: 150 },
    { accessorKey: 'occupation', header: 'Occupation', id: 'occupation', size: 150 },
    { accessorKey: 'company', header: 'Company', id: 'company', size: 150 },
    { accessorKey: 'country', header: 'Country', id: 'country', size: 100 },
    { accessorKey: 'city', header: 'City', id: 'city', size: 100 },
    { accessorKey: 'zipCode', header: 'Zip Code', id: 'zipCode', size: 100 },
    { accessorKey: 'state', header: 'State', id: 'state', size: 100 },
    { accessorKey: 'status', header: 'Status', id: 'status', size: 100 },
    { accessorKey: 'additionalField1', header: 'Additional Field 1', id: 'additionalField1', size: 150 },
    { accessorKey: 'additionalField2', header: 'Additional Field 2', id: 'additionalField2', size: 150 },
    { accessorKey: 'additionalField3', header: 'Additional Field 3', id: 'additionalField3', size: 150 },
    { accessorKey: 'additionalField4', header: 'Additional Field 4', id: 'additionalField4', size: 150 },
    { accessorKey: 'additionalField5', header: 'Additional Field 5', id: 'additionalField5', size: 150 },
    { accessorKey: 'additionalField6', header: 'Additional Field 6', id: 'additionalField6', size: 150 },
    { accessorKey: 'additionalField7', header: 'Additional Field 7', id: 'additionalField7', size: 150 },
    { accessorKey: 'additionalField8', header: 'Additional Field 8', id: 'additionalField8', size: 150 },
    { accessorKey: 'additionalField9', header: 'Additional Field 9', id: 'additionalField9', size: 150 },
    { accessorKey: 'additionalField10', header: 'Additional Field 10', id: 'additionalField10', size: 150 },
    { accessorKey: 'additionalField11', header: 'Additional Field 11', id: 'additionalField11', size: 150 },
    { accessorKey: 'additionalField12', header: 'Additional Field 12', id: 'additionalField12', size: 150 },
    { accessorKey: 'additionalField13', header: 'Additional Field 13', id: 'additionalField13', size: 150 },
    { accessorKey: 'additionalField14', header: 'Additional Field 14', id: 'additionalField14', size: 150 },
    { accessorKey: 'additionalField15', header: 'Additional Field 15', id: 'additionalField15', size: 150 },
    { accessorKey: 'additionalField16', header: 'Additional Field 16', id: 'additionalField16', size: 150 },
    { accessorKey: 'additionalField17', header: 'Additional Field 17', id: 'additionalField17', size: 150 },
    { accessorKey: 'additionalField18', header: 'Additional Field 18', id: 'additionalField18', size: 150 },
    { accessorKey: 'additionalField19', header: 'Additional Field 19', id: 'additionalField19', size: 150 },
    { accessorKey: 'additionalField20', header: 'Additional Field 20', id: 'additionalField20', size: 150 },
    { accessorKey: 'additionalField21', header: 'Additional Field 21', id: 'additionalField21', size: 150 },
    { accessorKey: 'additionalField22', header: 'Additional Field 22', id: 'additionalField22', size: 150 },
    { accessorKey: 'additionalField23', header: 'Additional Field 23', id: 'additionalField23', size: 150 },
    { accessorKey: 'additionalField24', header: 'Additional Field 24', id: 'additionalField24', size: 150 },
    { accessorKey: 'additionalField25', header: 'Additional Field 25', id: 'additionalField25', size: 150 },
];

