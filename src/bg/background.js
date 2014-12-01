// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

var version = "1.0";

//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener( onMessage );
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.webRequest.onBeforeSendHeaders.addListener( onBeforeSendHeaders );
chrome.webRequest.onHeadersReceived.addListener( onHeadersReceived );
chrome.browserAction.onClicked.addListener( browserActionOnClick );

function onMessage (request, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);
  sendResponse();
}

function tabsOnUpdated() {
  checkForValidUrl();
}

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  console.log( 'checkForValidUrl' );
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('discodonniepresents.com') > -1) {
    chrome.pageAction.show(tabId);
  }
}

function onBeforeSendHeaders(details) {
  //chrome.pageAction.show(sender.tab.id);
  //sendResponse();
  console.log( 'onBeforeSendHeaders', details );
}

function onHeadersReceived(details) {
  //chrome.pageAction.show(sender.tab.id);
  //sendResponse();
  console.log( 'onHeadersReceived', details );
}

function browserActionOnClick (tab) {
  chrome.debugger.attach({
    tabId:tab.id
  }, version, onAttach.bind(null, tab.id));
}

/**
 * Live Headers
 *
 * @param tabId
 */
function onAttach(tabId) {

  if (chrome.runtime.lastError) {
    alert(chrome.runtime.lastError.message);
    return;
  }

  chrome.windows.create({
    url: "headers.html?" + tabId,
    type: "popup",
    width: 800,
    height: 600
  });

}
