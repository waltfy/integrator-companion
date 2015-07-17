(function (window, document, undefined) {

    console.debug('content ======');

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.debug('content: received message ======');
        switch (request.action) {
            case 'ic:track':
                sendResponse({ ack: true });
                track(request)
                    .then(function (res) {
                        chrome.runtime.sendMessage(res, function (response) {
                            alert(response.message);
                        });
                    });
                break;
            default:
                break;
        }
    });

    var track = function (spec) {
        console.debug('track() ======', arguments);

        if (!spec.name) {
            alert('A spec must have a name. You provided nothing. Try again.');
            return Promise.resolve({ action: 'ic:error:new' });
        }

        alert('Please click on the element you would like to create a spec for under the name: ' + spec.name);

        return new Promise(function (resolve, reject) {

            function handler(e) {
                e.preventDefault();
                console.debug('handler() ======', arguments);
                resolve({ el: e.target.outerHTML, name: spec.name, action: 'ic:element:new' });
                window.removeEventListener('click', handler, true);
            };

            window.addEventListener('click', handler, true);
        });
    };

})(window, document);
