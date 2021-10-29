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
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E7%259B%25B4%25E6%258B%258D?topnav=1&wvr=6&b=1', //伯远直拍
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E7%25B2%2589%25E4%25B8%259D?topnav=1&wvr=6&b=1', //伯远粉丝
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E5%25AE%259E%25E5%258A%259B?topnav=1&wvr=6&b=1', //伯远实力
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E7%259B%25B4%25E6%2592%25AD?topnav=1&wvr=6&b=1', //伯远直播
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E5%2595%2586%25E5%258A%25A1?topnav=1&wvr=6&b=1', //伯远商务
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E8%25B6%2585%25E8%25AF%259D?topnav=1&wvr=6&b=1', //伯远超话
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E5%2590%258C%25E6%25AC%25BE?topnav=1&wvr=6&b=1', //伯远同款
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E5%25A3%2581%25E7%25BA%25B8?topnav=1&wvr=6&b=1', //伯远壁纸
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E8%2587%25AA%25E6%258B%258D?topnav=1&wvr=6&b=1', //伯远自拍
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259Cvlog?topnav=1&wvr=6&b=1', //伯远vlog
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E8%2590%25A5%25E4%25B8%259A?topnav=1&wvr=6&b=1', //伯远营业
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E5%25B9%25B3%25E5%25AE%2589%25E5%2596%259C%25E4%25B9%2590?topnav=1&wvr=6&b=1', //伯远平安喜乐
        'https://s.weibo.com/weibo/%25E6%25B1%25A4%25E4%25BC%25AF%25E8%25BF%259C?topnav=1&wvr=6&b=1', //汤伯远
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E7%25B2%2589%25E4%25B8%259D%25E5%2596%259C%25E6%25AC%25A2%25E7%259A%2584%25E5%25B0%25B1%25E6%2598%25AF%25E4%25BC%25AF%25E8%25BF%259C?topnav=1&wvr=6&b=1', //伯远粉丝喜欢的就是伯远
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%2520%25E5%25B9%25BF%25E5%25B7%259E?topnav=1&wvr=6&b=1', //伯远 广州
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E7%259B%25B4%25E6%2592%25AD%25E9%25A2%2584%25E5%2591%258A?topnav=1&wvr=6&b=1', //伯远直播预告
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E5%2585%25A8%25E8%2583%25BD%25E8%25BF%25BD%25E6%25A2%25A6%25E4%25BA%25BA?topnav=1&wvr=6&b=1', //伯远全能追梦人
        'https://s.weibo.com/weibo/into1%25E4%25BC%25AF%25E8%25BF%259C%2520%25E6%25AD%25A3%25E7%25BB%259F%25E5%2594%25B1%25E8%25B7%25B3ace?topnav=1&wvr=6&b=1', //into1伯远 正统唱跳ace
        'https://s.weibo.com/weibo/into1%25E4%25BC%25AF%25E8%25BF%259C%2520%25E5%2585%25A8%25E8%2583%25BDlive%25E5%25A4%25A7vocal?topnav=1&wvr=6&b=1', //into1伯远 全能live大vocal
        'https://s.weibo.com/weibo/%25E4%25BC%25AF%25E8%25BF%259C%25E5%2590%258C%25E6%25AC%25BE%25E4%25BB%25A4%25E6%2588%2591%25E5%25BF%2583%25E5%258A%25A8?topnav=1&wvr=6&b=1' //伯远同款令我心动
    ],
    'mainPage': 'https://weibo.com',
    'superTopic': 'https://weibo.com/p/100808cd19f50b7e758a497f78651157aecdc5/super_index'
}

var activeControl = 'weiboData';
var activeState = 'ready';
var activeTab = null;
var activeInput = {}; //from popup
var activeMsg = {}; //from content

window.onload = function () {
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        if (msg['from'] == 'popup' && msg['type'] == 'view') {
            sendResponse({
                'activeControl': activeControl,
                'activeState': activeState,
                'activeInput': activeInput,
                'activeMsg': activeMsg
            });
        } else if (msg['from'] == 'popup' && msg['type'] == 'input') {
            activeInput = msg['activeInput'];
            sendResponse('input received in background');
        } else if (msg['from'] == 'popup' && msg['type'] == 'start') {
            activeTab = msg['tabId'];
            startSending().then(sendResponse);
            return true;
        } else if (msg['from'] == 'popup' && msg['type'] == 'stop') {
            activeState = 'finished';
            stopSending().then(sendResponse);
            return true;
        } else if (msg['from'] == 'popup' && msg['type'] == 'reset') {
            activeMsg = {};
            activeControl = 'weiboData';
            activeState = 'ready';
            activeTab = null;
            sendResponse({
                'activeInput': activeInput,
                'activeMsg': activeMsg
            });
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
            triggerZpz();
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedRepost') {
            triggerCommentLike();
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedCommentLike') {
            finishSending('');
        } else if (msg['from'] == 'content' && msg['type'] == 'state') {
            activeMsg = msg['activeMsg'];
            //console.log(activeMsg);
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
        triggerZpz();
    }
}

function triggerRepost() {
    if (activeInput['repostInput'] > 0) {
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
    if (activeInput['commentInput'] > 0 || activeInput['likeInput'] > 0) {
        startSendingZpz('commentLike', activeInput['clWeiboUrl']).then((result) => {
            if (!result.isSuccess) {
                finishSending(result.msg)
            }
        });
    } else {
        finishSending('');
    }
}

function triggerZpz() {
    if (activeInput['zpzControl']) {
        triggerRepost();
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

function startSendingZpz(type, weiboUrl) {
    return new Promise(resolve => {
        var result = { isSuccess: false, msg: '' };
        activeState = 'running';
        activeControl = 'zpz';
        try {
            //navigate to weibourl
            chrome.tabs.get(activeTab, function (tab) {
                var urlFindId = tab.url.split('?')[0];
                if (tab.url == weiboUrl || weiboUrl.includes(urlFindId)) {
                    sendingZpz(type, resolve);
                } else {
                    try {
                        chrome.tabs.update(activeTab, { url: weiboUrl }, function () {
                            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                                if (activeTab && tabId === activeTab && changeInfo.status == 'complete' && activeControl == 'zpz') {
                                    console.log('sending ' + type);
                                    chrome.tabs.onUpdated.removeListener(listener);
                                    //check by only
                                    sendingZpz(type, resolve);
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
        } else {
            if (activeInput['repostInput'] > 0) {
                result = await startSendingZpz('repost', activeInput['rpWeiboUrl']);
            } else if (activeInput['commentInput'] > 0 || activeInput['likeInput'] > 0) {
                result = await startSendingZpz('commentLike', activeInput['clWeiboUrl']);
            }
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
            'reason': reason
        });
        activeState = 'finished';
        chrome.tabs.reload(activeTab);
        activeTab = null;
    } catch (e) {
        console.log(e);
    }
}