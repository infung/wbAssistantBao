const weiboDataModes = {
    'spCheckIn': 'https://weibo.com/p/100808175a4d8afcf16ea86372c0aa24aa8ab3/super_index',
    'reading': 'https://weibo.com/xevier?profile_ftype=1&is_all=1',
    'amanComment': 'https://weibo.com/p/100808175a4d8afcf16ea86372c0aa24aa8ab3/super_index',
    'spZnl': 'https://weibo.com/p/100808cd19f50b7e758a497f78651157aecdc5/super_index',
    'mpZnl': 'https://weibo.com'
}

var AmanDataModes = {
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
    'bdComment': 'https://tieba.baidu.com/f?ie=utf-8&kw=%E4%BC%AF%E8%BF%9Cxevier',
    'bd': 'https://tieba.baidu.com/f?ie=utf-8&kw=%E4%BC%AF%E8%BF%9Cxevier',
    'bdBuilding': ''
}

var activeMode = 'spCheckIn';
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
            activeMode = 'spCheckIn';
            activeControl = 'weiboData';
            activeState = 'ready';
            activeTab = null;
            sendResponse(activeMsg);
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedSpCheckIn') {
            if (activeInput['reading']) {
                startSendingData('reading');
            } else if (activeInput['amanComment']) {
                startSendingData('amanComment');
            } else if (activeInput['spZnlInput'] > 0) {
                startSendingData('spZnl');
            } else if (activeInput['mpZnlInput'] > 0) {
                startSendingData('mpZnl');
            } else if (activeInput['zpzControl']) {
                startSendingZpz().then((result) => {
                    if (!result.isSuccess) {
                        finishSending(result.msg)
                    }
                })
            } else if (activeInput['amanControl']) {
                if (activeInput['searching']) {
                    startSendingData('searching');
                } else if (activeInput['bdComment']) {
                    startSendingData('bdComment');
                } else if (activeInput['bdInput'] > 0) {
                    startSendingData('bd');
                }
            } else {
                finishSending('');
            }
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedReading') {
            startReadSearch(msg['wbLinks']).then((result) => {
                activeMsg.readingStatus = result;
                setReadSearchState();
                if (activeState === 'running') {
                    console.log('finished reading, continue other tasks.');
                    if (activeInput['amanComment']) {
                        startSendingData('amanComment');
                    } else if (activeInput['spZnlInput'] > 0) {
                        startSendingData('spZnl');
                    } else if (activeInput['mpZnlInput'] > 0) {
                        startSendingData('mpZnl');
                    } else if (activeInput['zpzControl']) {
                        startSendingZpz().then((result) => {
                            if (!result.isSuccess) {
                                finishSending(result.msg)
                            }
                        })
                    } else if (activeInput['amanControl']) {
                        if (activeInput['searching']) {
                            startSendingData('searching');
                        } else if (activeInput['bdComment']) {
                            startSendingData('bdComment');
                        } else if (activeInput['bdInput'] > 0) {
                            startSendingData('bd');
                        }
                    } else {
                        finishSending('');
                    }
                }
            });
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedAmanComment') {
            if (activeInput['spZnlInput'] > 0) {
                startSendingData('spZnl');
            } else if (activeInput['mpZnlInput'] > 0) {
                startSendingData('mpZnl');
            } else if (activeInput['zpzControl']) {
                startSendingZpz().then((result) => {
                    if (!result.isSuccess) {
                        finishSending(result.msg)
                    }
                })
            } else if (activeInput['amanControl']) {
                if (activeInput['searching']) {
                    startSendingData('searching');
                } else if (activeInput['bdComment']) {
                    startSendingData('bdComment');
                } else if (activeInput['bdInput'] > 0) {
                    startSendingData('bd');
                }
            } else {
                finishSending('');
            }
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedSpZnl') {
            if (activeInput['mpZnlInput'] > 0) {
                startSendingData('mpZnl');
            } else if (activeInput['zpzControl']) {
                startSendingZpz().then((result) => {
                    if (!result.isSuccess) {
                        finishSending(result.msg)
                    }
                })
            } else if (activeInput['amanControl']) {
                if (activeInput['searching']) {
                    startSendingData('searching');
                } else if (activeInput['bdComment']) {
                    startSendingData('bdComment');
                } else if (activeInput['bdInput'] > 0) {
                    startSendingData('bd');
                }
            } else {
                finishSending('');
            }
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedMpZnl') {
            if (activeInput['zpzControl']) {
                startSendingZpz().then((result) => {
                    if (!result.isSuccess) {
                        finishSending(result.msg)
                    }
                });
            } else if (activeInput['amanControl']) {
                if (activeInput['searching']) {
                    startSendingData('searching');
                } else if (activeInput['bdComment']) {
                    startSendingData('bdComment');
                } else if (activeInput['bdInput'] > 0) {
                    startSendingData('bd');
                }
            } else {
                finishSending('');
            }
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedZpz') {
            if (activeInput['amanControl']) {
                if (activeInput['searching']) {
                    startSendingData('searching');
                } else if (activeInput['bdComment']) {
                    startSendingData('bdComment');
                } else if (activeInput['bdInput'] > 0) {
                    startSendingData('bd');
                }
            } else {
                finishSending('');
            }
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedSearching') {
            startReadSearch(AmanDataModes['searchingList']).then((result) => {
                activeMsg.searchingStatus = result;
                setReadSearchState();
                if (activeState === 'running') {
                    console.log('finished reading, continue other tasks.');
                    if (activeInput['bdComment']) {
                        startSendingData('bdComment');
                    } else if (activeInput['bdInput'] > 0) {
                        startSendingData('bd');
                    } else {
                        finishSending('');
                    }
                }
            });
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedGetBdBuilding') {
            AmanDataModes['bdBuilding'] = msg['bdBuilding'];
            startSendingData('bdBuilding');
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedBdComment') {
            if (activeInput['bdInput'] > 0) {
                startSendingData('bd');
            } else {
                finishSending('');
            }
        } else if (msg['from'] == 'content' && msg['type'] == 'finishedBd') {
            finishSending('');
        } else if (msg['from'] == 'content' && msg['type'] == 'state') {
            activeMsg = msg['activeMsg'];
            //console.log(activeMsg);
        }
    });
};

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
                console.log("finish reading by's weibo " + i);
                resolve(true);
            });
        } catch (e) {
            resolve(false);
        }
    });
}

