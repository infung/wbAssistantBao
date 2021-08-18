const VICESUPERTOPIC = "https://weibo.com/p/100808cd19f50b7e758a497f78651157aecdc5/super_index";
const BUSYTEXTS = ['休息一会', '验证码', '频繁', '繁忙', '提交失败', 'Cannot do this operation'];
const WBAUTHORS = ['INTO1官博', '哇唧唧哇'];

var activeMsg = {
    spCheckInStatus: false,
    amanCommentStatus: false,
    readingStatus: false,
    searchingStatus: false,
    spZnlCount: 0,
    mpZnlCount: 0,
    spZnlMsg: '',
    mpZnlMsg: '',
    likeCount: 0,
    commentCount: 0,
    repostCount: 0,
    likeMsg: '',
    commentMsg: '',
    repostMsg: '',
    likeOriginStatus: ''
}

var running = false;

console.log('小饱狗勾准备就绪~ ฅ՞•ﻌ•՞ฅ');

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log('message received in content!');
    if (msg['from'] == 'background' && msg['type'] == 'spCheckIn') {
        running = true;
        setPriorState(msg['activeMsg']);
        spCheckIn();
        sendResponse('weiboData spCheckIn start sending');
    } else if (msg['from'] == 'background' && msg['type'] == 'amanComment') {
        running = true;
        setPriorState(msg['activeMsg']);
        amanComment();
        sendResponse('weiboData amanComment start sending');
    } else if (msg['from'] == 'background' && msg['type'] == 'reading') {
        running = true;
        setPriorState(msg['activeMsg']);
        reading();
        sendResponse('weiboData reading start sending');
    } else if (msg['from'] == 'background' && msg['type'] == 'searching') {
        running = true;
        setPriorState(msg['activeMsg']);
        searching();
        sendResponse('weiboData searching start sending');
    } else if (msg['from'] == 'background' && msg['type'] == 'spZnl') {
        running = true;
        setPriorState(msg['activeMsg']);
        spZnl(msg['spZnlInput']);
        sendResponse('weiboData spZnl start sending');
    } else if (msg['from'] == 'background' && msg['type'] == 'mpZnl') {
        running = true;
        setPriorState(msg['activeMsg']);
        mpZnl(msg['mpZnlInput'], msg['mpZnlTag']);
        sendResponse('weiboData mpZnl start sending');
    } else if (msg["from"] == 'background' && msg["type"] == "allForBY") {
        checkBoYuanOnly().then(sendResponse);
        return true;
    } else if (msg["from"] == 'background' && msg["type"] == "zpz") {
        running = true;
        setPriorState(msg['activeMsg']);
        zpz(msg["repostInput"], msg["commentInput"], msg["likeInput"], msg["repostContent"], msg["commentContent"], msg["likeOrigin"]);
        sendResponse('zpz start sending');
    } else if (msg["from"] == 'background' && msg["type"] == "stopSending") {
        running = false;
        sendResponse('stop sending');
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getElementsByXPath(xpathToExecute) {
    return document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function waitElementPresent(path) {
    return new Promise(resolve => {
        var checkExist = setInterval(async () => {
            var element = await getElementsByXPath(path);
            if (element.snapshotLength > 0) {
                console.log("element found!");
                clearInterval(checkExist);
                resolve();
            }
        }, 1000);
    });
}

async function checkBoYuanOnly() {
    var boyuanFlag = false;
    await waitElementPresent('//div[@class="WB_detail"]');
    var wbContent = (await getElementsByXPath('//div[@class="WB_detail"]')).snapshotItem(0);
    var wbInfoList = await getElementsByXPath('//div[@class="WB_info"]/a');
    var wbInfoLen = wbInfoList.snapshotLength;
    for (var i = 0; i < wbInfoLen; i++) {
        //case 0: x_x
        if (wbContent.textContent.indexOf('老伯') !== -1 || wbInfoList.snapshotItem(i).text === '@INTO1-刘宇') {
            alert('WHAT THE HECK!');
            break;
        }
        //case 1: boyuan's weibo or the weibo that reposted boyuan's weibo 
        if (wbInfoList.snapshotItem(i).text === '@INTO1-伯远' ||
            (wbInfoList.snapshotItem(i).title === 'INTO1-伯远' || wbInfoList.snapshotItem(i).href === 'https://weibo.com/xevier')) {
            boyuanFlag = true;
            break;
        }
        //case 2: the weibo that mentions boyuan or the weibo that mentions 'bo' and 'yuan' separately but reposted into1 and wjja weibo
        if (wbContent.textContent.indexOf('伯远') !== -1 ||
            (wbContent.textContent.indexOf('伯') !== -1 && wbContent.textContent.indexOf('远') !== -1 && WBAUTHORS.indexOf(wbInfoList.snapshotItem(i).title) > -1)) {
            boyuanFlag = true;
            break;
        }
    }
    return boyuanFlag;
}

function postWeibo(content, mainPage) {
    return new Promise(resolve => {
        var Data = new FormData();
        var api = 'https://weibo.com/aj/mblog/add?ajwvr=6&__rnd=';
        var superTopicId = null;

        if (mainPage) {
            Data.append('pic_id', '');
            Data.append('appkey', '');
            Data.append('mid', '');
            Data.append('tid', '');
            Data.append('style_type', '1');
            Data.append('text', content);
            Data.append('location', 'v6_content_home');
            Data.append('pdetail', '');
            Data.append('module', 'stissue');
            Data.append('pub_source', 'main_');
            Data.append('pub_type', 'dialog');
            Data.append('rank', '0');
            Data.append('rankid', '');
            Data.append('isReEdit', 'false');
            Data.append('isPri', '0');
            Data.append('_t', '0');
        } else {
            superTopicId = VICESUPERTOPIC.substr(20, 38);
            api = 'https://weibo.com/p/aj/proxy?ajwvr=6&__rnd=';

            Data.append('pic_src', '');
            Data.append('pic_id', '');
            Data.append('appkey', '');
            Data.append('mid', '');
            Data.append('style_type', '1');
            Data.append('api', 'http://i.huati.weibo.com/pcpage/operation/publisher/sendcontent?sign=super&page_id=' + superTopicId);
            Data.append('text', content);
            Data.append('location', 'page_100808_super_index');
            Data.append('pdetail', superTopicId);
            Data.append('object_id', '1022:' + superTopicId);
            Data.append('module', 'publish_913');
            Data.append('page_module_id', '913');
            Data.append('sync_wb', '1');
            Data.append('isReEdit', 'false');
            Data.append('longtext', '1');
            Data.append('topic_id', '1022:' + superTopicId);
            Data.append('_t', '0');
            Data.append('pub_type', 'dialog');
            Data.append('pub_source', 'page_1');
        }
        var xhr = new XMLHttpRequest();
        xhr.timeout = 3000;
        xhr.responseType = 'text';
        xhr.open('POST', api + new Date().getTime(), true);
        xhr.onreadystatechange = function (e) {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    if (data.code == '100000') {
                        console.log('【正能量】：' + content);
                    } else {
                        console.log(data);

                    }
                    resolve(data);
                } else if (this.response == null && this.status == 0) {
                    resolve({ "code": "0", "msg": "出现异常，请检查网络状态或账号登录状态." });
                }
            }
        };
        xhr.send(Data);
    });
}

