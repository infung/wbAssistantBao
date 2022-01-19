const weiboDataModes = {
    'spCheckIn': 'https://weibo.com/p/100808175a4d8afcf16ea86372c0aa24aa8ab3/super_index',
    'reading': 'https://weibo.com/xevier?profile_ftype=1&is_all=1',
    'amanComment': 'https://weibo.com/p/100808175a4d8afcf16ea86372c0aa24aa8ab3/super_index',
    'searching': 'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C?topnav=1&wvr=6&b=1&sudaref=weibo.com',
    'searchingList': [
        'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E4%BC%AF%E8%BF%9C&fenlei=256&rsv_pq=a3bdb76700033318&rsv_t=be79xcZjn3AVLzTsc71MgrLyu5Pd6V6I7FeKgb5tftn7aMp8C%2Fqsytvr9K8&rqlang=cn&rsv_enter=1&rsv_dl=ih_0&rsv_sug3=1&rsv_sug1=1&rsv_sug7=001&rsv_sug2=1&rsv_btype=i&rsp=0&rsv_sug9=es_2_1&rsv_sug4=1265&rsv_sug=1',
        'https://www.douban.com/search?q=%E4%BC%AF%E8%BF%9C',
        'https://www.zhihu.com/search?type=content&q=%E4%BC%AF%E8%BF%9C',
        'https://v.qq.com/x/search/?q=%E4%BC%AF%E8%BF%9C&stag=0&smartbox_ab=',
        'https://so.iqiyi.com/so/q_%E4%BC%AF%E8%BF%9C?source=input&sr=18747428693920532&ssrt=20210809220650081&ssra=b4e6cd6d0a8560feb7ea0770a3057d06',
        'https://so.youku.com/search_video/q_%E4%BC%AF%E8%BF%9C?searchfrom=1',
        'https://search.bilibili.com/all?keyword=%E4%BC%AF%E8%BF%9C&from_source=web_search'
    ],
    'tagSearch': 'https://s.weibo.com/weibo/INTO1-%25E4%25BC%25AF%25E8%25BF%259C?topnav=1&wvr=6&b=1',
    'tagSearchList': [
        'https://s.weibo.com/weibo/%2523%25E4%25BC%25AF%25E8%25BF%259C0211%25E7%2594%259F%25E6%2597%25A5%25E5%25BF%25AB%25E4%25B9%2590%2523?topnav=1&wvr=6&b=1', //#伯远0211生日快乐#
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C0211%25E7%2594%259F%25E6%2597%25A5%25E5%25BF%25AB%25E4%25B9%2590?topnav=1&wvr=6&b=1', //伯远0211生日快乐
        'https://s.weibo.com/weibo/%2523%25E4%25BC%25AF%25E8%25BF%259C%25E7%25BF%25BB%25E5%2594%25B1%25E9%2582%25A3%25E4%25B9%2588%25E9%25AA%2584%25E5%2582%25B2%2523?topnav=1&wvr=6&b=1', //#伯远翻唱那么骄傲#
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E7%25BF%25BB%25E5%2594%25B1%25E9%2582%25A3%25E4%25B9%2588%25E9%25AA%2584%25E5%2582%25B2?topnav=1&wvr=6&b=1', //伯远翻唱那么骄傲
        'https://s.weibo.com/weibo/%2523%25E8%25A2%25AB%25E5%25A5%2587%25E9%2581%2587%25E4%25BA%25BA%25E9%2597%25B4%25E8%25A7%2592%25E8%2590%25BD%25E9%2587%258C%25E7%259A%2584%25E4%25BC%25AF%25E8%25BF%259C%25E6%259A%2596%25E5%2588%25B0%25E4%25BA%2586%2523?topnav=1&wvr=6&b=1', //#被奇遇人间角落里的伯远暖到了#
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E7%259B%25B4%25E6%2592%25AD?topnav=1&wvr=6&b=1', //伯远直播
        'https://s.weibo.com/weibo/%2523%25E4%25BC%25AF%25E8%25BF%259C%25E4%25B8%258A%25E5%25BE%2597%25E8%2588%259E%25E5%258F%25B0%25E4%25B8%258B%25E5%25BE%2597%25E5%258E%25A8%25E6%2588%25BF%2523?topnav=1&wvr=6&b=1', //#伯远上得舞台下得厨房#
        'https://s.weibo.com/weibo/%2523%25E4%25BC%25AF%25E8%25BF%259C%25E7%258E%25B0%25E5%259C%25BA%25E5%25A5%25BD%25E7%25A8%25B3%2523?topnav=1&wvr=6&b=1', //#伯远现场好稳#
        'https://s.weibo.com/weibo?q=%23%E4%BC%AF%E8%BF%9C%E8%A2%AB%E7%89%B9%E6%95%88%E7%8C%AB%E5%92%AA%E6%9A%B4%E6%89%93%23&wvr=6&b=1&Refer=SWeibo_box', //#伯远被特效猫咪暴打#
        'https://s.weibo.com/weibo/%2523%25E4%25BC%25AF%25E8%25BF%259C%25E7%259C%258B%25E6%25AF%2594%25E8%25B5%259B%25E4%25B8%258D%25E5%25BF%2598%25E5%2590%2583%25E8%258B%25B9%25E6%259E%259C%2523?topnav=1&wvr=6&b=1', //#伯远看比赛不忘吃苹果#
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%2520%25E5%258C%2597%25E4%25BA%25AC?topnav=1&wvr=6&b=1', //伯远 北京
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259Cvlog?topnav=1&wvr=6&b=1', //伯远vlog
        'https://s.weibo.com/weibo?q=%E4%BC%AF%E8%BF%9C%E8%B5%B6%E6%B5%B7&wvr=6&b=1&Refer=SWeibo_box', //伯远赶海
        'https://s.weibo.com/weibo/%2523%25E4%25BC%25AF%25E8%25BF%259C%25E9%2587%258D%25E5%25BA%2586%2523?topnav=1&wvr=6&b=1', //#伯远重庆#
        'https://s.weibo.com/weibo/%25E6%25B1%25A4%25E4%25BC%25AF%25E8%25BF%259C?topnav=1&wvr=6&b=1', //汤伯远
        'https://s.weibo.com/weibo?q=%23%E4%BC%AF%E8%BF%9C%E7%B2%89%E4%B8%9D%E5%96%9C%E6%AC%A2%E7%9A%84%E5%B0%B1%E6%98%AF%E4%BC%AF%E8%BF%9C%23', //#伯远粉丝喜欢的就是伯远#
        'https://s.weibo.com/weibo?q=%23%E4%BC%AF%E8%BF%9C%E7%9A%84%E7%94%9F%E6%B4%BB%E4%BB%AA%E5%BC%8F%E6%84%9F%23', //伯远的生活仪式感
        'https://s.weibo.com/weibo/%25E8%25B0%2581%25E7%259C%258B%25E4%25BA%2586%25E4%25B8%258D%25E5%25BE%2597%25E5%25A4%25B8%25E4%25BC%25AF%25E8%25BF%259C%25E6%258C%2581%25E4%25B9%2585?topnav=1&wvr=6&b=1', //谁看了不得夸伯远持久
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E6%2597%25A0%25E9%2594%25A1?topnav=1&wvr=6&b=1', //伯远无锡
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E6%2580%258E%25E4%25B9%2588%25E4%25B8%2580%25E7%259B%25B4%25E5%259C%25A8%25E5%2590%2583%25E8%258B%25B9%25E6%259E%259C?topnav=1&wvr=6&b=1', //伯远怎么一直在吃苹果
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E5%25AE%25B3%25E7%25BE%259E?topnav=1&wvr=6&b=1', //伯远害羞
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E5%25AE%259E%25E5%258A%259B?topnav=1&wvr=6&b=1' //伯远实力
    ],
    'mainPage': 'https://weibo.com',
    'superTopic': 'https://weibo.com/p/100808cd19f50b7e758a497f78651157aecdc5/super_index'
}

