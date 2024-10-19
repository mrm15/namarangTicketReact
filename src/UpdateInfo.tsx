import React, {useEffect, useState} from 'react';

const UpdateInfo = () => {

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'CACHE_UPDATED') {
                    // Show the modal when a new version is available
                    //setModalOpen(true);
                    alert(`
                    قابلیت نمایش ستون جمع فاکتور برای تایید کردن فاکتور توی این آپدیت اضافه شد.
                    
                    `)
                }
            });
        }
    }, []);

    return <div></div>

};

export default UpdateInfo;
