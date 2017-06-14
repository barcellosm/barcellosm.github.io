var landscape = false, portrait = false;

var timeClick = 200;
var timeAnimateMe = 800;
var timeMoveIn = 1000;
var timeMoveOut = 500;
var timeMoveLocked = 600;

var pageId = 0;
var lastPageId = 3;

var picId = 0;
var lastPicId = 2;

var videoId = 0;
var lastVideoId = 2;
var discoveredVideos = 0;
var totalVideos = 2;

var lockId = ['locked', 'locked', 'unlocked', 'locked'];
var unlockedLocks = 0;
var totalLocks = 3;
var srcLock = 'lock';

var keyId = ['missing', 'missing', 'missing', 'missing'];
var keys = 0;
var foundKeys = 0;

var positionLogo = 'standard_logo';

var audioBackground = 'off';

var isMobile;
var device = () => {
    
    userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/windows phone|android|iPhone|iPod|iPad/i.test(userAgent)) {

        isMobile = true;

    } else {
      
        isMobile = false;
        
    };
    
};

var portfolio = type => {
    
    setDOMvalue('portfolio_option', 'display', 'none');
    DOMnavigation.showX('left');
    DOMnavigation.showX('right');
    DOMnavigation.linkX('left', 'navigation.fromX("from_left", "me")');
    DOMnavigation.linkX('right', 'navigation.fromX("from_right", "me")');
    DOMjob.cleanJob();
    
    if (type === 'play') {
        
        me.isMe('move in', 'from_center_out');
        DOMme.linkCircle('me.animateMe("_forever", "on")');
        DOMme.linkName('me.animateMe("_forever", "on")');
        
    } else if (type === 'skip') {
        
        discoveredVideos = totalVideos;
        lockId = ['unlocked', 'unlocked', 'unlocked', 'unlocked'];
        unlockedLocks = totalLocks;
        keyId = ['found', 'found', 'found', 'found'];
        foundKeys = totalLocks;
        positionLogo = 'final_logo';
        DOMnavigation.showX('up');
        DOMnavigation.showX('down');
        DOMnavigation.linkX('up', 'navigation.fromX("from_above", "me")');
        DOMnavigation.linkX('down', 'navigation.fromX("from_below", "me")');
        me.isMe('move in', 'from_center_out');
                
    };
    
};

var init = () => {
    
    audios.set();
    device();
    link('image_button_portfolio_play', 'portfolio("play")');
    link('image_button_portfolio_skip', 'portfolio("skip")');
    
    window.requestAnimationFrame(loop);
    
};

var loop = () => {
    
    if ((window.innerWidth) < (window.innerHeight)) {
        
        landscape = false;
        
        if (portrait === false) {
            
            setDOMvalue('error_orientation', 'display', 'inline');
            portrait = true;
            
        };
        
    } else {
        
        portrait = false;
        
        if (landscape === false) {
            
            setDOMvalue('error_orientation', 'display', 'none');
            landscape = true;
            
        };
        
    };
        
    window.requestAnimationFrame(loop);

};