var activeControl = 'weiboData';
var activeState = 'ready';
var activeTab = null;
var activeInput = {}; //from popup
var activeMsg = {}; //from content

// comment control
var activeCcState = 'ready';
var activeCcInput = {};
var activeCcMsg = {};

window.onload = function () {
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg['from'] == 'popup' && msg['type'] == 'view') {
            sendResponse({
                'activeControl': activeControl,
                'activeState': activeState,
                'activeInput': activeInput,
                'activeMsg': activeMsg,
                'activeCcState': activeCcState,
                'activeCcInput': activeCcInput,
                'activeCcMsg': activeCcMsg
            });
            console.log('view request');
        } else if (msg['from'] == 'popup' && msg['type'] == 'input') {
            if (msg['mode'] == 'normal') {
                activeInput = msg['activeInput'];
            } else {
                activeCcInput = msg['activeCcInput'];
            }
            sendResponse('input received in background'); 
        } else if (msg['from'] == 'popup' && msg['type'] == 'start') {
            activeTab = msg['tabId'];
            if (msg['mode'] == 'normal') {
                startSending().then(sendResponse);
            } else {
                startCommentControl().then(sendResponse);
            }
            return true;
        } else if (msg['from'] == 'popup' && msg['type'] == 'stop') {
            if (msg['mode'] == 'normal') {
                activeState = 'finished';
                stopSending().then(sendResponse);
            } else {
                activeCcState = 'finished';
                stopCommentControl().then(sendResponse);
            }
            return true;
        } else if (msg['from'] == 'popup' && msg['type'] == 'reset') {
            if (msg['mode'] == 'normal') {
                activeMsg = {};
                activeControl = 'weiboData';
                activeState = 'ready';
                activeTab = null;
                sendResponse({
                    'activeInput': activeInput,
                    'activeMsg': activeMsg
                });
            } else {
                activeCcMsg = {};
                activeControl = 'weiboData';
                activeCcState = 'ready';
                activeTab = null;
                sendResponse({
                    'activeCcInput': activeCcInput,
                    'activeCcMsg': activeCcMsg
                });
            }
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedSpCheckIn') {
            triggerAmanComment();
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedAmanComment') {
            triggerReading();
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedReading') {
            triggerSubReading(msg['wbLinks']);
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedTagSearch') {
            triggerSubTagSearch(weiboDataModes['tagSearchList']);
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedSearching') {
            triggerSubSearching(weiboDataModes['searchingList']);
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedWbPost') {
            triggerRepost();
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedRepost') {
            triggerCommentLike();
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedCommentLike') {
            finishSending('');
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedCommentControl') {
            finishCommentControl('');
        } else if (msg['from'] == 'content' && msg['type'] == 'state') {
            if (msg['mode'] == 'normal') {
                activeMsg = msg['activeMsg'];
                //console.log(activeMsg);
            } else {
                activeCcMsg = msg['activeCcMsg'];
            }
        }
    });
};

