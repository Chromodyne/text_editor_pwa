const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {

    //Remove bar on mobile
    event.preventDefault();

    window.deferredPrompt = event;

    butInstall.classList.toggle("hidden", false);

});


//butInstall event listener
butInstall.addEventListener('click', async () => {

    //Install event set to a deferred prompt as per docs.
    const installEvent = window.deferredPrompt;

    //If not an install event then return from the event listener.
    if (!installEvent) {
        return;
    }

    //Display prompt with install event.
    installEvent.prompt();
    window.deferredPrompt = null;

    //Set install button hidden when app is installed.
    butInstall.classList.toggle("hidden", true);

});

//If app is installed then set deferred prompt null.
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
