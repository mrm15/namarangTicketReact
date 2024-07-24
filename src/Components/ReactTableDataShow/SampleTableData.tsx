import React from 'react';
import TestComponent from "./TestComponent.tsx";
import {
    HesabfaTimeStampWithTToPersianTime,
} from "../../utils/utilsFunction.tsx";
import {useNavigate} from "react-router-dom";
import {PAGES} from "../../Pages/Route-string.tsx";
import ForwardOnClick from "../../ReportBill/ForwardOnClick.tsx";

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

const test = <TestComponent/>;

export const data: Person[] = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 25,
        email: 'john@example.com',
        address: '123 Main St',
        phoneNumber: '555-1234',
        occupation: 'Engineer',
        company: 'Tech Co',
        country: 'USA',
        city: 'New York',
        zipCode: '10001',
        state: 'NY',
        status: 'Active',
        additionalField1: 'Value1',
        additionalField2: 'Value2',
        additionalField3: 'Value3',
        additionalField4: 'Value4',
        additionalField5: 'Value5',
        additionalField6: 'Value6',
        additionalField7: 'Value7',
        additionalField8: 'Value8',
        additionalField9: 'Value9',
        additionalField10: 'Value10',
        additionalField11: 'Value11',
        additionalField12: 'Value12',
        additionalField13: 'Value13',
        additionalField14: 'Value14',
        additionalField15: 'Value15',
        additionalField16: 'Value16',
        additionalField17: 'Value17',
        additionalField18: 'Value18',
        additionalField19: 'Value19',
        additionalField20: 'Value20',
        additionalField21: 'Value21',
        additionalField22: 'Value22',
        additionalField23: 'Value23',
        additionalField24: 'Value24',
        additionalField25: 'Value25'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        age: 30,
        email: 'jane@example.com',
        address: '456 Elm St',
        phoneNumber: '555-5678',
        occupation: 'Designer',
        company: 'Creative Inc',
        country: 'USA',
        city: 'Los Angeles',
        zipCode: '90001',
        state: 'CA',
        status: 'Active'
    },
    {
        id: 3,
        firstName: 'Alice',
        lastName: 'Johnson',
        age: 28,
        email: 'alice@example.com',
        address: '789 Oak St',
        phoneNumber: '555-8765',
        occupation: 'Developer',
        company: 'WebWorks',
        country: 'USA',
        city: 'San Francisco',
        zipCode: '94101',
        state: 'CA',
        status: 'Inactive'
    },
    {
        id: 4,
        firstName: 'Bob',
        lastName: 'Brown',
        age: 35,
        email: 'bob@example.com',
        address: '101 Pine St',
        phoneNumber: '555-4321',
        occupation: 'Manager',
        company: 'Business Corp',
        country: 'USA',
        city: 'Chicago',
        zipCode: '60601',
        state: 'IL',
        status: 'Active'
    },
    {
        id: 5,
        firstName: 'Charlie',
        lastName: 'Davis',
        age: 40,
        email: 'charlie@example.com',
        address: '202 Cedar St',
        phoneNumber: '555-6789',
        occupation: 'CEO',
        company: 'Startup Inc',
        country: 'USA',
        city: 'Austin',
        zipCode: '73301',
        state: 'TX',
        status: 'Active'
    },
    {
        id: 6,
        firstName: 'Diana',
        lastName: 'Miller',
        age: 27,
        email: 'diana@example.com',
        address: '303 Birch St',
        phoneNumber: '555-9876',
        occupation: 'Analyst',
        company: 'Finance LLC',
        country: 'USA',
        city: 'Boston',
        zipCode: '02101',
        state: 'MA',
        status: 'Inactive'
    },
    {
        id: 7,
        firstName: 'Eve',
        lastName: 'Wilson',
        age: 32,
        email: 'eve@example.com',
        address: '404 Maple St',
        phoneNumber: '555-5432',
        occupation: 'Consultant',
        company: 'Consulting Co',
        country: 'USA',
        city: 'Seattle',
        zipCode: '98101',
        state: 'WA',
        status: 'Active'
    },
    {
        id: 8,
        firstName: 'Frank',
        lastName: 'Garcia',
        age: 45,
        email: 'frank@example.com',
        address: '505 Walnut St',
        phoneNumber: '555-2109',
        occupation: 'Sales',
        company: 'Retail Inc',
        country: 'USA',
        city: 'Miami',
        zipCode: '33101',
        state: 'FL',
        status: 'Active'
    },
    {
        id: 9,
        firstName: 'Grace',
        lastName: 'Martinez',
        age: 38,
        email: 'grace@example.com',
        address: '606 Ash St',
        phoneNumber: '555-8765',
        occupation: 'Marketing',
        company: 'Media Co',
        country: 'USA',
        city: 'Dallas',
        zipCode: '75201',
        state: 'TX',
        status: 'Inactive'
    },
    {
        id: 10,
        firstName: 'Hank',
        lastName: 'Lopez',
        age: 50,
        email: 'hank@example.com',
        address: '707 Redwood St',
        phoneNumber: '555-1230',
        occupation: 'CFO',
        company: 'Big Corp',
        country: 'USA',
        city: 'Houston',
        zipCode: '77001',
        state: 'TX',
        status: 'Active'
    },
    {
        id: 11,
        firstName: 'Ivy',
        lastName: 'White',
        age: 29,
        email: 'ivy@example.com',
        address: '808 Spruce St',
        phoneNumber: '555-3214',
        occupation: 'Scientist',
        company: 'Lab Co',
        country: 'USA',
        city: 'San Diego',
        zipCode: '92101',
        state: 'CA',
        status: 'Active'
    },
    {
        id: 12,
        firstName: 'Jack',
        lastName: 'Kim',
        age: 33,
        email: 'jack@example.com',
        address: '909 Cypress St',
        phoneNumber: '555-6543',
        occupation: 'Teacher',
        company: 'School',
        country: 'USA',
        city: 'Portland',
        zipCode: '97201',
        state: 'OR',
        status: 'Inactive'
    },
    {
        id: 13,
        firstName: 'Karen',
        lastName: 'Clark',
        age: 26,
        email: 'karen@example.com',
        address: '1010 Palm St',
        phoneNumber: '555-7890',
        occupation: 'Artist',
        company: 'Gallery',
        country: 'USA',
        city: 'Las Vegas',
        zipCode: '89101',
        state: 'NV',
        status: 'Active'
    },
    {
        id: 14,
        firstName: 'Leo',
        lastName: 'Young',
        age: 42,
        email: 'leo@example.com',
        address: '1111 Fir St',
        phoneNumber: '555-9876',
        occupation: 'Lawyer',
        company: 'Legal Co',
        country: 'USA',
        city: 'Phoenix',
        zipCode: '85001',
        state: 'AZ',
        status: 'Active'
    },
    {
        id: 15,
        firstName: 'Mona',
        lastName: 'Hall',
        age: 36,
        email: 'mona@example.com',
        address: '1212 Oak St',
        phoneNumber: '555-5432',
        occupation: 'Accountant',
        company: 'Accounting LLC',
        country: 'USA',
        city: 'Denver',
        zipCode: '80201',
        state: 'CO',
        status: 'Inactive'
    },
    {
        id: 16,
        firstName: 'Nick',
        lastName: 'King',
        age: 31,
        email: 'nick@example.com',
        address: '1313 Pine St',
        phoneNumber: '555-8765',
        occupation: 'Pilot',
        company: 'Airlines',
        country: 'USA',
        city: 'Atlanta',
        zipCode: '30301',
        state: 'GA',
        status: 'Active'
    },
    {
        id: 17,
        firstName: 'Olivia',
        lastName: 'Lewis',
        age: 24,
        email: 'olivia@example.com',
        address: '1414 Cedar St',
        phoneNumber: '555-4321',
        occupation: 'Chef',
        company: 'Restaurant',
        country: 'USA',
        city: 'Nashville',
        zipCode: '37201',
        state: 'TN',
        status: 'Active'
    },
    {
        id: 18,
        firstName: 'Paul',
        lastName: 'Walker',
        age: 39,
        email: 'paul@example.com',
        address: '1515 Elm St',
        phoneNumber: '555-2109',
        occupation: 'Musician',
        company: 'Band',
        country: 'USA',
        city: 'Memphis',
        zipCode: '38101',
        state: 'TN',
        status: 'Inactive'
    },
    {
        id: 19,
        firstName: 'Quincy',
        lastName: 'Harris',
        age: 27,
        email: 'quincy@example.com',
        address: '1616 Birch St',
        phoneNumber: '555-6543',
        occupation: 'Photographer',
        company: 'Studio',
        country: 'USA',
        city: 'Charlotte',
        zipCode: '28201',
        state: 'NC',
        status: 'Active'
    },
    {
        id: 20,
        firstName: 'Rachel',
        lastName: 'Martinez',
        age: 34,
        email: 'rachel@example.com',
        address: '1717 Maple St',
        phoneNumber: '555-3214',
        occupation: 'Architect',
        company: 'Design Co',
        country: 'USA',
        city: 'Orlando',
        zipCode: '32801',
        state: 'FL',
        status: 'Active'
    },
    {
        id: 21,
        firstName: 'Sam',
        lastName: 'Hernandez',
        age: 37,
        email: 'sam@example.com',
        address: '1818 Walnut St',
        phoneNumber: '555-7890',
        occupation: 'Builder',
        company: 'Construction Co',
        country: 'USA',
        city: 'Philadelphia',
        zipCode: '19101',
        state: 'PA',
        status: 'Inactive'
    },
    {
        id: 22,
        firstName: 'Tina',
        lastName: 'Robinson',
        age: 29,
        email: 'tina@example.com',
        address: '1919 Cypress St',
        phoneNumber: '555-8765',
        occupation: 'Nurse',
        company: 'Hospital',
        country: 'USA',
        city: 'Detroit',
        zipCode: '48201',
        state: 'MI',
        status: 'Active'
    },
    {
        id: 23,
        firstName: 'Uma',
        lastName: 'Martinez',
        age: 32,
        email: 'uma@example.com',
        address: '2020 Redwood St',
        phoneNumber: '555-4321',
        occupation: 'Therapist',
        company: 'Clinic',
        country: 'USA',
        city: 'San Antonio',
        zipCode: '78201',
        state: 'TX',
        status: 'Active'
    },
    {
        id: 24,
        firstName: 'Victor',
        lastName: 'Jackson',
        age: 41,
        email: 'victor@example.com',
        address: '2121 Palm St',
        phoneNumber: '555-2109',
        occupation: 'Actor',
        company: 'Film Studio',
        country: 'USA',
        city: 'San Diego',
        zipCode: '92101',
        state: 'CA',
        status: 'Inactive'
    },
    {
        id: 25,
        firstName: 'Wendy',
        lastName: 'Lee',
        age: 45,
        email: 'wendy@example.com',
        address: '2222 Spruce St',
        phoneNumber: '555-6543',
        occupation: 'Writer',
        company: 'Publisher',
        country: 'USA',
        city: 'San Jose',
        zipCode: '95101',
        state: 'CA',
        status: 'Active'
    },
    {
        id: 26,
        firstName: 'Xander',
        lastName: 'Rodriguez',
        age: 27,
        email: 'xander@example.com',
        address: '2323 Oak St',
        phoneNumber: '555-3214',
        occupation: 'Engineer',
        company: 'Tech Solutions',
        country: 'USA',
        city: 'Phoenix',
        zipCode: '85001',
        state: 'AZ',
        status: 'Active'
    },
    {
        id: 27,
        firstName: 'Yvonne',
        lastName: 'Kim',
        age: 34,
        email: 'yvonne@example.com',
        address: '2424 Maple St',
        phoneNumber: '555-7890',
        occupation: 'Doctor',
        company: 'Health Center',
        country: 'USA',
        city: 'Las Vegas',
        zipCode: '89101',
        state: 'NV',
        status: 'Inactive'
    },
    {
        id: 28,
        firstName: 'Zach',
        lastName: 'Clark',
        age: 30,
        email: 'zach@example.com',
        address: '2525 Pine St',
        phoneNumber: '555-9876',
        occupation: 'Designer',
        company: 'Creative Works',
        country: 'USA',
        city: 'Portland',
        zipCode: '97201',
        state: 'OR',
        status: 'Active'
    },
    {
        id: 29,
        firstName: 'Amber',
        lastName: 'White',
        age: 36,
        email: 'amber@example.com',
        address: '2626 Cedar St',
        phoneNumber: '555-5432',
        occupation: 'Scientist',
        company: 'BioTech',
        country: 'USA',
        city: 'San Francisco',
        zipCode: '94101',
        state: 'CA',
        status: 'Active'
    },
    {
        id: 30,
        firstName: 'Brian',
        lastName: 'King',
        age: 31,
        email: 'brian@example.com',
        address: '2727 Elm St',
        phoneNumber: '555-8765',
        occupation: 'Teacher',
        company: 'High School',
        country: 'USA',
        city: 'Seattle',
        zipCode: '98101',
        state: 'WA',
        status: 'Inactive'
    },
    {
        id: 31,
        firstName: 'Catherine',
        lastName: 'Hall',
        age: 42,
        email: 'catherine@example.com',
        address: '2828 Birch St',
        phoneNumber: '555-3214',
        occupation: 'Artist',
        company: 'Art Gallery',
        country: 'USA',
        city: 'Miami',
        zipCode: '33101',
        state: 'FL',
        status: 'Active'
    },
    {
        id: 32,
        firstName: 'David',
        lastName: 'Lewis',
        age: 24,
        email: 'david@example.com',
        address: '2929 Walnut St',
        phoneNumber: '555-7890',
        occupation: 'Pilot',
        company: 'Airways',
        country: 'USA',
        city: 'Orlando',
        zipCode: '32801',
        state: 'FL',
        status: 'Inactive'
    },
    {
        id: 33,
        firstName: 'Elena',
        lastName: 'Walker',
        age: 39,
        email: 'elena@example.com',
        address: '3030 Redwood St',
        phoneNumber: '555-2109',
        occupation: 'Musician',
        company: 'Band',
        country: 'USA',
        city: 'Dallas',
        zipCode: '75201',
        state: 'TX',
        status: 'Active'
    },
    {
        id: 34,
        firstName: 'Frank',
        lastName: 'Harris',
        age: 27,
        email: 'frank@example.com',
        address: '3131 Palm St',
        phoneNumber: '555-6543',
        occupation: 'Photographer',
        company: 'Photo Studio',
        country: 'USA',
        city: 'Houston',
        zipCode: '77001',
        state: 'TX',
        status: 'Inactive'
    },
    {
        id: 35,
        firstName: 'Gina',
        lastName: 'Martinez',
        age: 34,
        email: 'gina@example.com',
        address: '3232 Spruce St',
        phoneNumber: '555-3214',
        occupation: 'Architect',
        company: 'Design Hub',
        country: 'USA',
        city: 'Atlanta',
        zipCode: '30301',
        state: 'GA',
        status: 'Active'
    },
    {
        id: 36,
        firstName: 'Hank',
        lastName: 'Hernandez',
        age: 37,
        email: 'hank@example.com',
        address: '3333 Oak St',
        phoneNumber: '555-7890',
        occupation: 'Builder',
        company: 'Construction Inc',
        country: 'USA',
        city: 'Charlotte',
        zipCode: '28201',
        state: 'NC',
        status: 'Active'
    },
    {
        id: 37,
        firstName: 'Ivy',
        lastName: 'Robinson',
        age: 29,
        email: 'ivy@example.com',
        address: '3434 Maple St',
        phoneNumber: '555-8765',
        occupation: 'Nurse',
        company: 'Hospital',
        country: 'USA',
        city: 'New York',
        zipCode: '10001',
        state: 'NY',
        status: 'Inactive'
    },
    {
        id: 38,
        firstName: 'Jack',
        lastName: 'Jackson',
        age: 32,
        email: 'jack@example.com',
        address: '3535 Cedar St',
        phoneNumber: '555-4321',
        occupation: 'Therapist',
        company: 'Mental Health Co',
        country: 'USA',
        city: 'Chicago',
        zipCode: '60601',
        state: 'IL',
        status: 'Active'
    },
    {
        id: 39,
        firstName: 'Karen',
        lastName: 'Lee',
        age: 41,
        email: 'karen@example.com',
        address: '3636 Elm St',
        phoneNumber: '555-2109',
        occupation: 'Actor',
        company: 'Stage Co',
        country: 'USA',
        city: 'San Francisco',
        zipCode: '94101',
        state: 'CA',
        status: 'Active'
    },
    {
        id: 40,
        firstName: 'Leo',
        lastName: 'Rodriguez',
        age: 45,
        email: 'leo@example.com',
        address: '3737 Spruce St',
        phoneNumber: '555-6543',
        occupation: 'Writer',
        company: 'Publishing House',
        country: 'USA',
        city: 'Los Angeles',
        zipCode: '90001',
        state: 'CA',
        status: 'Inactive'
    },
    {
        id: 41,
        firstName: 'Mona',
        lastName: 'Kim',
        age: 27,
        email: 'mona@example.com',
        address: '3838 Redwood St',
        phoneNumber: '555-3214',
        occupation: 'Engineer',
        company: 'Tech Innovators',
        country: 'USA',
        city: 'Austin',
        zipCode: '73301',
        state: 'TX',
        status: 'Active'
    },
    {
        id: 42,
        firstName: 'Nick',
        lastName: 'Clark',
        age: 34,
        email: 'nick@example.com',
        address: '3939 Palm St',
        phoneNumber: '555-7890',
        occupation: 'Doctor',
        company: 'HealthCare',
        country: 'USA',
        city: 'San Antonio',
        zipCode: '78201',
        state: 'TX',
        status: 'Inactive'
    },
];




