import React, { useEffect, useState } from 'react';

const App = () => {
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    const [showInstallMessage, setShowInstallMessage] = useState(true);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            debugger
            e.preventDefault();
            setInstallPrompt(e);
            setShowInstallMessage(true); // Show your custom install message
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (installPrompt) {
            installPrompt.prompt(); // Show the install prompt
            installPrompt.userChoice.then((choiceResult: any) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setInstallPrompt(null);
                setShowInstallMessage(false); // Hide the custom install message
            });
        }
    };

    return (
        <div>
            {/* Your app components */}
            {showInstallMessage && (
                <div className="install-banner">
                    <p>Install this app on your device for a better experience.</p>
                    <button
                        className={"btn-gay-mir"}
                        onClick={handleInstallClick}>Install</button>
                </div>
            )}
        </div>
    );
};

export default App;
