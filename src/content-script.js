console.log('Content Script Loaded');

chrome.runtime.onMessage.addListener(function (message) {
    console.log('Content Script - Message received', message);
});