export const columns: {
    [key: string]: any;
    id: any
}[] = [
    {accessorKey: 'RowId', header: 'ردیف', id: 'RowId',},
    {accessorKey: 'Id', header: 'Id', id: 'Id', size: 80},
    {
        accessorKey: 'Date', header: 'تاریخ', id: 'Date',
        cell: (info: any) => <span className={"px-3 rounded cursor-pointer"}>{
            // timeStampToPersianTime(+dateFromHesabfaToTimeStamp(info.getValue()))
            HesabfaTimeStampWithTToPersianTime(info.getValue())
        }</span>,

    },
    // {accessorKey: 'DueDate', header: 'تاریخ سر رسید', id: 'DueDate', size: 150},
    {accessorKey: 'ContactTitle', header: 'عنوان مشتری ', id: 'ContactTitle', size: 150},
    {
        accessorKey: 'orderNumber', header: 'کد سفارش', id: 'orderNumber', size: 250,
        cell: (value) => <ForwardOnClick
            value={value.getValue()} NewPage={PAGES.ticket_chat_list}
            options={{state: {id: value.getValue()}}}
        />
    },
    {accessorKey: 'sellerName', header: 'فروشنده', id: 'sellerName', size: 200},
    {accessorKey: 'Number', header: 'شماره فاکتور', id: 'Number', size: 150,

        cell: (value) => <div className={"flex"}>
            <span>
                <ForwardOnClick
                    value={value.getValue()} NewPage={PAGES.submit_bill}
                    options={{state:  {
                            data : {billNumber: value.getValue()}}
                    }}
                />
            </span>
            &nbsp;&nbsp;
            <span className={'bg-blue-400 rounded px-2'}>
                <a target={"_blank"} href={PAGES.showBill + "/" +  value.getValue()}>{"مشاهده"}</a>
                {/*<ForwardOnClick*/}
                {/*    value={value.getValue()} NewPage={PAGES.showBill}*/}
                {/*    options={{state:  {*/}
                {/*            data : {billNumber: value.getValue()}}*/}
                {/*    }}*/}
                {/*    text={"مشاهده"}*/}
                {/*/>*/}
            </span>
        </div>
    },
    {accessorKey: 'Project', header: 'پروژه', id: 'Project', size: 150},
    {accessorKey: 'Sum', header: 'جمع فاکتور', id: 'Sum', size: 100},
    // {accessorKey: 'occupation', header: 'Occupation', id: 'occupation', size: 150},
    // {accessorKey: 'company', header: 'Company', id: 'company', size: 150},
    // {accessorKey: 'country', header: 'Country', id: 'country', size: 100},
    // {accessorKey: 'city', header: 'City', id: 'city', size: 100},
    // {accessorKey: 'zipCode', header: 'Zip Code', id: 'zipCode', size: 100},
    // {accessorKey: 'state', header: 'State', id: 'state', size: 100},
    // {accessorKey: 'status', header: 'Status', id: 'status', size: 100},
    // {accessorKey: 'additionalField1', header: 'Additional Field 1', id: 'additionalField1', size: 150},
    // {accessorKey: 'additionalField2', header: 'Additional Field 2', id: 'additionalField2', size: 150},
    // {accessorKey: 'additionalField3', header: 'Additional Field 3', id: 'additionalField3', size: 150},
    // {accessorKey: 'additionalField4', header: 'Additional Field 4', id: 'additionalField4', size: 150},
    // {accessorKey: 'additionalField5', header: 'Additional Field 5', id: 'additionalField5', size: 150},
    // {accessorKey: 'additionalField6', header: 'Additional Field 6', id: 'additionalField6', size: 150},
    // {accessorKey: 'additionalField7', header: 'Additional Field 7', id: 'additionalField7', size: 150},
    // {accessorKey: 'additionalField8', header: 'Additional Field 8', id: 'additionalField8', size: 150},
    // {accessorKey: 'additionalField9', header: 'Additional Field 9', id: 'additionalField9', size: 150},
    // {accessorKey: 'additionalField10', header: 'Additional Field 10', id: 'additionalField10', size: 150},
    // {accessorKey: 'additionalField11', header: 'Additional Field 11', id: 'additionalField11', size: 150},
    // {accessorKey: 'additionalField12', header: 'Additional Field 12', id: 'additionalField12', size: 150},
    // {accessorKey: 'additionalField13', header: 'Additional Field 13', id: 'additionalField13', size: 150},
    // {accessorKey: 'additionalField14', header: 'Additional Field 14', id: 'additionalField14', size: 150},
    // {accessorKey: 'additionalField15', header: 'Additional Field 15', id: 'additionalField15', size: 150},
    // {accessorKey: 'additionalField16', header: 'Additional Field 16', id: 'additionalField16', size: 150},
    // {accessorKey: 'additionalField17', header: 'Additional Field 17', id: 'additionalField17', size: 150},
    // {accessorKey: 'additionalField18', header: 'Additional Field 18', id: 'additionalField18', size: 150},
    // {accessorKey: 'additionalField19', header: 'Additional Field 19', id: 'additionalField19', size: 150},
    // {accessorKey: 'additionalField20', header: 'Additional Field 20', id: 'additionalField20', size: 150},
    // {accessorKey: 'additionalField21', header: 'Additional Field 21', id: 'additionalField21', size: 150},
    {accessorKey: 'Status', header: 'وضعیت فاکتور', id: 'Status', size: 150},
    {accessorKey: 'ContactCode', header: 'کد مشتری', id: 'ContactCode', size: 150},
];

