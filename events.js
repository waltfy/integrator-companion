(function (window, document, undefined) {

    console.debug('events.js ======');

    var DEFAULT_URL = 'http://localhost:9876';

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.debug('index: received message ======');
        console.debug('request:', request);
        switch (request.action) {
            case 'ic:element:new':
                sendResponse({ message: 'Spec \'' + request.name + '\' created successfully.' });
                sendNewSpec(request);
                break;
            default:
                break;
        }
    });

    var sendNewSpec = function (spec) {
        console.debug('sendNewSpec() ======', arguments);
        fetch(DEFAULT_URL + '/track', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(spec)
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.debug('data:', data);
        });
    };

})(window, document);