function setPriorState(currMsg) {
    if (Object.keys(currMsg).length !== 0) {
        activeMsg = currMsg;
    }
}

function sendState() {
    try {
        chrome.runtime.sendMessage({
            "type": "state",
            "from": "content",
            "activeMsg": activeMsg
        });
    } catch (e) {
        console.log(e);
    }
}

async function handlePopup() {
    var popupLayer = await getElementsByXPath('//div[contains(@id, "layer_")]');
    if (popupLayer.snapshotLength === 0) {
        return { 'code': '100000', 'msg': '' };
    } else {
        console.log('Overlay found, will try to dismiss it');
        popupTexts = await getElementsByXPath('//div[@class="content"]');
        var dismissButton = await getElementsByXPath('//a[@action-type="ok"]');
        var yzmCancelButton = await getElementsByXPath('//a[@action-type="yzm_cancel"]');
        var closeButton = await getElementsByXPath('//a[@node-type="close"]');
        if (dismissButton.snapshotLength !== 0) {
            dismissButton.snapshotItem(0).click();
        } else if (yzmCancelButton.snapshotLength !== 0) {
            yzmCancelButton.snapshotItem(0).click();
        } else if (closeButton.snapshotLength !== 0) {
            closeButton.snapshotItem(0).click();
        } else {
            console.log('No available dismiss button found');
        }
        var numTexts = popupTexts.snapshotLength;
        for (var i = 0; i < numTexts; i++) {
            var innerText = popupTexts.snapshotItem(i).textContent;
            var busy = BUSYTEXTS.some((text) => innerText.indexOf(text) !== -1);
            if (busy) {
                var busyText = innerText.replace(/[X\n 确定ok取消]/g, "");
                //var texts = document.getElementsByClassName('S_txt1');
                //var busyText = texts[texts.length-1].textContent
                console.log('弹窗：' + busyText);
                if (busyText.indexOf('验证码') !== -1) {
                    return { 'code': '100001', 'msg': '需要验证码。' };
                } else {
                    return { 'code': '100001', 'msg': busyText };
                }
            }
        }
        return { 'code': '100002', 'msg': '操作异常，稍后将重试。' };
    }
}