function triggerSubReading(links) {
    startReadSearch(links).then((result) => {
        activeMsg.readingStatus = result;
        setReadSearchState();
        if (activeState === 'running') {
            triggerTagSearch();
        }
    });
}

function triggerSubTagSearch(links) {
    startReadSearch(links).then((result) => {
        activeMsg.tagSearchStatus = result;
        setReadSearchState();
        if (activeState === 'running') {
            triggerSearching();
        }
    });
}

function triggerSubSearching(links) {
    startReadSearch(links).then((result) => {
        activeMsg.searchingStatus = result;
        setReadSearchState();
        if (activeState === 'running') {
            triggerWbPost();
        }
    });
}

function triggerAmanComment() {
    if (activeInput['amanComment']) {
        startSendingWeiboData('amanComment');
    } else {
        triggerReading();
    }
}

function triggerReading() {
    if (activeInput['reading']) {
        startSendingWeiboData('reading');
    } else {
        triggerTagSearch();
    }
}

function triggerTagSearch() {
    if (activeInput['tagSearch']) {
        startSendingWeiboData('tagSearch');
    } else {
        triggerSearching();
    }
}

function triggerSearching() {
    if (activeInput['searching']) {
        startSendingWeiboData('searching');
    } else {
        triggerWbPost();
    }
}

