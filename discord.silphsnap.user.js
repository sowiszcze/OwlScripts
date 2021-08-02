// ==UserScript==
// @name         Silph Snap participant fetcher
// @namespace    https://sowiszcze.it/
// @downloadURL  https://github.com/sowiszcze/owlscripts/discord.silphsnap.user.js
// @homepageURL  https://github.com/sowiszcze/owlscripts
// @version      1.0-alpha
// @description  This userscript enables you to go through Silph Snap entries and fetch ID's of participants at will.
// @author       @Sowiszcze
// @match        https://discord.com/channels/182100886938451969/*
// @icon         https://www.google.com/s2/favicons?domain=thesilphroad.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// @require      https://userscripts-mirror.org/scripts/source/107941.user.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @connect      sil.ph
// ==/UserScript==

(function() {
    'use strict';

    var addSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 512 512" width="16"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm112 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0"/></svg>';
    var updateSVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="16" height="16" viewBox="0 0 487.23 487.23"><path d="M55.323,203.641c15.664,0,29.813-9.405,35.872-23.854c25.017-59.604,83.842-101.61,152.42-101.61    c37.797,0,72.449,12.955,100.23,34.442l-21.775,3.371c-7.438,1.153-13.224,7.054-14.232,14.512    c-1.01,7.454,3.008,14.686,9.867,17.768l119.746,53.872c5.249,2.357,11.33,1.904,16.168-1.205    c4.83-3.114,7.764-8.458,7.796-14.208l0.621-131.943c0.042-7.506-4.851-14.144-12.024-16.332    c-7.185-2.188-14.947,0.589-19.104,6.837l-16.505,24.805C370.398,26.778,310.1,0,243.615,0C142.806,0,56.133,61.562,19.167,149.06    c-5.134,12.128-3.84,26.015,3.429,36.987C29.865,197.023,42.152,203.641,55.323,203.641z"/><path d="M464.635,301.184c-7.27-10.977-19.558-17.594-32.728-17.594c-15.664,0-29.813,9.405-35.872,23.854    c-25.018,59.604-83.843,101.61-152.42,101.61c-37.798,0-72.45-12.955-100.232-34.442l21.776-3.369    c7.437-1.153,13.223-7.055,14.233-14.514c1.009-7.453-3.008-14.686-9.867-17.768L49.779,285.089    c-5.25-2.356-11.33-1.905-16.169,1.205c-4.829,3.114-7.764,8.458-7.795,14.207l-0.622,131.943    c-0.042,7.506,4.85,14.144,12.024,16.332c7.185,2.188,14.948-0.59,19.104-6.839l16.505-24.805    c44.004,43.32,104.303,70.098,170.788,70.098c100.811,0,187.481-61.561,224.446-149.059    C473.197,326.043,471.903,312.157,464.635,301.184z"/></svg>';
    var removeSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 512 512" width="16"><path d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"/></svg>';

GM_addStyle(`.sspf {
    margin-left: 8px;
    -webkit-box-shadow: var(--elevation-stroke);
    box-shadow: var(--elevation-stroke);
    border-radius: 4px;
}

.sspf button {
    color: var(--interactive-normal);
    background-color: var(--background-primary);
}

.sspf button:hover {
    color: var(--interactive-hover);
    background-color: var(--background-secondary);
}

.sspf button[disabled] {
    color: var(--interactive-muted);
    background-color: var(--background-tertiary);
}`);

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function getUserId(html) {
        return parseInt(/^\s+user_id:\s+(\d+)\s+},\s+/gmi.exec(html)[1]).toString(16).toUpperCase();
    }

    function getMessageObject(target) {
        return $(target).closest('div[data-list-item-id^="chat-messages"]');
    }

    function getHeaderObject(target) {
        return $(target).closest('[aria-label="Channel header"]');
    }

    function getMessageContentObject(message) {
        return message.find('div[class*="messageContent"]');
    }

    function getCardLink(message) {
        var content = getMessageContentObject(message);
        if (content.length == 0) return null;

        var links = content.find('a[href*="sil.ph"]');
        if (links.length == 0) return null;

        return links.attr('href');
    }

    function getMessageAttachmentsObject(message) {
        return message.find('div[class^="messageAttachment"]');
    }

    function getPictureLink(message) {
        var attachments = getMessageAttachmentsObject(message);
        if (attachments.length == 0) return null;

        var images = attachments.find('img[src]');
        if (images.length == 0) return null;

        return images.parent().attr('href');
    }

    function getMessageButtons(message) {
        return message.find('.sspf');
    }

    function getHeaderButtons(header) {
        return header.find('.sspf');
    }

    function hasMessageButtons(message) {
        return getMessageButtons(message).length > 0;
    }

    function hasHeaderButtons(header) {
        return getHeaderButtons(header).length > 0;
    }

    function toggleMessageButtons(buttonContainer, toggle) {
        if (toggle) {
            enableButton(buttonContainer, 'add');
            disableButton(buttonContainer, 'update');
            disableButton(buttonContainer, 'remove');
            disableButton(buttonContainer, 'preview');
        }
        else {
            disableButton(buttonContainer, 'add');
            enableButton(buttonContainer, 'update');
            enableButton(buttonContainer, 'remove');
            enableButton(buttonContainer, 'preview');
        }
    }

    function toggleHeaderButtons(buttonContainer, toggle) {
        if (toggle) {
            enableButton(buttonContainer, 'save');
            enableButton(buttonContainer, 'clear');
        }
        else {
            disableButton(buttonContainer, 'save');
            disableButton(buttonContainer, 'clear');
        }
    }

    function updateStorage() {
        GM_setValue(getChannelPath(), databaseObject);
    }

    function onAddButtonClick(e) {
        var button = $(e.target);
        if (button.is('[disabled]')) return false;

        var message = getMessageObject(button);
        var data = getData(message);
        var id = getId(message);

        databaseObject[id] = data;
        updateStorage();

        fetchUserId(data.Id, data.Card);

        toggleMessageButtons(getMessageButtons(message), false);

        return false;
    }

    function onUpdateButtonClick(e) {
        var button = $(e.target);
        if (button.is('[disabled]')) return false;

        var message = getMessageObject(button);
        var newData = getData(message);
        var id = getId(message);
        var data = databaseObject[id];

        for (var key in newData) {
            if (newData.hasOwnProperty(key)) {
                data[key] = newData[key];
            }
        }

        if (!data.hasOwnProperty('UserId')) {
            fetchUserId(data.Id, data.Card);
        }

        databaseObject[id] = data;
        updateStorage();

        return false;
    }

    function onRemoveButtonClick(e) {
        var button = $(e.target);
        if (button.is('[disabled]')) return false;

        var message = getMessageObject(button);
        var id = getId(message);

        delete databaseObject[id];
        updateStorage();

        toggleMessageButtons(getMessageButtons(message), true);

        return false;
    }

    function onPreviewButtonClick(e) {
        var button = $(e.target);
        if (button.is('[disabled]')) return false;

        var message = getMessageObject(button);
        var id = getId(message);

        alert(toHumanReadable(databaseObject[id]));

        return false;
    }

    function onSaveButtonClick(e) {
        var button = $(e.target);
        if (button.is('[disabled]')) return false;

        download(getChannelPath().replace('/', '_') + '.csv', stringifyDatabase());

        return false;
    }

    function onClearButtonClick(e) {
        var button = $(e.target);
        if (button.is('[disabled]')) return false;

        databaseObject = {};
        updateStorage();

        return false;
    }

    function createMessageButtons() {
        var button = $('<span class="sspf"><button class="addButton" title="Add">' + '+' + '</button><button class="updateButton disabled" title="Update" disabled="disabled">' + '&gt;' + '</button><button class="removeButton disabled" title="Remove" disabled="disabled">' + '-' + '</button><button class="previewButton disabled" title="Preview" disabled="disabled">' + '?' + '</button></span>');

        button.find('.addButton').on('click', onAddButtonClick);
        button.find('.updateButton').on('click', onUpdateButtonClick);
        button.find('.removeButton').on('click', onRemoveButtonClick);
        button.find('.previewButton').on('click', onPreviewButtonClick);

        return button;
    }

    function createHeaderButtons() {
        var button = $('<span class="sspf"><button class="saveButton disabled" disabled="disabled">Save</button><button class="clearButton disabled" disabled="disabled">Clear</button></span>');

        button.find('.saveButton').on('click', onSaveButtonClick);
        button.find('.clearButton').on('click', onClearButtonClick);

        return button;
    }

    function disableButton(buttonContainer, type) {
        var button = buttonContainer.find('.' + type + 'Button');
        button.addClass('disabled');
        button.attr('disabled', 'disabled');
    }

    function enableButton(buttonContainer, type) {
        var button = buttonContainer.find('.' + type + 'Button');
        button.removeClass('disabled');
        button.removeAttr('disabled');
    }

    function getChannelPath() {
        return window.location.pathname.replace('/channels/', '');
    }

    function getId(message) {
        return getChannelPath() + '/' + message.attr('id').replace('chat-messages-', '');
    }

    function getData(message) {
        var data = {};

        data.Id = getId(message);
        data.DiscordUser = message.find('h2 span[class*="username"]').text();
        data.Date = Date.parse(message.find('h2 span[class*="timestamp"] time').attr('datetime'));
        data.MessageLink = 'https://discord.com/channels/' + data.Id;
        data.Card = getCardLink(message);
        data.Picture = getPictureLink(message);

        return data;
    }

    function stringifyDatabase() {
        var result = "Entry ID\tDiscord username\tSilph ID\tUnix date\tMessage link\tCard link\tImage link\n";
        for (var key in databaseObject) {
            if (databaseObject.hasOwnProperty(key)) {
                var d = databaseObject[key];
                result += d.Id +"\t" + d.DiscordUser + "\t" + d.UserId + "\t" + d.Date + "\t" + d.MessageLink + "\t" + d.Card + "\t" + d.Picture + "\n";
            }
        }
        return result;
    }

    function toHumanReadable(entry) {
        return 'Entry ID: ' + entry.Id + "\n" +
            'Discord username: ' + entry.DiscordUser + "\n" +
            'Silph ID: ' + entry.UserId + "\n" +
            'Unix date: ' + entry.Date + "\n" +
            'Message link: ' + entry.MessageLink + "\n" +
            'Card link: ' + entry.Card + "\n" +
            'Image link: ' + entry.Picture;
    }

    function isValidMessage(message) {
        return !!getCardLink(message) || !!getPictureLink(message);
    }

    function fetchUserId(id, cardUrl) {
        if (!cardUrl) {
            return;
        }

        GM_xmlhttpRequest({
            method: 'GET',
            url: cardUrl,
            onabort: function onabort() { GM_log('Aborted fetching card ' + cardUrl); },
            onerror: function onerror() { GM_log('Error fetching card ' + cardUrl); },
            ontimeout: function ontimeout() { GM_log('Timeout fetching card ' + cardUrl); },
            onload: function onload(result) {
                var userId = getUserId(result.responseText);
                databaseObject[id].UserId = userId;
                updateStorage();
            }
        });
    }

    function dbHasEntry(id) {
        return databaseObject.hasOwnProperty(id);
    }

    function dbIsNotEmpty() {
        for (var key in databaseObject) {
            if (databaseObject.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    }

    var databaseObject = GM_getValue(getChannelPath(), {});

    function addMessageButtons(e) {
        var message = getMessageObject(e.target);
        if (hasMessageButtons(message) || !isValidMessage(message)) {
            return false;
        }

        var buttons = createMessageButtons();
        var id = getId(message);
        if (dbHasEntry(id)) {
            toggleMessageButtons(buttons, false)
        }
        message.find('h2[class^="header"]').append(buttons);

        return false;
    }

    function removeMessageButtons(e) {
        var message = getMessageObject(e.target);
        if (!hasMessageButtons(message)) {
            return false;
        }

        getMessageButtons(message).remove();

        return false;
    }

    function addHeaderButtons(e) {
        var header = getHeaderObject(e.target);
        if (hasHeaderButtons(header)) {
            return false;
        }

        var buttons = createHeaderButtons();
        if (dbIsNotEmpty()) {
            toggleHeaderButtons(buttons, true)
        }
        buttons.insertAfter(header.find('[class^="title"]'));

        return false;
    }

    function removeHeaderButtons(e) {
        var header = getHeaderObject(e.target);
        if (!hasHeaderButtons(header)) {
            return false;
        }

        getHeaderButtons(header).remove();

        return false;
    }

    $(function onLoad() {
        var messageSelector = '[data-list-id="chat-messages"] > div[role="listitem"]';
        var headerSelector = '[aria-label="Channel header"]';

        $(document).on('mouseenter', messageSelector, addMessageButtons);
        $(document).on('mouseleave', messageSelector, removeMessageButtons);

        $(document).on('mouseenter', headerSelector, addHeaderButtons);
        $(document).on('mouseleave', headerSelector, removeHeaderButtons);
    });
})();