function scrollToBottom(path) {
    return new Promise(resolve => {
        var notChangedStepsCount = 0;
        var scrollInterval = setInterval(async () => {
            var clickMoreCmment = await getElementsByXPath(path);
            if (clickMoreCmment.snapshotLength > 0) {
                // element found
                clearInterval(scrollInterval);
                clickMoreCmment.snapshotItem(0).scrollIntoView();
                resolve();
            } else if ((document.documentElement.scrollTop + window.innerHeight) != document.documentElement.scrollHeight) {
                // no element -> scrolling
                notChangedStepsCount = 0;
                document.documentElement.scrollTop = document.documentElement.scrollHeight;
            } else if (notChangedStepsCount > 20) {
                // no more space to scroll
                clearInterval(scrollInterval);
                resolve();
            } else {
                // waiting for possible extension (autoload) of the page
                notChangedStepsCount++;
            }
        }, 1500);
    });
}

async function clickOuterLike() {
    await waitElementPresent('//a[@class="S_txt2" and @action-type="fl_like"]');
    var outerLikeState = (await getElementsByXPath('//a[@class="S_txt2" and @action-type="fl_like"]')).snapshotItem(0);
    var outerLike = (await getElementsByXPath('//span[@node-type="like_status"]')).snapshotItem(0);
    if (outerLikeState.title === '赞') {
        outerLike.click();
        await sleep(1000);
        console.log('Outer like clicked!')
    }
    activeMsg.likeOriginStatus = 'clicked';
    sendState();
    return activeMsg.likeOriginStatus;
}

async function clickLike(numOfLike) {
    var likes = await getElementsByXPath('//a[@class="S_txt1" and @action-type="fl_like"]');
    var numLikes = likes.snapshotLength;
    var like = null;
    var response = { 'code': '100000', 'msg': '' };
    for (var i = 0; i < numLikes; i++) {
        like = likes.snapshotItem(i);
        if (like.title === '赞') {
            like.click();
            activeMsg.likeCount++;
            await sleep(1000);
            response = await handlePopup();
            activeMsg.likeMsg = response.msg;
            sendState();
            //for like popup, kill the process immediately without waiting for animation, since it's the final round.
            if (!running || activeMsg.likeCount >= numOfLike || response.code !== '100000') break;

        }
    }
    return response;
}

async function likeWeibo(numLikes) {
    await waitElementPresent('//a[@class="S_txt2" and @action-type="fl_comment"]');
    var commentButton = await getElementsByXPath('//a[@class="S_txt2" and @action-type="fl_comment"]');
    commentButton.snapshotItem(0).click();
    await sleep(1000);

    var response = null;
    while (running) {
        response = await clickLike(numLikes);
        console.log('已点赞：' + activeMsg.likeCount);
        if (!running || activeMsg.likeCount >= numLikes) {
            break;
        } else if (response.code !== '100000') {
            //dismiss extra popups
            /*while (response.code !== '100000') {
                response = await handlePopup();
                await sleep(2000);
            }*/
            break;
        } else {
            var clickMoreCommentButtonPath = '//a[@action-type="click_more_comment"]';
            await scrollToBottom(clickMoreCommentButtonPath);
            await sleep(1000);
            var clickMoreCommentButton = await getElementsByXPath(clickMoreCommentButtonPath);
            if (clickMoreCommentButton.snapshotLength === 0) {
                break;
            }
            clickMoreCommentButton.snapshotItem(0).click();
            await sleep(1000);
        }
    }
    return activeMsg.likeCount;
}

