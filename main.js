$(function () {
    /*chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (!tab.url.includes('weibo.com')) {
            disableButtons();
        }
    });*/
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
            if ($(this).attr('id') !== 'ccPostiveTagFixed') {
                $(this).removeAttr('disabled');
            }
        });
        $("textarea").each(function () {
            $(this).removeAttr('disabled');
        });
    }
    displayWeiboData = function () {
        $('a[href$="#weiboData"]').addClass('active');
        $('#weiboData').addClass('active');
        $('#weiboData').removeClass('fade');
    };
    concealWeiboData = function() {
        $('a[href$="#weiboData"]').removeClass('active');
        $('#weiboData').addClass('fade');
        $('#weiboData').removeClass('active');
    }
    displayRepost = function () {
        $('a[href$="#loopRepost"]').addClass('active');
        $('#loopRepost').addClass('active');
        $('#loopRepost').removeClass('fade');
    };
    concealRepost = function() {
        $('a[href$="#loopRepost"]').removeClass('active');
        $('#loopRepost').addClass('fade');
        $('#loopRepost').removeClass('active');
    }
    displayCommentLike = function () {
        $('a[href$="#loopCommentLike"]').addClass('active');
        $('#loopCommentLike').addClass('active');
        $('#loopCommentLike').removeClass('fade');
    };
    concealCommentLike = function() {
        $('a[href$="#loopCommentLike"]').removeClass('active');
        $('#loopCommentLike').addClass('fade');
        $('#loopCommentLike').removeClass('active');
    }
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
        if (details['loopRepostControl']) {
            $('#loopRepostControl').prop('checked', true);
        } else {
            $('#loopRepostControl').prop('checked', false);
        }
        if (details['loopCommentLikeControl']) {
            $('#loopCommentLikeControl').prop('checked', true);
        } else {
            $('#loopCommentLikeControl').prop('checked', false);
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
        $('#rpWeiboUrl').val(details['rpWeiboUrl']);
        $('#clWeiboUrl').val(details['clWeiboUrl']);
        $('#repostInput').val(details['repostInput']);
        $('#commentInput').val(details['commentInput']);
        $('#likeInput').val(details['likeInput']);
        $('#repostContent').val(details['repostContent']);
        $('#commentContent').val(details['commentContent']);
        if (details['randomRepost']) {
            $('#rpChp').prop('checked', true);
            $('#rpContent').prop('checked', false);
            $('#repostContent').hide();
        } else {
            $('#rpChp').prop('checked', false);
            $('#rpContent').prop('checked', true);
            $('#repostContent').show();
        }
        if (details['randomComment']) {
            $('#cmChp').prop('checked', true);
            $('#cmContent').prop('checked', false);
            $('#commentContent').hide();
        } else {
            $('#cmChp').prop('checked', false);
            $('#cmContent').prop('checked', true);
            $('#commentContent').show();
        }
        if (details['lzl']) {
            $('#lzl').prop('checked', true);
        } else {
            $('#lzl').prop('checked', false);
        }
        if (details['likeOrigin']) {
            $('#likeOrigin').prop('checked', true);
        } else {
            $('#likeOrigin').prop('checked', false);
        }
    }

    setInput = function () {
        var weiboDataControl = $('#weiboDataControl').is(":checked");
        var loopRepostControl = $('#loopRepostControl').is(":checked");
        var loopCommentLikeControl = $('#loopCommentLikeControl').is(":checked");

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
        if (amanComment == null) amanComment = false;
        if (reading == null) reading = false;
        if (searching == null) searching = false;
        if (tagSearch == null) tagSearch = false;
        if (wbPostInput == null || isNaN(wbPostInput)) wbPostInput = 0;
        if (wbPostTag == null || !wbPostTag) wbPostTag = '';

        var rpWeiboUrl = $('#rpWeiboUrl').val();
        var repostInput = $('#repostInput').val();
        var repostContent = $('#repostContent').val();
        var randomRepost = true;
        if ($('#rpContent').is(":checked")) {
            randomRepost = false;
        }
        var clWeiboUrl = $('#clWeiboUrl').val();
        var commentInput = $('#commentInput').val();
        var commentContent = $('#commentContent').val();
        var lzl = $('#lzl').is(":checked");
        var randomComment = true;
        if ($('#cmContent').is(":checked")) {
            randomComment = false;
        }
        var likeInput = $('#likeInput').val();
        var likeOrigin = $('#likeOrigin').is(":checked");
        repostInput = repostInput - 0;
        commentInput = commentInput - 0;
        likeInput = likeInput - 0;
        if (rpWeiboUrl == null || !rpWeiboUrl) rpWeiboUrl = '';
        if (repostInput == null || isNaN(repostInput)) repostInput = 0;
        if (clWeiboUrl == null || !clWeiboUrl) clWeiboUrl = '';
        if (commentInput == null || isNaN(commentInput)) commentInput = 0;
        if (likeInput == null || isNaN(likeInput)) likeInput = 0;
        if (repostContent == null || !repostContent) repostContent = '';
        if (randomRepost == null) randomRepost = true;
        if (commentContent == null || !commentContent) commentContent = '';
        if (lzl == null) lzl = true;
        if (randomComment == null) randomComment = true;
        if (likeOrigin == null) likeOrigin = true;

        chrome.runtime.sendMessage(null, {
            'type': 'input',
            'from': 'popup',
            'mode': 'normal',
            'activeInput': {
                'weiboDataControl': weiboDataControl,
                'loopRepostControl': loopRepostControl,
                'loopCommentLikeControl': loopCommentLikeControl,
                'spCheckIn': spCheckIn,
                'amanComment': amanComment,
                'reading': reading,
                'searching': searching,
                'tagSearch': tagSearch,
                'wbPostOrigin': wbPostOrigin,
                'wbPostInput': wbPostInput,
                'wbPostTag': wbPostTag,
                'rpWeiboUrl': rpWeiboUrl,
                'repostInput': repostInput,
                'clWeiboUrl': clWeiboUrl,
                'commentInput': commentInput,
                'likeInput': likeInput,
                'repostContent': repostContent,
                'randomRepost': randomRepost,
                'commentContent': commentContent,
                'lzl': lzl,
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
        var loopRepostControl = $('#loopRepostControl').is(":checked");
        var loopCommentLikeControl = $('#loopCommentLikeControl').is(":checked");
        if (weiboDataControl || loopRepostControl || loopCommentLikeControl) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                disableInputs();
                disableCommentControl();
                showStopbutton();
                chrome.runtime.sendMessage(null, {
                    'type': 'start',
                    'from': 'popup',
                    'mode': 'normal',
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
        chrome.runtime.sendMessage(null, { 'type': 'stop', 'from': 'popup', 'mode': 'normal' }, null, function (result) {
            if (result) {
                showOkbutton();
            }
        });
    }

    okbuttonToggle = function () {
        console.log('ok');
        chrome.runtime.sendMessage(null, { 'type': 'reset', 'from': 'popup', 'mode': 'normal' }, null, function (msg) {
            console.log('ok response from background: ' + JSON.stringify(msg));
            enableInputs();
            enableCommentControl();
            showSendbutton();
            setView(msg['activeInput']);
            setState(msg['activeMsg']);
        });
    }

    //setupViewListener
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg['from'] == 'content' && msg['type'] == 'state') {
            console.log('state message received from content');
            if (msg['mode'] == 'normal') {
                setState(msg['activeMsg']);
            } else {
                setCcState(msg['activeCcMsg']);
            }
        } else if (msg['from'] == 'background' && msg['type'] == 'state') {
            console.log('state message received from background');
            setState(msg['activeMsg']);
        } else if (msg['from'] == 'background' && msg['type'] == 'finished') {
            console.log('finished message received from background');
            if (msg['mode'] == 'normal') {
                if (msg['reason']) {
                    alert(msg['reason']);
                }
                showOkbutton();
            } else {
                showCcOkbutton();
            }
        }
    });
    //requestView
    chrome.runtime.sendMessage(null, { 'type': 'view', 'from': 'popup' }, null, function (msg) {
        console.log('requestView: ' + JSON.stringify(msg));
        disableInputs();
        disableCommentControl();
        if (msg['activeState'] == 'running') {
            showStopbutton();
        } else if (msg['activeState'] == 'finished') {
            showOkbutton();
        } else if (msg['activeState'] == 'ready') {
            showSendbutton();
            if (msg['activeCcState'] == 'running') {
                showCcStopbutton();
            } else if (msg['activeCcState'] == 'finished') {
                showCcOkbutton();
            } else if (msg['activeCcState'] == 'ready') {
                enableInputs();
                enableCommentControl();
                showCcStartbutton();
            }
        }

        if (msg['activeControl'] === 'weiboData') {
            displayWeiboData();
            concealRepost();
            concealCommentLike();
            concealCommentControl();
        } else if (msg['activeControl'] === 'repost') {
            displayRepost();
            concealCommentLike();
            concealWeiboData();
            concealCommentControl();
        } else if (msg['activeControl'] === 'commentLike') {
            displayCommentLike();
            concealRepost();
            concealWeiboData();
            concealCommentControl();
        } else if (msg['activeControl'] === 'commentControl') {
            displayCommentControl();
            displayWeiboData();
            concealRepost();
            concealCommentLike();
        }

        if (!jQuery.isEmptyObject(msg['activeInput'])) {
            setView(msg['activeInput']);
            setState(msg['activeMsg']);
        } else {
            setInput();
        }

        if (!jQuery.isEmptyObject(msg['activeCcInput'])) {
            setCcView(msg['activeCcInput']);
            setCcState(msg['activeCcMsg']);
        } else {
            setCcInput();
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
        setCcInput();
    });

    $('textarea').on('change', function () {
        setInput();
        setCcInput();
    });

    $('[name=rpContentType]').on('change', function () {
        if ($(this).val() == 'rpContent') {
            $('#repostContent').show();
        } else {
            $('#repostContent').hide();
        }
    });

    $('[name=cmContentType]').on('change', function () {
        if ($(this).val() == 'cmContent') {
            $('#commentContent').show();
        } else {
            $('#commentContent').hide();
        }
    });

    // comment control:
    disableCommentControl = function () {
        $('#modeswitch').attr('disabled', 'disabled');
    };
    enableCommentControl = function () {
        $('#modeswitch').removeAttr('disabled');
    };

    displayCommentControl = function () {
        $('#overlay').show();
        $('#commentControl').show();
        $('#modeswitch').html('关闭');
    };
    concealCommentControl = function () {
        $('#commentControl').hide();
        $('#overlay').hide();
        $('#modeswitch').html('控评模式 🔼');
    };

    showCcStartbutton = function () {
        $('#ccstartbutton').show();
        $('#ccstopbutton').hide();
        $('#ccokbutton').hide();
    };
    showCcStopbutton = function () {
        $('#ccstopbutton').show();
        $('#ccstartbutton').hide();
        $('#ccokbutton').hide();
    };
    showCcOkbutton = function () {
        $('#ccokbutton').show();
        $('#ccstartbutton').hide();
        $('#ccstopbutton').hide();
    };

    setCcState = function (msg) {
        var commentControlSofar = '';

        if (!jQuery.isEmptyObject(msg)) {
            if ((msg['commentControlCount'] != null && msg['commentControlCount'] > 0) || !!msg['commentControlMsg']) {
                commentControlSofar = '已点赞' + msg['commentControlCount'] + '个评论。' + msg['commentControlMsg'];
            }
        }
        $('#commentControlSofar').text(commentControlSofar);
    }
    setCcView = function (details) {
        $('#ccWeiboUrl').val(details['ccWeiboUrl']);
        $('#commentControlInput').val(details['commentControlInput']);
        $('#ccPostiveTags').val(details['ccPostiveTags']);
        $('#ccNegativeTags').val(details['ccNegativeTags']);
        if (details['nz']) {
            $('#nz').prop('checked', true);
        } else {
            $('#nz').prop('checked', false);
        }
    }

    setCcInput = function () {
        var ccWeiboUrl = $('#ccWeiboUrl').val();
        var commentControlInput = $('#commentControlInput').val();
        var ccPostiveTags = $('#ccPostiveTags').val();
        var ccNegativeTags = $('#ccNegativeTags').val();
        var nz = $('#nz').is(":checked");
        commentControlInput = commentControlInput - 0;
        if (ccWeiboUrl == null || !ccWeiboUrl) ccWeiboUrl = '';
        if (commentControlInput == null || isNaN(commentControlInput)) commentControlInput = 0;
        if (ccPostiveTags == null || !ccPostiveTags) ccPostiveTags = '';
        if (ccNegativeTags == null || !ccNegativeTags) ccNegativeTags = '';
        if (nz == null) nz = true;

        chrome.runtime.sendMessage(null, {
            'type': 'input',
            'from': 'popup',
            'mode': 'commentControl',
            'activeCcInput': {
                'ccWeiboUrl': ccWeiboUrl,
                'commentControlInput': commentControlInput,
                'ccPostiveTags': ccPostiveTags,
                'ccNegativeTags': ccNegativeTags,
                'nz': nz
            }
        }, null, function (msg) {
            if (!!msg) {
                console.log(msg);
            }
        });
    }

    ccstartbuttonToggle = function () {
        console.log('ccstart');
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            disableInputs();
            disableCommentControl();
            showCcStopbutton();
            chrome.runtime.sendMessage(null, {
                'type': 'start',
                'from': 'popup',
                'mode': 'commentControl',
                'tabId': tabs[0]["id"],
            }, null, function (result) {
                if (!result.isSuccess) {
                    showCcOkbutton();
                }
                if (result.msg) {
                    alert(result.msg);
                }
            });
        });
    }
    ccstopbuttonToggle = function () {
        console.log('ccstop');
        chrome.runtime.sendMessage(null, { 'type': 'stop', 'from': 'popup', 'mode': 'commentControl' }, null, function (result) {
            if (result) {
                showCcOkbutton();
            }
        });
    }
    ccokbuttonToggle = function () {
        console.log('ccok');
        chrome.runtime.sendMessage(null, { 'type': 'reset', 'from': 'popup', 'mode': 'commentControl' }, null, function (msg) {
            console.log('cc ok response from background: ' + JSON.stringify(msg));
            enableInputs();
            enableCommentControl();
            showCcStartbutton();
            setCcView(msg['activeCcInput']);
            setCcState(msg['activeCcMsg']);
        });
    }

    $('#modeswitch').on('click', function () {
        if($('#commentControl').is(':visible')){
            concealCommentControl();
        } else {
            displayCommentControl();
        }
    });

    $('#ccstartbutton').on('click', function () {
        ccstartbuttonToggle();
    });
    $('#ccstopbutton').on('click', function () {
        ccstopbuttonToggle();
    });
    $('#ccokbutton').on('click', function () {
        ccokbuttonToggle();
    });
});