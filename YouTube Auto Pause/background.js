chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const activeTab = tabs[0];
    if (activeTab && activeTab.url.includes("youtube.com/watch")) {
        chrome.scripting.executeScript({
            target: {tabId: activeTab.id},
            function: playVideo
        });
    } else {
        const youtubeTabs = await chrome.tabs.query({url: "*://www.youtube.com/watch*"});
        youtubeTabs.forEach(tab => {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                function: pauseVideo
            });
        });
    }
});

function playVideo() {
    const video = document.querySelector("video");
    if (video && video.paused) {
        video.play();
    }
}

function pauseVideo() {
    const video = document.querySelector("video");
    if (video && !video.paused) {
        video.pause();
    }
}