async function commentWeiboWithoutMid(content) {
    var inputBox = (await getElementsByXPath('//div[@class="p_input"]/textarea')).snapshotItem(0);
    var postButton = (await getElementsByXPath('//a[@action-type="post"]')).snapshotItem(0);
    inputBox.value = content;
    inputBox.dispatchEvent(new Event('change'));
    await sleep(1000);
    postButton.click();
    await sleep(3000);
    var repsonse = await handlePopup();
    return repsonse;
}

async function commentWeibo(numComments, commentContent) {
    await waitElementPresent('//a[@class="S_txt2" and @action-type="fl_comment"]');
    var commentButton = await getElementsByXPath('//a[@class="S_txt2" and @action-type="fl_comment"]');
    commentButton.snapshotItem(0).click();
    await sleep(1000);

    var cstr = '';
    var response = null;
    while (running && activeMsg.commentCount < numComments) {
        cstr = commentContent + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        response = await commentWeiboWithoutMid(cstr);
        if (response.code === '100000') activeMsg.commentCount++;
        console.log('已评论：' + activeMsg.commentCount);
        activeMsg.commentMsg = response.msg;
        sendState();
        //wait for animation done after dismissing popup
        if (response.code === '100001') {
            await sleep(2000);
            break;
        } else if (response.code === '100002') {
            await sleep(2000);
        }
    }
    return activeMsg.commentCount;
}

async function reposetWeiboWithoutMid(content) {
    var inputBox = (await getElementsByXPath('//div[@class="p_input p_textarea"]/textarea')).snapshotItem(0);
    var postButton = (await getElementsByXPath('//a[@node-type="submit"]')).snapshotItem(0);
    inputBox.value = content;
    inputBox.dispatchEvent(new Event('change'));
    await sleep(1000);
    var textBoxTips = (await getElementsByXPath('//span[@class="tips S_txt2"]')).snapshotItem(0);
    if (textBoxTips.textContent < 0) {
        return { 'code': '100001', 'msg': '超过转发字数限制' };
    }
    postButton.click();
    await sleep(3000);
    var repsonse = await handlePopup();
    return repsonse;
}

async function repostWeibo(numReposts, repostContent) {
    await waitElementPresent('//a[@action-type="fl_forward"]');
    var commentButton = await getElementsByXPath('//a[@action-type="fl_forward"]');
    commentButton.snapshotItem(0).click();
    await sleep(1000);

    //obtain re-repost text content
    var rstr = '';
    await waitElementPresent('//div[@class="p_input p_textarea"]/textarea');
    var originContent = (await getElementsByXPath('//div[@class="p_input p_textarea"]/textarea')).snapshotItem(0).value;
    if (originContent.lastIndexOf('//', 0) !== 0) originContent = '';
    var response = null;
    while (running && activeMsg.repostCount < numReposts) {
        var rstr = repostContent + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + originContent;
        var response = await reposetWeiboWithoutMid(rstr);
        if (response.code === '100000') activeMsg.repostCount++;
        console.log('转发：' + activeMsg.repostCount);
        activeMsg.repostMsg = response.msg;
        sendState();
        //wait for animation done after dismissing popup
        if (response.code === '100001') {
            await sleep(2000);
            break;
        } else if (response.code === '100002') {
            await sleep(2000);
        }
    }
    return activeMsg.repostCount;
}

