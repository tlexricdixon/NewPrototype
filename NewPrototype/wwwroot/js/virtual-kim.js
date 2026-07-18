(function () {
    'use strict';

    var root = document.querySelector('[data-virtual-kim]');
    var catalog = window.VirtualKimCatalog;

    if (!root || !catalog) {
        return;
    }

    var launcher = root.querySelector('[data-kim-launcher]');
    var panel = root.querySelector('[data-kim-panel]');
    var closeButton = root.querySelector('[data-kim-close]');
    var messages = root.querySelector('[data-kim-messages]');
    var quickActions = root.querySelector('[data-kim-quick-actions]');
    var form = root.querySelector('[data-kim-form]');
    var input = root.querySelector('[data-kim-input]');
    var concept = {
        number: root.dataset.conceptNumber || '1',
        name: root.dataset.conceptName || 'Command'
    };
    var storageKeys = {
        open: 'virtual-kim-open',
        responses: 'virtual-kim-responses'
    };
    var conversationReady = false;

    function readSession(key, fallback) {
        try {
            var value = window.sessionStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch (error) {
            return fallback;
        }
    }

    function writeSession(key, value) {
        try {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // The demo remains usable when storage is blocked or unavailable.
        }
    }

    function normalize(value) {
        return value
            .toLocaleLowerCase('en-US')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9'\s-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function formatMessage(message) {
        return message
            .replaceAll('{conceptNumber}', concept.number)
            .replaceAll('{conceptName}', concept.name);
    }

    function appendMessage(author, message, links) {
        var item = document.createElement('article');
        var label = document.createElement('span');
        var body = document.createElement('p');

        item.className = 'virtual-kim__message virtual-kim__message--' + author;
        item.setAttribute('aria-label', author === 'kim' ? 'Kim' : 'You');
        label.className = 'visually-hidden';
        label.textContent = author === 'kim' ? 'Kim says:' : 'You asked:';
        body.textContent = formatMessage(message);
        item.append(label, body);

        if (Array.isArray(links) && links.length > 0) {
            var list = document.createElement('ul');

            links.forEach(function (link) {
                var listItem = document.createElement('li');
                var anchor = document.createElement('a');

                anchor.href = link.href;
                anchor.textContent = link.label;
                listItem.append(anchor);
                list.append(listItem);
            });

            item.append(list);
        }

        messages.append(item);
        messages.scrollTop = messages.scrollHeight;
    }

    function getIntent(id) {
        return catalog.intents.find(function (intent) {
            return intent.id === id;
        });
    }

    function appendApprovedResponse(response) {
        if (response.type === 'quick') {
            var quickResponse = catalog.quickActions[response.id];
            if (quickResponse) {
                appendMessage('kim', quickResponse.message, quickResponse.links);
            }
            return;
        }

        if (response.type === 'intent') {
            var intent = getIntent(response.id);
            if (intent) {
                appendMessage('kim', intent.message, intent.links);
            }
            return;
        }

        appendMessage('kim', catalog.fallbackMessage, []);
    }

    function rememberResponse(response) {
        var history = readSession(storageKeys.responses, []);

        if (!Array.isArray(history)) {
            history = [];
        }

        history.push(response);
        writeSession(storageKeys.responses, history.slice(-8));
    }

    function ensureConversation() {
        if (conversationReady) {
            return;
        }

        appendMessage('kim', catalog.openingMessage, []);

        var history = readSession(storageKeys.responses, []);
        if (Array.isArray(history)) {
            history.forEach(appendApprovedResponse);
        }

        conversationReady = true;
    }

    function setOpen(isOpen, moveFocus) {
        panel.hidden = !isOpen;
        launcher.setAttribute('aria-expanded', String(isOpen));
        root.classList.toggle('virtual-kim--open', isOpen);
        writeSession(storageKeys.open, isOpen);

        if (moveFocus) {
            if (isOpen) {
                window.setTimeout(function () {
                    input.focus();
                }, 0);
            } else {
                launcher.focus();
            }
        }
    }

    function patternMatches(question, pattern) {
        return question === pattern || question.includes(pattern);
    }

    function findIntent(question) {
        var normalizedQuestion = normalize(question);
        var emergency = getIntent('emergency');

        if (emergency.patterns.some(function (pattern) {
            return patternMatches(normalizedQuestion, normalize(pattern));
        })) {
            return emergency;
        }

        var bestMatch = null;
        var bestScore = 0;

        catalog.intents.forEach(function (intent) {
            if (intent.id === 'emergency') {
                return;
            }

            intent.patterns.forEach(function (pattern) {
                var normalizedPattern = normalize(pattern);

                if (!patternMatches(normalizedQuestion, normalizedPattern)) {
                    return;
                }

                var score = normalizedPattern.split(' ').length * 100 + normalizedPattern.length;
                if (normalizedQuestion === normalizedPattern) {
                    score += 1000;
                }

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = intent;
                }
            });
        });

        return bestMatch;
    }

    launcher.addEventListener('click', function () {
        setOpen(true, false);
        ensureConversation();
        input.focus();
    });

    closeButton.addEventListener('click', function () {
        setOpen(false, true);
    });

    quickActions.addEventListener('click', function (event) {
        var button = event.target.closest('[data-kim-action]');
        if (!button) {
            return;
        }

        var id = button.dataset.kimAction;
        var response = catalog.quickActions[id];

        if (!response) {
            return;
        }

        appendMessage('user', button.textContent.trim(), []);
        appendMessage('kim', response.message, response.links);
        rememberResponse({ type: 'quick', id: id });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var question = input.value.trim();
        if (!question) {
            input.focus();
            return;
        }

        appendMessage('user', question, []);
        input.value = '';

        var intent = findIntent(question);
        if (intent) {
            appendMessage('kim', intent.message, intent.links);
            rememberResponse({ type: 'intent', id: intent.id });
        } else {
            appendMessage('kim', catalog.fallbackMessage, []);
            rememberResponse({ type: 'fallback' });
        }

        input.focus();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !panel.hidden) {
            setOpen(false, true);
        }
    });

    if (readSession(storageKeys.open, false) === true) {
        ensureConversation();
        setOpen(true, false);
    }
}());
