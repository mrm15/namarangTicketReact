import React from 'react';

const EmptyRow = () => {
    return (
        <>
            <tr>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((r,index) => <td key={index}><div>&nbsp;</div></td>)}
            </tr>
            <tr>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((r,index) => <td key={index}><div>&nbsp;</div></td>)}
            </tr>

        </>
    );
};

export default EmptyRow;