async function readSearch(resolve, links) {
    var result = true;
    for (let i = 0; i < links.length; i++) {
        result = await readingSearching(links[i], i);
        await sleep(16000);
        if (!result || activeState !== 'running') {
            console.log(activeState + ', stop reading or searching.');
            break;
        }
    }
    resolve(result);
}

function startReadSearch(links) {
    return new Promise(resolve => {
        console.log(links);
        readSearch(resolve, links);
    });
}

function sendingZpz(resolve) {
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
                            'type': 'zpz',
                            'from': 'background',
                            'repostInput': activeInput['repostInput'],
                            'commentInput': activeInput['commentInput'],
                            'likeInput': activeInput['likeInput'],
                            'repostContent': activeInput['repostContent'],
                            'commentContent': activeInput['commentContent'],
                            'likeOrigin': activeInput['likeOrigin'],
                            'activeMsg': activeMsg
                        }, function (msg) {
                            console.log(msg);
                            activeState = 'running';
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

function startSendingZpz() {
    return new Promise(resolve => {
        var result = { isSuccess: false, msg: '' };
        activeControl = 'zpz';
        try {
            //navigate to weibourl
            chrome.tabs.get(activeTab, function (tab) {
                var urlFindId = tab.url.split('?')[0];
                if (tab.url == activeInput['weiboUrl'] || activeInput['weiboUrl'].includes(urlFindId)) {
                    sendingZpz(resolve);
                } else {
                    try {
                        chrome.tabs.update(activeTab, { url: activeInput['weiboUrl'] }, function () {
                            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                                if (activeTab && tabId === activeTab && changeInfo.status == 'complete' && activeControl == 'zpz') {
                                    console.log('sending zpz');
                                    chrome.tabs.onUpdated.removeListener(listener);
                                    //check by only
                                    sendingZpz(resolve);
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

function sendingData(type, resolve) {
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
                    'spZnlInput': activeInput['spZnlInput'],
                    'wbContent': activeInput['wbContent'],
                    'mpZnlInput': activeInput['mpZnlInput'],
                    'mpZnlTag': activeInput['mpZnlTag'],
                    'wqTag': activeInput['wqTag'],
                    'searching': activeInput['searching'],
                    'bdComment': activeInput['bdComment'],
                    'bdInput': activeInput['bdInput'],
                    'activeMsg': activeMsg,
                }, function (msg) {
                    console.log(msg);
                    activeState = 'running';
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

function startSendingData(type) {
    return new Promise(resolve => {
        var result = { isSuccess: false, msg: '' };
        var url = '';
        if (weiboDataModes.hasOwnProperty(type)) {
            url = weiboDataModes[type];
            activeControl = 'weiboData';
        } else {
            url = AmanDataModes[type];
            activeControl = 'amanData';
        }
        activeMode = type;
        try {
            //navigate to supertopic
            chrome.tabs.get(activeTab, function (tab) {
                if (tab.url == url) {
                    sendingData(type, resolve);
                } else {
                    try {
                        chrome.tabs.update(activeTab, { url: url }, function () {
                            chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                                if (activeTab && tabId === activeTab && changeInfo.status == 'complete' && activeMode == type) {
                                    console.log('sending ' + type);
                                    chrome.tabs.onUpdated.removeListener(listener);
                                    sendingData(type, resolve);
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
    //console.log(activeInput['spCheckIn'] + ' ' + activeInput['amanComment'] + ' ' + activeInput['reading'] +' ' +  activeInput['searching'] + ' ' +  activeInput['spZnlInput'] + ' ' +  activeInput['mpZnlInput']);
    var result = { isSuccess: false, msg: '' };
    if (activeInput['zpzControl'] && (activeInput['weiboUrl'] == null || !activeInput['weiboUrl'] || !activeInput['weiboUrl'].includes('weibo.com'))) {
        result.msg = '请输入需转评赞微博的页面链接。';
    } else {
        if (activeInput['weiboDataControl']) {
            if (activeInput['spCheckIn']) {
                result = await startSendingData('spCheckIn');
            } else if (activeInput['reading']) {
                result = await startSendingData('reading');
            } else if (activeInput['amanComment']) {
                result = await startSendingData('amanComment');
            } else if (activeInput['spZnlInput'] > 0) {
                result = await startSendingData('spZnl');
            } else if (activeInput['mpZnlInput'] > 0) {
                result = await startSendingData('mpZnl');
            }
        } else if (activeInput['zpzControl']) {
            result = await startSendingZpz();
        } else if (activeInput['amanControl']) {
            if (activeInput['searching']) {
                result = await startSendingData('searching');
            } else if (activeInput['bdComment']) {
                result = await startSendingData('bdComment');
            } else if (activeInput['bdInput'] > 0) {
                result = await startSendingData('bd');
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