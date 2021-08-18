$(function() {
    /*chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (!tab.url.includes('weibo.com')) {
            disableButtons();
        }
    });*/
    showSendbutton = function() {
        $('#sendbutton').show();
        $('#stopbutton').hide();
        $('#okbutton').hide();
    };
    showStopbutton = function() {
        $('#stopbutton').show();
        $('#sendbutton').hide();
        $('#okbutton').hide();
    };
    showOkbutton = function() {
        $('#okbutton').show();
        $('#sendbutton').hide();
        $('#stopbutton').hide();
    };
    /*disableButtons = function() {
        $('#sendbutton').prop('disabled', true);
        $('#stopbutton').prop('disabled', true);
        $('#okbutton').prop('disabled', true);
    };
    enableButtons = function() {
        $('#sendbutton').prop('disabled', false);
        $('#stopbutton').prop('disabled', false);
        $('#okbutton').prop('disabled', false);
    };*/
    disableInputs = function() {
        $('#weiboDataControl').attr('disabled', 'disabled');
        $('#zpzControl').attr('disabled', 'disabled');

        $('#spCheckIn').attr('disabled', 'disabled');
        $('#amanComment').attr('disabled', 'disabled');
        $('#reading').attr('disabled', 'disabled');
        $('#searching').attr('disabled', 'disabled');
        $('#spZnlInput').attr('disabled', 'disabled');
        $('#mpZnlInput').attr('disabled', 'disabled');
        $('#mpZnlTag').attr('disabled', 'disabled');

        $('#weiboUrl').attr('disabled', 'disabled');
        $('#repostInput').attr('disabled', 'disabled');
        $('#repostContent').attr('disabled', 'disabled');
        $('#commentInput').attr('disabled', 'disabled');
        $('#commentContent').attr('disabled', 'disabled');
        $('#likeInput').attr('disabled', 'disabled');
        $('#likeOrigin').attr('disabled', 'disabled');
    };
    enableInputs = function() {
        $('#weiboDataControl').removeAttr('disabled');
        $('#zpzControl').removeAttr('disabled');

        $('#spCheckIn').removeAttr('disabled');
        $('#amanComment').removeAttr('disabled');
        $('#reading').removeAttr('disabled');
        $('#searching').removeAttr('disabled');
        $('#spZnlInput').removeAttr('disabled');
        $('#mpZnlInput').removeAttr('disabled');
        $('#mpZnlTag').removeAttr('disabled');

        $('#weiboUrl').removeAttr('disabled');
        $('#repostInput').removeAttr('disabled');
        $('#repostContent').removeAttr('disabled');
        $('#commentInput').removeAttr('disabled');
        $('#commentContent').removeAttr('disabled');
        $('#likeInput').removeAttr('disabled');
        $('#likeOrigin').removeAttr('disabled');
    }
    setState = function(msg) {
        var spCheckInSofar = false;
        var amanCommentSofar = false;
        var readingSofar = false;
        var searchingSofar = false;
        var spZnlSofar = '';
        var mpZnlSofar = '';

        var repostSofar = '';
        var commentSofar = '';
        var likeSofar = '';

        if (!jQuery.isEmptyObject(msg)) {
            if (msg['spCheckInStatus']) spCheckInSofar = true;
            if (msg['amanCommentStatus']) amanCommentSofar = true;
            if (msg['readingStatus']) readingSofar = true;
            if (msg['searchingStatus']) searchingSofar = true;
            if ((msg['spZnlCount'] != null && msg['spZnlCount'] > 0) || !!msg['spZnlMsg']) {
                spZnlSofar = '已发送' + msg['spZnlCount'] + '条。' + msg['spZnlMsg'];
            }
            if ((msg['mpZnlCount'] != null && msg['mpZnlCount'] > 0) || !!msg['mpZnlMsg']) {
                mpZnlSofar = '已发送' + msg['mpZnlCount'] + '条。' + msg['mpZnlMsg'];
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
        $('#currentSpZnl').text(spZnlSofar);
        $('#currentMpZnl').text(mpZnlSofar);

        $('#currentRepost').text(repostSofar);
        $('#currentComment').text(commentSofar);
        $('#currentLike').text(likeSofar);
    }
    setView = function(details) {
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
        $('#spZnlInput').val(details['spZnlInput']);
        $('#mpZnlInput').val(details['mpZnlInput']);
        $('#mpZnlTag').val(details['mpZnlTag']);

        $('#weiboUrl').val(details['weiboUrl']);
        $('#repostInput').val(details['repostInput']);
        $('#commentInput').val(details['commentInput']);
        $('#likeInput').val(details['likeInput']);
        $('#repostContent').val(details['repostContent']);
        $('#commentContent').val(details['commentContent']);
        if (details['likeOrigin']) {
            $('#likeOrigin').prop('checked', true);
        } else {
            $('#likeOrigin').prop('checked', false);
        }
    }

    setInput = function() {
        var weiboDataControl = $('#weiboDataControl').is(":checked");
        var zpzControl = $('#zpzControl').is(":checked");

        var spCheckIn = $('#spCheckIn').is(":checked");
        var amanComment = $('#amanComment').is(":checked");
        var reading = $('#reading').is(":checked");
        var searching = $('#searching').is(":checked");
        var spZnlInput = $('#spZnlInput').val();
        var mpZnlInput = $('#mpZnlInput').val();
        var mpZnlTag = $('#mpZnlTag').val();

        spZnlInput = spZnlInput - 0;
        mpZnlInput = mpZnlInput - 0;
        if (spCheckIn == null) spCheckIn = true;
        if (amanComment == null) amanComment = true;
        if (reading == null) reading = true;
        if (searching == null) searching = true;
        if (spZnlInput == null || isNaN(spZnlInput)) spZnlInput = 0;
        if (mpZnlInput == null || isNaN(mpZnlInput)) mpZnlInput = 0;
        if (mpZnlTag == null || !mpZnlTag) mpZnlTag = '';

        var weiboUrl = $('#weiboUrl').val();
        var repostInput = $('#repostInput').val();
        var repostContent = $('#repostContent').val();
        var commentInput = $('#commentInput').val();
        var commentContent = $('#commentContent').val();
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
        if (commentContent == null || !commentContent) commentContent = '';
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
                'spZnlInput': spZnlInput,
                'mpZnlInput': mpZnlInput,
                'mpZnlTag': mpZnlTag,
                'weiboUrl': weiboUrl,
                'repostInput': repostInput,
                'commentInput': commentInput,
                'likeInput': likeInput,
                'repostContent': repostContent,
                'commentContent': commentContent,
                'likeOrigin': likeOrigin
            }
        }, null, function(msg) {
            if (!!msg) {
                console.log(msg);
            }
        });
    }

    sendbuttonToggle = function() {
        console.log('send');
        var weiboDataControl = $('#weiboDataControl').is(":checked");
        var zpzControl = $('#zpzControl').is(":checked");
        if (weiboDataControl || zpzControl) {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                disableInputs();
                showStopbutton();
                chrome.runtime.sendMessage(null, {
                    'type': 'start',
                    'from': 'popup',
                    'tabId': tabs[0]["id"],
                }, null, function(result) {
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

    stopbuttonToggle = function() {
        console.log('stop');
        chrome.runtime.sendMessage(null, { 'type': 'stop', 'from': 'popup' }, null, function(result) {
            if (result) {
                showOkbutton();
            }
        });
    }

    okbuttonToggle = function() {
        console.log('ok');
        chrome.runtime.sendMessage(null, { 'type': 'reset', 'from': 'popup' }, null, function(msg) {
            console.log('ok response from background: ' + JSON.stringify(msg));
            setState(msg);
            enableInputs();
            showSendbutton();
        });
    }

    //setupViewListener
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
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
    chrome.runtime.sendMessage(null, { 'type': 'view', 'from': 'popup' }, null, function(msg) {
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

    $('#sendbutton').on('click', function() {
        sendbuttonToggle();
    });

    $('#stopbutton').on('click', function() {
        stopbuttonToggle();
    });

    $('#okbutton').on('click', function() {
        okbuttonToggle();
    });

    $('input').on('change', function() {
        setInput();
    });

    $('textarea').on('change', function() {
        setInput();
    });
});