export { }


chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    // if (request.jwt) {
        console.log('Token ::: ', request);
        sendResponse({ success: true, message: 'Token has been received' });
    // }
});