function triggerWbPost() {
    if (activeInput['wbPostInput'] > 0) {
        startSendingWeiboData(activeInput['wbPostOrigin']);
    } else {
        triggerRepost();
    }
}

function triggerRepost() {
    if (activeInput['loopRepostControl'] && activeInput['repostInput'] > 0) {
        startSendingZpz('repost', activeInput['rpWeiboUrl']).then((result) => {
            if (!result.isSuccess) {
                finishSending(result.msg)
            }
        });
    } else {
        triggerCommentLike();
    }
}

function triggerCommentLike() {
    if (activeInput['loopCommentLikeControl'] &&(activeInput['commentInput'] > 0 || activeInput['likeInput'] > 0)) {
        startSendingZpz('commentLike', activeInput['clWeiboUrl']).then((result) => {
            if (!result.isSuccess) {
                finishSending(result.msg)
            }
        });
    } else {
        finishSending('');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setReadSearchState(rs) {
    try {
        chrome.runtime.sendMessage({
            "type": "state",
            "from": "background",
            "mode": "normal",
            "activeMsg": activeMsg
        });
    } catch (e) {
        console.log(e);
    }
}

function readingSearching(link, i) {
    return new Promise(resolve => {
        try {
            chrome.tabs.update(activeTab, { url: link }, function () {
                console.log("finish reading page " + i);
                resolve(true);
            });
        } catch (e) {
            resolve(false);
        }
    });
}

async function readSearch(resolve, links) {
    var result = false;
    for (let i = 0; i < links.length; i++) {
        result = await readingSearching(links[i], i);
        await sleep(16000);
        if (!result || activeState !== 'running') {
            console.log(activeState + ', stop reading or searching.');
            result = false;
            break;
        }
    }
    console.log(result);
    resolve(result);
}

function startReadSearch(links) {
    return new Promise(resolve => {
        console.log(links);
        readSearch(resolve, links);
    });
}

function sendingZpz(type, resolve) {
    setTimeout(() => {
        try {
            var result = { isSuccess: false, msg: '' };
            chrome.tabs.sendMessage(activeTab, {
                'type': 'allForBY',
                'from': 'background'
            }, function (byOnly) {
                console.log('by only? ' + byOnly);
                if (byOnly && activeState !== 'finished') {
                    try {
                        chrome.tabs.sendMessage(activeTab, {
                            'type': type,
                            'from': 'background',
                            'repostInput': activeInput['repostInput'],
                            'commentInput': activeInput['commentInput'],
                            'likeInput': activeInput['likeInput'],
                            'repostContent': activeInput['repostContent'],
                            'randomRepost': activeInput['randomRepost'],
                            'commentContent': activeInput['commentContent'],
                            'lzl': activeInput['lzl'],
                            'randomComment': activeInput['randomComment'],
                            'likeOrigin': activeInput['likeOrigin'],
                            'activeMsg': activeMsg
                        }, function (msg) {
                            console.log(msg);
                            result.isSuccess = true;
                            resolve(result);
                        });
                    } catch (e) {
                        activeState = 'finished';
                        resolve(result);
                    }
                } else if (byOnly === false) {
                    activeState = 'finished';
                    result.msg = '请在伯远相关微博的单独页面使用转评赞功能。';
                    resolve(result);
                } else if (activeState === 'finished') {
                    activeState = 'finished';
                    resolve(result);
                }
            });
        } catch (e) {
            activeState = 'finished';
            resolve(result);
        }
    }, 2000);
}

function sendingCc(type, resolve) {
    setTimeout(() => {
        var result = { isSuccess: false, msg: '' };
        if (activeCcState !== 'finished') {
            try {
                chrome.tabs.sendMessage(activeTab, {
                    'type': type,
                    'from': 'background',
                    'commentControlInput': activeCcInput['commentControlInput'],
                    'ccPostiveTags': activeCcInput['ccPostiveTags'],
                    'ccNegativeTags': activeCcInput['ccNegativeTags'],
                    'nz': activeCcInput['nz']
                }, function (msg) {
                    console.log(msg);
                    result.isSuccess = true;
                    resolve(result);
                });
            } catch (e) {
                activeCcState = 'finished';
                resolve(result);
            }
        }
    }, 2000);
}

function startSendingZpz(type, weiboUrl) {
    return new Promise(resolve => {
        var result = { isSuccess: false, msg: '' };
        if (type != 'commentControl') {
            activeState = 'running';
        } else {
            activeCcState = 'running';
        }
        activeControl = type;
        try {
            //navigate to weibourl
            chrome.tabs.get(activeTab, function (tab) {
                var urlFindId = tab.url.split('?')[0];
                if (tab.url == weiboUrl || weiboUrl.includes(urlFindId)) {
                    if (type != 'commentControl') {
                        //check by only
                        sendingZpz(type, resolve);
                    } else {
                        sendingCc(type, resolve);
                    }
                } else {
                    try {
                        chrome.tabs.update(activeTab, { url: weiboUrl }, function () {
                            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                                if (activeTab && tabId === activeTab && changeInfo.status == 'complete' && activeControl == type) {
                                    console.log('sending ' + type);
                                    chrome.tabs.onUpdated.removeListener(listener);
                                    if (type != 'commentControl') {
                                        //check by only
                                        sendingZpz(type, resolve);
                                    } else {
                                        sendingCc(type, resolve);
                                    }
                                }
                            });
                        });
                    } catch (e) {
                        if (type != 'commentControl') {
                            activeState = 'finished';
                        } else {
                            activeCcState = 'finished';
                        }
                        resolve(result);
                    }
                }
            });
        } catch (e) {
            if (type != 'commentControl') {
                activeState = 'finished';
            } else {
                activeCcState = 'finished';
            }
            resolve(result);
        }
    });
}