async function zpz(numReposts, numComments, numLikes, repostContent, commentContent, likeOrigin) {
    //const url = chrome.runtime.getURL('content.json');
    //const contentJson = await (await fetch(url)).json();

    if (likeOrigin && running) activeMsg.likeOriginStatus = await clickOuterLike();
    if (numReposts !== 0 && running) activeMsg.repostCount = await repostWeibo(numReposts, repostContent);
    if (numComments !== 0 && running) activeMsg.commentCount = await commentWeibo(numComments, commentContent);
    if (numLikes !== 0 && running) activeMsg.likeCount = await likeWeibo(numLikes);
    console.log('outer like: ' + activeMsg.likeOriginStatus + '; repost count: ' + activeMsg.repostCount + '; comment count: ' + activeMsg.commentCount + '; like count: ' + activeMsg.likeCount);
    if (!running) {
        console.log('stop due to [stop button]');
    } else {
        running = false;
        console.log('stop due to [finished]');
        chrome.runtime.sendMessage({ "type": "finishedZpz", "from": "content" });
    }
    //activeMsg.likeCount = 0;
    //activeMsg.commentCount = 0;
    //activeMsg.repostCount = 0;
    console.log('-----------------------end-----------------------');
}

function randomRange(min, max) {
    var returnStr = '',
        range = (max ? Math.round(Math.random() * (max - min)) + min : min),
        arr = ['b', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'B', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (var i = 0; i < range; i++) {
        var index = Math.round(Math.random() * (arr.length - 1));
        returnStr += arr[index];
    }
    return returnStr;
}

function commentGenerator() {
    var str = randomRange(4, 8);
    str = WORDS[Math.floor(Math.random() * WORDS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        WORDS[Math.floor(Math.random() * WORDS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        WORDS[Math.floor(Math.random() * WORDS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        str + ' @INTO1-伯远';
    return str;
}

function amanGenerator() {
    var str = randomRange(4, 8);
    if (Math.random() <= 0.1) {
        str = PREFIX[Math.floor(Math.random() * PREFIX.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            WORDS[Math.floor(Math.random() * WORDS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            AMANTAGS[Math.floor(Math.random() * AMANTAGS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            WORDS[Math.floor(Math.random() * WORDS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            TAGS[Math.floor(Math.random() * TAGS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            str + ' @INTO1-伯远';
    } else {
        var shortPhrase = (ZNL.concat(BOYUANPHRASE)).concat(RAINBOWFART);
        shortPhrase = shortPhrase.filter((string) => {
            return string.length <= 65;
        });
        str = PREFIX[Math.floor(Math.random() * PREFIX.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            AMANTAGS[Math.floor(Math.random() * AMANTAGS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            shortPhrase[Math.floor(Math.random() * shortPhrase.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            WORDS[Math.floor(Math.random() * WORDS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            TAGS[Math.floor(Math.random() * TAGS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            str + ' @INTO1-伯远';
    }
    return str;
}

function znlGenerator() {
    var str = randomRange(4, 8);
    var phrase = (ZNL.concat(BOYUANPHRASE)).concat(RAINBOWFART);
    str = ZNLTAG1 + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + TAGS[Math.floor(Math.random() * TAGS.length)] +
        '\n' + PREFIX[Math.floor(Math.random() * PREFIX.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        WORDS[Math.floor(Math.random() * WORDS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        '\n' + phrase[Math.floor(Math.random() * phrase.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        '\n我爱伯远 ' + EMOTICION[Math.floor(Math.random() * EMOTICION.length)] + str +
        '\n' + '@INTO1-伯远';
    return str;
}

function kkGenerator(tag) {
    var str = randomRange(4, 8);
    str = tag + '\n' + PREFIX[Math.floor(Math.random() * PREFIX.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        '\n' + KUAKUASTART[Math.floor(Math.random() * KUAKUASTART.length)] +
        RAINBOWFART[Math.floor(Math.random() * RAINBOWFART.length)] + '。' + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        '\n' + QUOTATION[Math.floor(Math.random() * QUOTATION.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        '\n' + KUAKUAEND[Math.floor(Math.random() * KUAKUAEND.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
        '\n' + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + '我好喜欢伯远，因为' + WORDS[Math.floor(Math.random() * WORDS.length)] +
        EMOTICION[Math.floor(Math.random() * EMOTICION.length)] + ' ' + str + EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    return str;
}

async function spZnl(numSpZnl) {
    //const url = chrome.runtime.getURL('content.json');
    //const contentJson = await (await fetch(url)).json();

    const interval = setInterval(async () => {
        var znlstr = znlGenerator();
        var znlResponse = await postWeibo(znlstr, false);
        if (znlResponse.code === '100000') {
            activeMsg.spZnlCount++;
            znlResponse.msg = '';
        }
        activeMsg.spZnlMsg = znlResponse.msg;
        sendState();
        if (!running || activeMsg.spZnlCount === numSpZnl || znlResponse.code !== '100000') {
            clearInterval(interval);
            await sleep(1000);
            if (!running) {
                console.log('stop due to [stop button]');
            } else {
                running = false;
                console.log('stop due to [finished]');
                chrome.runtime.sendMessage({ "type": "finishedSpZnl", "from": "content" });
            }
            //activeMsg.spZnlCount = 0;
        }
    }, 3000);
}

async function mpZnl(numMpZnl, mpZnlTag) {
    //const url = chrome.runtime.getURL('content.json');
    //const contentJson = await (await fetch(url)).json();

    const interval = setInterval(async () => {
        var kkstr = kkGenerator(mpZnlTag);
        var kkResponse = await postWeibo(kkstr, true);
        if (kkResponse.code === '100000') {
            activeMsg.mpZnlCount++;
            kkResponse.msg = '';
        }
        activeMsg.mpZnlMsg = kkResponse.msg;
        sendState();
        if (!running || activeMsg.mpZnlCount === numMpZnl || kkResponse.code !== '100000') {
            clearInterval(interval);
            await sleep(1000);
            if (!running) {
                console.log('stop due to [stop button]');
            } else {
                running = false;
                console.log('stop due to [finished]');
                chrome.runtime.sendMessage({ "type": "finishedMpZnl", "from": "content" });
            }
            //activeMsg.mpZnlCount = 0;
        }
    }, 3000);
}

function searching() {
    var notChangedStepsCount = 0;
    var scrolldelay = setInterval(function () {
        window.scrollBy(0, 500); // horizontal and vertical scroll increments
        if (!running || ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) || (notChangedStepsCount >= 30)) {
            clearInterval(scrolldelay);
            sendState();
            if (!running) {
                console.log('stop due to [stop button]');
            } else {
                running = false;
                console.log('stop due to [finished]');
                chrome.runtime.sendMessage({ "type": "finishedSearching", "from": "content" });
            }
            //activeMsg.searchingStatus = false;
        } else {
            notChangedStepsCount++;
        }
    }, 1000);
}

async function reading() {
    const today = new Date();
    const priorDate = new Date().setDate(today.getDate() - 30);

    var firstWb = true;
    var exceed30days = false;
    var links30days = [];
    while (running && !exceed30days) {
        var nextPage = true;
        var nextPageButtonPath = '//a[contains(@class, "page") and contains(@class, "next")]';
        await scrollToBottom(nextPageButtonPath);
        await sleep(1000);

        var wbsPath = '//div[@class="WB_detail"]';
        await waitElementPresent(wbsPath);
        var wbs = await getElementsByXPath(wbsPath);
        var wbsLen = wbs.snapshotLength;
        for (var i = 0; i < wbsLen; i++) {
            var wbAuthor = wbs.snapshotItem(i).children[0].textContent;
            if (wbAuthor.indexOf('INTO1-伯远') !== -1) {
                var wbInfo = wbs.snapshotItem(i).children[1].children[0];
                var wbLink = wbInfo.href;
                var wbDate = wbInfo.getAttribute('date');
                if (wbLink.endsWith('weibotime') && links30days.indexOf(wbLink) === -1 && wbDate >= priorDate) {
                    links30days.push(wbLink);
                }
                if (!firstWb && wbDate < priorDate) {
                    exceed30days = true;
                }
            }
            if (!running || exceed30days) {
                nextPage = false;
                break;
            }
            firstWb = false;
        }

        if (nextPage && running) {
            var nextPageButton = await getElementsByXPath(nextPageButtonPath);
            if (nextPageButton.snapshotLength === 0) {
                break;
            }
            nextPageButton.snapshotItem(0).click();
            await sleep(1000);
        }
    }
    //activeMsg.readingStatus = true;
    sendState();
    if (!running) {
        console.log('stop due to [stop button]');
    } else {
        running = false;
        console.log('stop due to [finished]');
        chrome.runtime.sendMessage({ "type": "finishedReading", "from": "content", "wbLinks": links30days });
    }
    //activeMsg.readingStatus = false;
}

function clickUntilSuccess(button) {
    return new Promise(resolve => {
        var checkClicked = setInterval(async () => {
            var popupClose = getElementsByXPath('//a[@node-type="close"]');
            if (popupClose.snapshotLength > 0) {
                console.log("popup found!");
                clearInterval(checkClicked);
                resolve();
            } else {
                button.click();
                console.log('try to click the button.');
            }
        }, 1000);
    });
}

async function spCheckIn() {
    var followInfoPath = '//div[@node-type="followBtnBox"]';
    await waitElementPresent(followInfoPath);
    var followInfo = (await getElementsByXPath(followInfoPath)).snapshotItem(0);
    if (running && followInfo.textContent.indexOf('已关注') === -1) {
        console.log("未关注超话，准备关注。");
        var followButton = await getElementsByXPath('//div[@node-type="followBtnBox"]/a[@action-type="follow"]');
        followButton.snapshotItem(0).click();
        await sleep(1000);
        await handlePopup();
        await sleep(1000);
    }
    console.log("已关注!");
    //wait
    var checkinButtonPath = '//a[@action-type="widget_take"]';
    await waitElementPresent(checkinButtonPath);
    var checkinButton = (await getElementsByXPath(checkinButtonPath)).snapshotItem(0);
    if (running && checkinButton.textContent.indexOf('已签到') === -1) {
        console.log("未签到，准备签到。");
        await clickUntilSuccess(checkinButton);
        await sleep(1000);
        await handlePopup();
        await sleep(1000);
    }
    console.log("已签到!");
    activeMsg.spCheckInStatus = true;
    sendState();
    if (!running) {
        console.log('stop due to [stop button]');
    } else {
        running = false;
        console.log('stop due to [finished]');
        chrome.runtime.sendMessage({ "type": "finishedSpCheckIn", "from": "content" });
    }
}

async function amanComment() {
    var nextPage = true;
    var pages = 1;
    var amanWeibo = null;
    while (running && nextPage) {
        var nextPageButtonPath = '//a[contains(@class, "page") and contains(@class, "next")]';
        await scrollToBottom(nextPageButtonPath);
        await sleep(1000);

        var wbs = document.getElementsByClassName('WB_feed_type');
        for (var i = 0; i < wbs.length; i++) {
            var wbDetail = wbs[i].textContent;
            if (!running || wbDetail.indexOf('伯远Xevier数据组') !== -1 && wbDetail.indexOf('【艾漫盖楼】') !== -1) {
                amanWeibo = wbs[i];
                nextPage = false;
                break;
            }
            if (pages > 4) {
                nextPage = false;
                break;
            }
        }
        if (nextPage && running) {
            var nextPageButton = await getElementsByXPath(nextPageButtonPath);
            if (nextPageButton.snapshotLength === 0) {
                break;
            }
            nextPageButton.snapshotItem(0).click();
            pages = pages + 1;
            await sleep(1000);
        }
    }
    if (running && amanWeibo !== null) {
        var buttons = amanWeibo.getElementsByClassName('WB_feed_handle')[0].getElementsByTagName('a');
        var commentButton = null;
        for (var j = 0; j < buttons.length; j++) {
            if (!running || buttons[j].getAttribute('action-type') === 'fl_comment') {
                commentButton = buttons[j];
                break;
            }
        }
        if (running && commentButton !== null) {
            commentButton.click();
            await sleep(1000);
            await waitElementPresent('//div[@class="WB_publish"]');
            var amanStr = amanGenerator();
            var response = await commentWeiboWithoutMid(amanStr);
            await sleep(1000);
            if (response.code === '100000' || response.code === '100002') activeMsg.amanCommentStatus = true;
        }
    }
    sendState();
    if (!running) {
        console.log('stop due to [stop button]');
    } else {
        running = false;
        console.log('stop due to [finished]');
        chrome.runtime.sendMessage({ "type": "finishedAmanComment", "from": "content" });
    }
}
