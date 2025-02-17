import React from 'react';

const ShotUploadSection = () => {
    return (
        <div className={"border-2 rounded"}>
            ShotUploadSection

            <input
            type={"file"}
            multiple={true}

            />
        </div>
    );
};

export default ShotUploadSection;