function sendingWeiboData(type, resolve) {
    setTimeout(() => {
        var result = { isSuccess: false, msg: '' };
        if (activeState !== 'finished') {
            try {
                chrome.tabs.sendMessage(activeTab, {
                    'type': type,
                    'from': 'background',
                    'spCheckIn': activeInput['spCheckIn'],
                    'amanComment': activeInput['amanComment'],
                    'reading': activeInput['reading'],
                    'searching': activeInput['searching'],
                    'tagSearch': activeInput['tagSearch'],
                    'wbPostOrigin': activeInput['wbPostOrigin'],
                    'wbPostInput': activeInput['wbPostInput'],
                    'wbPostTag': activeInput['wbPostTag'],
                    'activeMsg': activeMsg
                }, function (msg) {
                    console.log(msg);
                    result.isSuccess = true;
                    resolve(result);
                });
            } catch (e) {
                activeState = 'finished';
                resolve(result);
            }
        }
    }, 2000);
}

function startSendingWeiboData(type) {
    return new Promise(resolve => {
        var result = { isSuccess: false, msg: '' };
        activeState = 'running';
        const url = weiboDataModes[type];
        activeControl = 'weiboData';
        try {
            //navigate to supertopic
            chrome.tabs.get(activeTab, function (tab) {
                if (tab.url == url) {
                    sendingWeiboData(type, resolve);
                } else {
                    try {
                        chrome.tabs.update(activeTab, { url: url }, function () {
                            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                                if (activeTab && tabId === activeTab && changeInfo.status == 'complete') {
                                    console.log('sending ' + type);
                                    chrome.tabs.onUpdated.removeListener(listener);
                                    sendingWeiboData(type, resolve);
                                }
                            });
                        });
                    } catch (e) {
                        activeState = 'finished';
                        resolve(result);
                    }
                }
            });
        } catch (e) {
            activeState = 'finished';
            resolve(result);
        }
    });
}

