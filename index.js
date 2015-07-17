(function (window, document, undefined) {

    console.debug('index ======');

    var UI = ['app', 'header', 'feedback', 'status', 'buttonTrack', 'inputName']
        .reduce(function (fold, el) {
            fold[el] = document.querySelector('.js-' + el);
            return fold;
        }, {});

    var DEFAULT_URL = 'http://localhost:9876';

    var checkConnection = function () {
        return fetch(DEFAULT_URL + '/status')
            .then(function () {
                console.debug('here() ======', arguments);
            })
            .catch(function (err) {
                console.debug('err() ======', arguments);
                UI.status.classList.add('status--down');
                UI.buttonTrack.disabled = true;
                UI.feedback.classList.remove('u-hide');
                UI.feedback.classList.add('feedback--error');
            });
    }

    UI.buttonTrack.addEventListener('click', function (e) {

        var name = UI.inputName.value;

        console.debug('clicked button() ======');
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'ic:track', name: UI.inputName.value }, function (response) {
                console.log(response);
            });
        });
    });

    UI.inputName.focus();
    checkConnection();

})(window, document);
