import React from 'react';

const EmptyRow = () => {
    return (
        <div>
            <ul className={'min_height_45'}>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0].map(r => <li>&nbsp;</li>)}
            </ul>
            <ul className={'min_height_45'}>
                {[0, 0, 0, 0, 0, 0, 0, 0, 0].map(r => <li>&nbsp;</li>)}
            </ul>

        </div>
    );
};

export default EmptyRow;
