import React from 'react';

const EmptyRow = () => {
    return (
        <>
            <tr className={'min_height_45'}>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((r,index) => <li key={index}>&nbsp;</li>)}
            </tr>
            <tr className={'min_height_45'}>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0].map((r,index) => <li key={index}>&nbsp;</li>)}
            </tr>

        </>
    );
};

export default EmptyRow;
