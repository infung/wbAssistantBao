$(function () {
    /*chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (!tab.url.includes('weibo.com')) {
            disableButtons();
        }
    });*/
    showSendbutton = function () {
        $('#sendbutton').show();
        $('#stopbutton').hide();
        $('#okbutton').hide();
    };
    showStopbutton = function () {
        $('#stopbutton').show();
        $('#sendbutton').hide();
        $('#okbutton').hide();
    };
    showOkbutton = function () {
        $('#okbutton').show();
        $('#sendbutton').hide();
        $('#stopbutton').hide();
    };
    disableInputs = function () {
        $("input").each(function () {
            $(this).attr('disabled', 'disabled');
        });
        $("textarea").each(function () {
            $(this).attr('disabled', 'disabled');
        });
    };
    enableInputs = function () {
        $("input").each(function () {
            $(this).removeAttr('disabled');
        });
        $("textarea").each(function () {
            $(this).removeAttr('disabled');
        });
    }
    setState = function (msg) {
        var spCheckInSofar = false;
        var amanCommentSofar = false;
        var readingSofar = false;
        var searchingSofar = false;
        var tagSearchSofar = false;
        var wbPostSofar = '';

        var repostSofar = '';
        var commentSofar = '';
        var likeSofar = '';

        if (!jQuery.isEmptyObject(msg)) {
            if (msg['spCheckInStatus']) spCheckInSofar = true;
            if (msg['amanCommentStatus']) amanCommentSofar = true;
            if (msg['readingStatus']) readingSofar = true;
            if (msg['searchingStatus']) searchingSofar = true;
            if (msg['tagSearchStatus']) tagSearchSofar = true;
            if ((msg['wbPostCount'] != null && msg['wbPostCount'] > 0) || !!msg['wbPostMsg']) {
                wbPostSofar = '已发送' + msg['wbPostCount'] + '条。' + msg['wbPostMsg'];
            }
            if ((msg['repostCount'] != null && msg['repostCount'] > 0) || !!msg['repostMsg']) {
                repostSofar = '已转发' + msg['repostCount'] + '条。' + msg['repostMsg'];
            }
            if ((msg['commentCount'] != null && msg['commentCount'] > 0) || !!msg['commentMsg']) {
                commentSofar = '已评论' + msg['commentCount'] + '条。' + msg['commentMsg'];
            }
            if ((msg['likeCount'] != null && msg['likeCount'] > 0) || !!msg['likeMsg']) {
                likeSofar = '已点赞' + msg['likeCount'] + '个。' + msg['likeMsg'];
            }
        }

        if (spCheckInSofar) {
            $('#spCheckInStatus').show();
        } else {
            $('#spCheckInStatus').hide();
        }
        if (amanCommentSofar) {
            $('#amanCommentStatus').show();
        } else {
            $('#amanCommentStatus').hide();
        }
        if (readingSofar) {
            $('#readingStatus').show();
        } else {
            $('#readingStatus').hide();
        }
        if (searchingSofar) {
            $('#searchingStatus').show();
        } else {
            $('#searchingStatus').hide();
        }
        if (tagSearchSofar) {
            $('#tagSearchStatus').show();
        } else {
            $('#tagSearchStatus').hide();
        }
        $('#wbPostSofar').text(wbPostSofar);

        $('#currentRepost').text(repostSofar);
        $('#currentComment').text(commentSofar);
        $('#currentLike').text(likeSofar);
    }
    setView = function (details) {
        if (details['weiboDataControl']) {
            $('#weiboDataControl').prop('checked', true);
        } else {
            $('#weiboDataControl').prop('checked', false);
        }

        if (details['zpzControl']) {
            $('#zpzControl').prop('checked', true);
        } else {
            $('#zpzControl').prop('checked', false);
        }

        if (details['spCheckIn']) {
            $('#spCheckIn').prop('checked', true);
        } else {
            $('#spCheckIn').prop('checked', false);
        }
        if (details['amanComment']) {
            $('#amanComment').prop('checked', true);
        } else {
            $('#amanComment').prop('checked', false);
        }
        if (details['reading']) {
            $('#reading').prop('checked', true);
        } else {
            $('#reading').prop('checked', false);
        }
        if (details['searching']) {
            $('#searching').prop('checked', true);
        } else {
            $('#searching').prop('checked', false);
        }
        if (details['tagSearch']) {
            $('#tagSearch').prop('checked', true);
        } else {
            $('#tagSearch').prop('checked', false);
        }
        $('#wbPostInput').val(details['wbPostInput']);
        $('#wbPostTag').val(details['wbPostTag']);
        if (details['wbPostOrigin'] === 'mainPage') {
            $('#mainPage').prop('checked', true);
            $('#superTopic').prop('checked', false);
        } else if (details['wbPostOrigin'] === 'superTopic') {
            $('#mainPage').prop('checked', false);
            $('#superTopic').prop('checked', true);
        }
        $('#weiboUrl').val(details['weiboUrl']);
        $('#repostInput').val(details['repostInput']);
        $('#commentInput').val(details['commentInput']);
        $('#likeInput').val(details['likeInput']);
        $('#repostContent').val(details['repostContent']);
        $('#commentContent').val(details['commentContent']);
        if (details['randomRepost']) {
            $('#repostContent').attr('disabled', 'disabled');
            $('#randomRepost').prop('checked', true);
        } else {
            $('#repostContent').removeAttr('disabled');
            $('#randomRepost').prop('checked', false);
        }
        if (details['randomComment']) {
            $('#commentContent').attr('disabled', 'disabled');
            $('#randomComment').prop('checked', true);
        } else {
            $('#commentContent').removeAttr('disabled');
            $('#randomComment').prop('checked', false);
        }
        if (details['likeOrigin']) {
            $('#likeOrigin').prop('checked', true);
        } else {
            $('#likeOrigin').prop('checked', false);
        }
    }

    setInput = function () {
        var weiboDataControl = $('#weiboDataControl').is(":checked");
        var zpzControl = $('#zpzControl').is(":checked");

        var spCheckIn = $('#spCheckIn').is(":checked");
        var amanComment = $('#amanComment').is(":checked");
        var reading = $('#reading').is(":checked");
        var searching = $('#searching').is(":checked");
        var tagSearch = $('#tagSearch').is(":checked");
        var wbPostInput = $('#wbPostInput').val();
        var wbPostTag = $('#wbPostTag').val();
        var wbPostOrigin = 'superTopic';
        if ($('#mainPage').is(":checked")) {
            wbPostOrigin = 'mainPage';
        }
        wbPostInput = wbPostInput - 0;
        if (spCheckIn == null) spCheckIn = true;
        if (amanComment == null) amanComment = true;
        if (reading == null) reading = false;
        if (searching == null) searching = false;
        if (tagSearch == null) tagSearch = false;
        if (wbPostInput == null || isNaN(wbPostInput)) wbPostInput = 0;
        if (wbPostTag == null || !wbPostTag) wbPostTag = '';

        var weiboUrl = $('#weiboUrl').val();
        var repostInput = $('#repostInput').val();
        var repostContent = $('#repostContent').val();
        var randomRepost = $('#randomRepost').is(":checked");
        var commentInput = $('#commentInput').val();
        var commentContent = $('#commentContent').val();
        var randomComment = $('#randomComment').is(":checked");
        var likeInput = $('#likeInput').val();
        var likeOrigin = $('#likeOrigin').is(":checked");
        repostInput = repostInput - 0;
        commentInput = commentInput - 0;
        likeInput = likeInput - 0;
        if (weiboUrl == null || !weiboUrl) weiboUrl = '';
        if (repostInput == null || isNaN(repostInput)) repostInput = 0;
        if (commentInput == null || isNaN(commentInput)) commentInput = 0;
        if (likeInput == null || isNaN(likeInput)) likeInput = 0;
        if (repostContent == null || !repostContent) repostContent = '';
        if (randomRepost == null) randomRepost = false;
        if (commentContent == null || !commentContent) commentContent = '';
        if (randomComment == null) randomComment = false;
        if (likeOrigin == null) likeOrigin = true;

        chrome.runtime.sendMessage(null, {
            'type': 'input',
            'from': 'popup',
            'activeInput': {
                'weiboDataControl': weiboDataControl,
                'zpzControl': zpzControl,
                'spCheckIn': spCheckIn,
                'amanComment': amanComment,
                'reading': reading,
                'searching': searching,
                'tagSearch': tagSearch,
                'wbPostOrigin': wbPostOrigin,
                'wbPostInput': wbPostInput,
                'wbPostTag': wbPostTag,
                'weiboUrl': weiboUrl,
                'repostInput': repostInput,
                'commentInput': commentInput,
                'likeInput': likeInput,
                'repostContent': repostContent,
                'randomRepost': randomRepost,
                'commentContent': commentContent,
                'randomComment': randomComment,
                'likeOrigin': likeOrigin
            }
        }, null, function (msg) {
            if (!!msg) {
                console.log(msg);
            }
        });
    }

    sendbuttonToggle = function () {
        console.log('send');
        var weiboDataControl = $('#weiboDataControl').is(":checked");
        var zpzControl = $('#zpzControl').is(":checked");
        if (weiboDataControl || zpzControl) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                disableInputs();
                showStopbutton();
                chrome.runtime.sendMessage(null, {
                    'type': 'start',
                    'from': 'popup',
                    'tabId': tabs[0]["id"],
                }, null, function (result) {
                    if (!result.isSuccess) {
                        showOkbutton();
                    }
                    if (result.msg) {
                        alert(result.msg);
                    }
                });
            });
        }
    }

    stopbuttonToggle = function () {
        console.log('stop');
        chrome.runtime.sendMessage(null, { 'type': 'stop', 'from': 'popup' }, null, function (result) {
            if (result) {
                showOkbutton();
            }
        });
    }

    okbuttonToggle = function () {
        console.log('ok');
        chrome.runtime.sendMessage(null, { 'type': 'reset', 'from': 'popup' }, null, function (msg) {
            console.log('ok response from background: ' + JSON.stringify(msg));
            enableInputs();
            showSendbutton();
            setView(msg['activeInput']);
            setState(msg['activeMsg']);
        });
    }

    //setupViewListener
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg['from'] == 'content' && msg['type'] == 'state') {
            console.log('state message received from content');
            setState(msg['activeMsg']);
        } else if (msg['from'] == 'background' && msg['type'] == 'state') {
            console.log('state message received from background');
            setState(msg['activeMsg']);
        } else if (msg['from'] == 'background' && msg['type'] == 'finished') {
            console.log('finished message received from background');
            if (msg['reason']) {
                alert(msg['reason']);
            }
            showOkbutton();
        }
    });
    //requestView
    chrome.runtime.sendMessage(null, { 'type': 'view', 'from': 'popup' }, null, function (msg) {
        console.log('requestView: ' + JSON.stringify(msg));
        if (msg['activeState'] == 'running') {
            disableInputs();
            showStopbutton();
        } else if (msg['activeState'] == 'finished') {
            disableInputs();
            showOkbutton();
        } else {
            enableInputs();
            showSendbutton();
        }
        if (msg['activeControl'] === 'weiboData') {
            $('a[href$="#weiboData"]').addClass('active');
            $('#weiboData').addClass('active');
            $('#weiboData').removeClass('fade');

            $('a[href$="#zpz"]').removeClass('active');
            $('#zpz').addClass('fade');
            $('#zpz').removeClass('active');
        } else if (msg['activeControl'] === 'zpz') {
            $('a[href$="#zpz"]').addClass('active');
            $('#zpz').addClass('active');
            $('#zpz').removeClass('fade');

            $('a[href$="#weiboData"]').removeClass('active');
            $('#weiboData').addClass('fade');
            $('#weiboData').removeClass('active');
        }

        if (!jQuery.isEmptyObject(msg['activeInput'])) {
            setView(msg['activeInput']);
            setState(msg['activeMsg']);
        } else {
            setInput();
        }
    });

    $('#sendbutton').on('click', function () {
        sendbuttonToggle();
    });

    $('#stopbutton').on('click', function () {
        stopbuttonToggle();
    });

    $('#okbutton').on('click', function () {
        okbuttonToggle();
    });

    $('input').on('change', function () {
        setInput();
    });

    $('textarea').on('change', function () {
        setInput();
    });

    $('#randomRepost').on('click', function () {
        if ($('#randomRepost').is(":checked")) {
            $('#repostContent').attr('disabled', 'disabled');
        } else {
            $('#repostContent').removeAttr('disabled');
        }
    });

    $('#randomComment').on('click', function () {
        if ($('#randomComment').is(":checked")) {
            $('#commentContent').attr('disabled', 'disabled');
        } else {
            $('#commentContent').removeAttr('disabled');
        }
    });
});