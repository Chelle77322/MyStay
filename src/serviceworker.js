const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||// [::1] is the IPv6 localhost address.window.location.hostname == '[::1]; || 
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
export default function register() {
    if(process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator){
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
        if(publicUrl.origin !== window.location.origin) {
            return;
        }
    window.addEventListener('load', () => {
        const serviceUrl = `{process.env/PUBLIC_URL}/serviceworker.js`;
        if (isLocalhost){
            checkValidServiceWorker(serviceUrl);
            navigator.serviceWorker.ready.then(() =>
            {
                console.log('This web app is being served cache-first by a service worker');
            });
        } else {
            registerValidSW(serviceUrl);
        }
    });
    }
}
function registerValidSW(serviceUrl) {
    navigator.serviceWorker.register(serviceUrl).then(registration => {
        registration.onupdatefound = () => {
            const installWorker = registration.installing;
            installWorker.onstatechange = () => {
                if(installWorker.state === 'installed'){
                    if(navigator.serviceWorker.controller){
                        console.log('New content is available, You may need to refresh to see it');
                    } else {
                        console.log('Content is cached for offline use');
                    }
                }
            };
        };
    }).catch(error => {
        console.error('Error during service worker registration:', error);
    });
}
function checkValidServiceWorker(serviceUrl) {
    fetch(serviceUrl).then (response => {
        if(
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1){
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister().then(() => {
                    window.location.reload();
                });
            });
        } else {
            registerValidSW(serviceUrl);
        }
    }).catch (() => {
        console.log(
        'No internet connection was detected. App is running offline');
    });
}
export function unregister() {
    if('serviceWorker' in navigator){
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}