async function startSending() {
    var result = { isSuccess: false, msg: '' };
    if (activeInput['repostInput'] > 0 && !activeInput['rpWeiboUrl'].includes('weibo.com') ||
        ((activeInput['commentInput'] > 0 || activeInput['likeInput'] > 0) && !activeInput['clWeiboUrl'].includes('weibo.com'))) {
        result.msg = '请输入需转评赞微博的页面链接。';
    } else {
        if (activeInput['weiboDataControl']) {
            if (activeInput['spCheckIn']) {
                result = await startSendingWeiboData('spCheckIn');
            } else if (activeInput['amanComment']) {
                result = await startSendingWeiboData('amanComment');
            } else if (activeInput['reading']) {
                result = await startSendingWeiboData('reading');
            } else if (activeInput['searching']) {
                result = await startSendingWeiboData('searching');
            } else if (activeInput['tagSearch']) {
                result = await startSendingWeiboData('tagSearch');
            } else if (activeInput['wbPostInput'] > 0) {
                result = await startSendingWeiboData(activeInput['wbPostOrigin']);
            }
        } else if (activeInput['loopRepostControl'] && activeInput['repostInput'] > 0) {
            result = await startSendingZpz('repost', activeInput['rpWeiboUrl']);
        } else if (activeInput['loopCommentLikeControl'] &&(activeInput['commentInput'] > 0 || activeInput['likeInput'] > 0)) {
            result = await startSendingZpz('commentLike', activeInput['clWeiboUrl']);
        }
    }
    return result;
}

function stopSending() {
    return new Promise(resolve => {
        try {
            chrome.tabs.sendMessage(activeTab, {
                'type': 'stopSending',
                'from': 'background',
                'mode': 'normal'
            }, function (msg) {
                console.log(msg);
                chrome.tabs.reload(activeTab);
                activeTab = null;
                resolve(true);
            });
        } catch (e) {
            resolve(false);
        }
    });
}


function finishSending(reason) {
    try {
        chrome.runtime.sendMessage({
            'type': 'finished',
            'from': 'background',
            "mode": "normal",
            'reason': reason
        });
        activeState = 'finished';
        chrome.tabs.reload(activeTab);
        activeTab = null;
    } catch (e) {
        console.log(e);
    }
}

// comment control
async function startCommentControl() {
    var result = { isSuccess: false, msg: '' };
    if (!activeCcInput['ccWeiboUrl'].includes('weibo.com')) {
        result.msg = '请输入需空瓶微博的页面链接。';
    } else {
        result = await startSendingZpz('commentControl', activeCcInput['ccWeiboUrl']);
    }
    return result;
}

function stopCommentControl() {
    return new Promise(resolve => {
        try {
            chrome.tabs.sendMessage(activeTab, {
                'type': 'stopSending',
                'from': 'background',
                'mode': 'commentControl'
            }, function (msg) {
                console.log(msg);
                chrome.tabs.reload(activeTab);
                activeTab = null;
                resolve(true);
            });
        } catch (e) {
            resolve(false);
        }
    });
}

function finishCommentControl(reason) {
    try {
        chrome.runtime.sendMessage({
            'type': 'finished',
            'from': 'background',
            "mode": "commentControl",
            'reason': reason
        });
        activeCcState = 'finished';
        chrome.tabs.reload(activeTab);
        activeTab = null;
    } catch (e) {
        console.log(e);
    }
}