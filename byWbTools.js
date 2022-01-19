// 本插件为拥有著作权的非开源代码
const VICESUPERTOPIC = "https://weibo.com/p/100808cd19f50b7e758a497f78651157aecdc5/super_index";
const BUSYTEXTS = ['休息一会', '验证码', '频繁', '繁忙', '提交失败', 'Cannot do this operation'];
const WBAUTHORS = ['INTO1官博', '哇唧唧哇'];
const NOBODYCARES = ['@INTO1-尹浩宇', '@INTO1-高卿尘', '@INTO1-米卡', '@INTO1-刘宇', '@INTO1-力丸', '@INTO1-林墨', '@INTO1-周柯宇', '@INTO1-张嘉元'];

var activeMsg = {
    spCheckInStatus: false,
    amanCommentStatus: false,
    readingStatus: false,
    searchingStatus: false,
    tagSearchStatus: false,
    wbPostCount: 0,
    wbPostMsg: '',
    likeCount: 0,
    commentCount: 0,
    repostCount: 0,
    likeMsg: '',
    commentMsg: '',
    repostMsg: '',
    likeOriginStatus: ''
}

var activeCcMsg = {
    commentControlCount: 0,
    commentControlMsg: '',
}

var running = false;
var ccrunning = false;

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
    } else if (msg['from'] == 'background' && msg['type'] == 'tagSearch') {
        running = true;
        setPriorState(msg['activeMsg']);
        searching('tagSearch');
        sendResponse('weiboData tagSearch start sending');
    } else if (msg['from'] == 'background' && msg['type'] == 'searching') {
        running = true;
        setPriorState(msg['activeMsg']);
        searching('searching');
        sendResponse('weiboData searching start sending');
    } else if (msg['from'] == 'background' && (msg['type'] == 'superTopic' || msg['type'] == 'mainPage')) {
        running = true;
        setPriorState(msg['activeMsg']);
        wbPost(msg['wbPostOrigin'], msg['wbPostInput'], msg['wbPostTag'], msg['wqTag']);
        sendResponse('weiboData wbPost start sending');
    } else if (msg["from"] == 'background' && msg["type"] == "allForBY") {
        checkBoYuanOnly().then(sendResponse);
        return true;
    } else if (msg["from"] == 'background' && msg["type"] == "repost") {
        running = true;
        setPriorState(msg['activeMsg']);
        repost(msg["repostInput"], msg["repostContent"], msg["randomRepost"]);
        sendResponse('zpz repost start sending');
    } else if (msg["from"] == 'background' && msg["type"] == "commentLike") {
        running = true;
        setPriorState(msg['activeMsg']);
        commentLike(msg["commentInput"], msg["likeInput"], msg["lzl"], msg["commentContent"], msg["randomComment"], msg["likeOrigin"]);
        sendResponse('zpz comment&like start sending');
    } else if (msg["from"] == 'background' && msg["type"] == "commentControl") {
        ccrunning = true;
        commentControl(msg["commentControlInput"], msg["ccPostiveTags"], msg["ccNegativeTags"], msg["nz"]);
        sendResponse('commentControl start sending');
    } else if (msg["from"] == 'background' && msg["type"] == "stopSending") {
        if (msg["mode"] == "normal") {
            running = false;
        } else {
            ccrunning = false;     
        }
        sendResponse('stop sending');
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getElementsByXPath(xpathToExecute) {
    return document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function waitElementPresent(path, size) {
    return new Promise(resolve => {
        var checkExist = setInterval(async () => {
            var element = await getElementsByXPath(path);
            if (element.snapshotLength >= size) {
                console.log("element found!");
                clearInterval(checkExist);
                resolve();
            }
        }, 1000);
    });
}

async function checkBoYuanOnly() {
    var boyuanFlag = false;
    await waitElementPresent('//div[@class="WB_detail"]', 1);
    var wbContent = (await getElementsByXPath('//div[@class="WB_detail"]')).snapshotItem(0);
    var wbInfoList = await getElementsByXPath('//div[@class="WB_info"]/a');
    var wbInfoLen = wbInfoList.snapshotLength;
    for (var i = 0; i < wbInfoLen; i++) {
        //case 0: x_x
        if (wbContent.textContent.indexOf('老伯') !== -1 || NOBODYCARES.indexOf(wbInfoList.snapshotItem(i).text) > -1 ) {
            alert('小偷!你担必糊!');
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

function postWeibo(content, wbPostOrigin) {
    return new Promise(resolve => {
        var Data = new FormData();
        var api = 'https://weibo.com/aj/mblog/add?ajwvr=6&__rnd=';
        var superTopicId = null;

        if (wbPostOrigin == 'mainPage') {
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
                        console.log('【微博】：' + content);
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
            "mode": "normal",
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
    await waitElementPresent('//a[@class="S_txt2" and @action-type="fl_like"]', 1);
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

async function innerLikes() {
    var innerCommentsButtons = await getElementsByXPath('//a[@action-type="click_more_child_comment_big"]');
    innerCommentsButtons.snapshotItem(0).click();
    await sleep(1500);
}

async function likeWeibo(numLikes) {
    await waitElementPresent('//a[@class="S_txt2" and @action-type="fl_comment"]', 1);
    var commentButton = await getElementsByXPath('//a[@class="S_txt2" and @action-type="fl_comment"]');
    commentButton.snapshotItem(0).click();
    await sleep(1000);

    var response = null;
    var innerLikeTurn = false;
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
        } else if (innerLikeTurn) {
            await innerLikes();
            innerLikeTurn = false;
        } else {
            innerLikeTurn = true;
            var clickMoreCommentButtonPath = '//a[@action-type="click_more_comment"]';
            await scrollToBottom(clickMoreCommentButtonPath);
            await sleep(1000);
            var clickMoreCommentButton = await getElementsByXPath(clickMoreCommentButtonPath);
            if (clickMoreCommentButton.snapshotLength !== 0) {
                clickMoreCommentButton.snapshotItem(0).click();
                await sleep(1000);
            }
        }
    }
    return activeMsg.likeCount;
}

async function innerCommentWeibo(content) {
    var replyButton = (await getElementsByXPath('//a[@action-type="reply"]')).snapshotItem(0);
    replyButton.click();
    await sleep(1000);
    await waitElementPresent('//div[@class="p_input"]/textarea', 2);
    var inputBox = (await getElementsByXPath('//div[@class="p_input"]/textarea')).snapshotItem(1);
    inputBox.value = content;
    inputBox.dispatchEvent(new Event('change'));
    await sleep(1000);
    var postButton = (await getElementsByXPath('//a[@node-type="btnText" and @action-type="doReply"]')).snapshotItem(0);
    postButton.click();
    await sleep(3000);
    var repsonse = await handlePopup();
    return repsonse;
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

async function commentWeibo(numComments, lzl, commentContent, randomComment) {
    await waitElementPresent('//a[@class="S_txt2" and @action-type="fl_comment"]', 1);
    var commentButton = await getElementsByXPath('//a[@class="S_txt2" and @action-type="fl_comment"]');
    commentButton.snapshotItem(0).click();
    await sleep(1000);

    var cstr = '';
    var response = null;
    var firstComment = true;
    while (running && activeMsg.commentCount < numComments) {
        if (randomComment) {
            cstr = kuakuaGenerator();
        } else {
            cstr = commentContent + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        }
        if (firstComment || !lzl) {
            response = await commentWeiboWithoutMid(cstr);
            firstComment = false;
        } else {
            response = await innerCommentWeibo(cstr);
        }
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
    postButton.click();
    await sleep(3000);
    var repsonse = await handlePopup();
    return repsonse;
}

async function repostWeibo(numReposts, repostContent, randomRepost) {
    await waitElementPresent('//a[@action-type="fl_forward"]', 1);
    var commentButton = await getElementsByXPath('//a[@action-type="fl_forward"]');
    commentButton.snapshotItem(0).click();
    await sleep(1000);

    //obtain re-repost text content
    var rstr = '';
    await waitElementPresent('//div[@class="p_input p_textarea"]/textarea', 1);
    var originContent = (await getElementsByXPath('//div[@class="p_input p_textarea"]/textarea')).snapshotItem(0).value;
    if (originContent.lastIndexOf('//', 0) !== 0) originContent = '';
    //trim repost text content
    // var textLimit = (await getElementsByXPath('//span[@class="tips S_txt2"]')).snapshotItem(0).textContent;
    // if (textLimit < 6) {
    //     originContent = originContent.substring(0, originContent.length - (8 - textLimit));
    // }
    var response = null;
    var rstr = '';
    while (running && activeMsg.repostCount < numReposts) {
        if (randomRepost) {
            rstr = kuakuaGenerator() + originContent;
        } else {
            rstr = repostContent + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + originContent;
        }
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

async function repost(numReposts, repostContent, randomRepost) {
    if (numReposts > 0 && running) activeMsg.repostCount = await repostWeibo(numReposts, repostContent, randomRepost);
     if (!running) {
        console.log('stop due to [stop button]');
    } else {
        running = false;
        console.log('stop due to [finished]');
        chrome.runtime.sendMessage({ "type": "finishedRepost", "from": "content" });
    }
}

async function commentLike(numComments, numLikes, lzl, commentContent, randomComment, likeOrigin) {
    if (likeOrigin && running) activeMsg.likeOriginStatus = await clickOuterLike();
    if (numComments !== 0 && running) activeMsg.commentCount = await commentWeibo(numComments, lzl, commentContent, randomComment);
    if (numLikes !== 0 && running) activeMsg.likeCount = await likeWeibo(numLikes);
    if (!running) {
        console.log('stop due to [stop button]');
    } else {
        running = false;
        console.log('stop due to [finished]');
        chrome.runtime.sendMessage({ "type": "finishedCommentLike", "from": "content" });
    }
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

function kuakuaGenerator() {
    var str = '';
    if (Math.random() <= 0.5) {
        str = RAINBOWFART[Math.floor(Math.random() * RAINBOWFART.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + 
            EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    } else {
        str = RAINBOWFART[Math.floor(Math.random() * RAINBOWFART.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            KUAKUAEND[Math.floor(Math.random() * KUAKUAEND.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + 
            EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    }
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

function wbGenerator(tag) {
    var str = randomRange(4, 8);
    var phrase = (ZNL.concat(BOYUANPHRASE)).concat(RAINBOWFART);
    if (Math.random() <= 0.4) {
        str = tag + '\n' + PREFIX[Math.floor(Math.random() * PREFIX.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            '\n' + KUAKUASTART[Math.floor(Math.random() * KUAKUASTART.length)] +
            phrase[Math.floor(Math.random() * phrase.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            KUAKUAEND[Math.floor(Math.random() * KUAKUAEND.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            '\n' + QUOTATION[Math.floor(Math.random() * QUOTATION.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            '\n' + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + '我好喜欢伯远，因为' + WORDS[Math.floor(Math.random() * WORDS.length)] +
            EMOTICION[Math.floor(Math.random() * EMOTICION.length)] + ' ' + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            '\n' + '@INTO1-伯远';
    } else if (Math.random() <= 0.7) {
        str = tag + '\n' + PREFIX[Math.floor(Math.random() * PREFIX.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOTICION[Math.floor(Math.random() * EMOTICION.length)] +
            '\n' + phrase[Math.floor(Math.random() * phrase.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            '\n' + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + '伯丝爱伯远，理由是' + WORDS[Math.floor(Math.random() * WORDS.length)] +
            EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            '\n' + '@INTO1-伯远';
    } else {
        str = tag + '\n' + PREFIX[Math.floor(Math.random() * PREFIX.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            TEXTS[Math.floor(Math.random() * TEXTS.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            '\n' + phrase[Math.floor(Math.random() * phrase.length)] + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] +
            '\n' + EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + '伯远粉丝喜欢的是' + WORDS[Math.floor(Math.random() * WORDS.length)] +
            EMOJIS[Math.floor(Math.random() * EMOJIS.length)] + EMOTICION[Math.floor(Math.random() * EMOTICION.length)] +
            '\n' + '@INTO1-伯远';
    }
    return str;
}

async function wbPost(wbPostOrigin, numWbPost, wbPostTag, wqTag) {
    //const url = chrome.runtime.getURL('content.json');
    //const contentJson = await (await fetch(url)).json();

    const interval = setInterval(async () => {
        var str = wbGenerator(wbPostTag);
        var response = await postWeibo(str, wbPostOrigin);
        if (response.code === '100000') {
            activeMsg.wbPostCount++;
            response.msg = '';
        }
        activeMsg.wbPostMsg = response.msg;
        sendState();
        if (!running || activeMsg.wbPostCount === numWbPost || response.code !== '100000') {
            clearInterval(interval);
            await sleep(1000);
            if (!running) {
                console.log('stop due to [stop button]');
            } else {
                running = false;
                console.log('stop due to [finished]');
                chrome.runtime.sendMessage({ "type": "finishedWbPost", "from": "content" });
            }
            //activeMsg.wbPostCount = 0;
        }
    }, 3000);
}

function searching(type) {
    var notChangedStepsCount = 0;
    var scrolldelay = setInterval(function () {
        window.scrollBy(0, 600); // horizontal and vertical scroll increments
        if (!running || ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) || (notChangedStepsCount >= 20)) {
            clearInterval(scrolldelay);
            sendState();
            if (!running) {
                console.log('stop due to [stop button]');
            } else if (type == 'searching') {
                running = false;
                console.log('stop due to [finished]');
                chrome.runtime.sendMessage({ "type": "finishedSearching", "from": "content" });
            } else {
                running = false;
                console.log('stop due to [finished]');
                chrome.runtime.sendMessage({ "type": "finishedTagSearch", "from": "content" });
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
        await waitElementPresent(wbsPath, 1);
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
    await waitElementPresent(followInfoPath, 1);
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
    await waitElementPresent(checkinButtonPath, 1);
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
            if (!running || wbDetail.indexOf('Xevier五万人演唱会筹备中') !== -1 && wbDetail.indexOf('【伯远贴贴楼】') !== -1) {
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
            await waitElementPresent('//div[@class="WB_publish"]', 1);
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

// comment control

function sendCcState() {
    try {
        chrome.runtime.sendMessage({
            "type": "state",
            "from": "content",
            "mode": "commentControl",
            "activeCcMsg": activeCcMsg
        });
    } catch (e) {
        console.log(e);
    }
}

async function clickTargetLike(numOfLike, lstPermitWords, lstForbidWords, clickInnerLike) {
    console.log('filter and click');
    var commentCotents = await getElementsByXPath('//div[@class="list_con" and @node-type="replywrap"]/div[@class="WB_text"][1]');
    var commentLikes = await getElementsByXPath('//div[@class="list_con" and @node-type="replywrap"]/div[@class="WB_func clearfix"]//a[@class="S_txt1" and @action-type="fl_like"]');
    var numComments = commentCotents.snapshotLength;
    var currComment = null;
    var targetComment = false;
    var targetLike = null;
    var response = { 'code': '100000', 'msg': '' };
    for (var i = 0; i < numComments; i++) {
        currComment = commentCotents.snapshotItem(i).textContent;
        currComment = currComment.substring(currComment.indexOf('：'));
        targetComment = lstPermitWords.some((text) => currComment.indexOf(text) !== -1);
        targetComment = targetComment && !(lstForbidWords.some((text) => currComment.indexOf(text) !== -1));
        if (targetComment) {
            targetLike = commentLikes.snapshotItem(i);
            if (targetLike.title === '赞') {
                targetLike.click();
                activeCcMsg.commentControlCount++;
                await sleep(1000);
                response = await handlePopup();
                activeCcMsg.commentControlMsg= response.msg;
                sendCcState();
                //for like popup, kill the process immediately without waiting for animation, since it's the final round.
                if (!ccrunning || activeCcMsg.commentControlCount >= numOfLike || response.code !== '100000') break;
            }
        }
    }
    return response;
}

async function clickInnerLike() {
    var innerCommentsButtons = await getElementsByXPath('//a[@action-type="click_more_child_comment_big"]');
    innerCommentsButtons.snapshotItem(0).click();
    await sleep(1500);
}

async function likeWeiboWithRules(numLikes, lstPermitWords, lstForbidWords, clickInnerLike) {
    await waitElementPresent('//a[@class="S_txt2" and @action-type="fl_comment"]', 1);
    var commentButton = await getElementsByXPath('//a[@class="S_txt2" and @action-type="fl_comment"]');
    commentButton.snapshotItem(0).click();
    await sleep(1000);

    // sort by polpularity
    var sortButton = await getElementsByXPath('//a[@class="S_txt1 " and @action-type="search_type"]');
    if (sortButton.snapshotLength > 0) {
        sortButton.snapshotItem(0).click();
        await sleep(1000);
    }

    console.log('ready to click like');

    var response = null;
    while (ccrunning) {
        response = await clickTargetLike(numLikes, lstPermitWords, lstForbidWords, clickInnerLike);
        console.log('已点赞：' + activeCcMsg.commentControlCount);
        if (!ccrunning || activeCcMsg.commentControlCount >= numLikes) {
            break;
        } else if (response.code !== '100000') {
            break;
        } else {
            var clickMoreCommentButtonPath = '//a[@action-type="click_more_comment"]';
            await scrollToBottom(clickMoreCommentButtonPath);
            await sleep(1000);
            var clickMoreCommentButton = await getElementsByXPath(clickMoreCommentButtonPath);
            if (clickMoreCommentButton.snapshotLength !== 0) {
                clickMoreCommentButton.snapshotItem(0).click();
                await sleep(1000);
            }
        }
    }
    return activeCcMsg.commentControlCount;
}

async function commentControl(numLikes, permitWords, forbidWords, clickInnerLike) {
    console.log('commentControl starts');
    var lstPermitWords = ['伯远'];
    lstPermitWords = lstPermitWords.concat(permitWords.split(' '));
    var lstForbidWords = forbidWords.split(' ');
    if (numLikes !== 0 && ccrunning) activeCcMsg.commentControlCount = await likeWeiboWithRules(numLikes, lstPermitWords, lstForbidWords, clickInnerLike);
    if (!ccrunning) {
        console.log('stop due to [stop button]');
    } else {
        ccrunning = false;
        console.log('stop due to [finished]');
        chrome.runtime.sendMessage({ "type": "finishedCommentControl", "from": "content" });
    }
}
