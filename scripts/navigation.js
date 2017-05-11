var audios = {
    
    set: () => {
        
        audios.background.src = 'resources/audios/background.mp3';
        audios.background.volume = 0.5;
        audios.background.loop = true;
        
        audios.button.src = 'resources/audios/button.mp3';
        audios.button.volume = 0.8;
        
        audios.item.src = 'resources/audios/item.mp3';
        audios.item.volume = 1;
        
        audios.locked.src = 'resources/audios/locked.mp3';
        audios.locked.volume = 1;
        
        audios.unlock.src = 'resources/audios/unlock.mp3';
        audios.unlock.volume = 1;
        
    },
    
    background: new Audio(),
    button: new Audio(),
    item: new Audio(),
    locked: new Audio(),
    unlock: new Audio()
    
};

var click = {
    
    basic: direction => {
        
        audios.button.play();
        
        if ((direction === 'from_center_in') || (direction === 'from_center_out')) {} else {
            
            check.button(direction, DOMnavigation.showXClicked);
            setTimeout(() => { check.button(direction, DOMnavigation.hideXClicked); }, timeClick);
            
        };
        
    }
    
};

var link = (id, value) => {
    
    if (isMobile === true) {
        
        setDOMvalue(id, 'touch', value);
        
    } else {
        
        setDOMvalue(id, 'click', value);
        
    };
    
};

var check = {
    
    equality: (id, valueA, valueB, reactionA, reactionB, reactionC) => {

        if (id === valueA) {

            if (reactionA != null) { reactionA() };

        } else if (id === valueB) {

            if (reactionB != null) { reactionB() };

        } else {
          
            if (reactionC != null) { reactionC() };
            
        };

    },
    
    unequality: (id, valueA, valueB, reactionA, reactionB, reactionC) => {

        if (id < valueA) {

            if (reactionA != null) { reactionA() };

        } else if (id > valueB) {

            if (reactionB != null) { reactionB() };

        } else {
          
            if (reactionC != null) { reactionC() };
            
        };

    },
    
    audio: (isNull, isNotNull) => check.equality(audios.background.currentTime, null, null, isNull, null, isNotNull),
    button: (direction, callback) => check.equality(direction.slice(5, 9), 'left', 'righ', () => { callback('left') }, () => { callback('right') }, () => { check.equality(direction.slice(5, 9), 'abov', 'belo', () => { callback('up') }, () => { callback('down') }, () => { callback('close') }) }),
    lock: (index, locked, unlocked, reactionC) => check.equality(lockId[index], 'locked', 'unlocked', locked, unlocked, reactionC),
    key: (missing, found, reactionC) => check.equality(keyId[(pageId - 10)], 'missing', 'found', missing, found, reactionC),
    keyAmount: (doNotHave, have) => check.unequality(keys, 1, 0, doNotHave, have, null),
    move: (typeMove, moveIn, moveOut, reactionC) => check.equality(typeMove, 'move in', 'move out', moveIn, moveOut, reactionC),    
    picId: (key, reactionC, initial, final, reactionC2) => check.unequality(picId, (lastPicId + 1), lastPicId, () => { check.equality(picId, 0, lastPicId, initial, final, reactionC2) }, key, reactionC),
    unlockedLocks: (anyLockbutFinalLock, allUnlocked, finalLock) => check.unequality(unlockedLocks, (totalLocks - 1), (totalLocks - 1), anyLockbutFinalLock, allUnlocked, finalLock)
    
};

var me = {
    
    set: { // SIDE-EFFECTS WARNING: external variable's value manipulation
    
        positionLogo: value => { positionLogo = value /* ! */ },    
        
    },
    
    animateMe: id => {
        
        audios.button.play();
        /* change music */
        DOMme.linkCircle('');
        DOMme.linkName('');
        DOMme.moveUpAndDownCircle(id);
        DOMme.moveUpAndDownName(id);
        setTimeout(() => { if (id === '') { DOMme.resetCircle(); DOMme.resetName(); DOMme.linkCircle('me.animateMe("")'); DOMme.linkName('me.animateMe("")'); } else if (id === '_final_forever') { DOMme.linkCircle('me.animateMe("_final_forever")'); DOMme.linkName('me.animateMe("_final_forever")'); }; }, timeAnimateMe);
        
    },
    
    isMe: (typeMove, direction) => {
        
        check.unlockedLocks(() => { /* any lock but final lock */

            me.isLogo(typeMove, direction, audios.background.volume = 0.5, () => { audios.background.volume = 0.1 });

        }, () => { /* all locks are unlocked */
                      
            me.set.positionLogo('final_logo');
            check.move(typeMove, () => { 
        
                setTimeout(() => { 
                
                    DOMnavigation.showX('twitter');
                    DOMnavigation.showX('linkedin');
                    DOMnavigation.moveInSocial('from_center_out');
                    setTimeout(() => { DOMnavigation.resetSocial() }, timeMoveIn);

                    if (isMobile === true) {

                        DOMnavigation.linkX('twitter', 'twitter://user?screen_name=barcellosm');

                    } else {

                        DOMnavigation.linkA('twitter', 'https://twitter.com/barcellosm');

                    };

                    DOMnavigation.linkA('linkedin', 'https://www.linkedin.com/in/matheus-barcellos-da-silveira-b8994251/');
                
                }, timeMoveIn);

            }, () => { 

                DOMnavigation.moveOutSocial('from_center_in');
                setTimeout(() => { DOMnavigation.hideX('twitter'); DOMnavigation.hideX('linkedin'); DOMnavigation.resetSocial() }, timeMoveOut);

            }, null);
            me.isLogo(typeMove, direction, audios.background.volume = 1.0, () => { audios.background.volume = 0.5 });
        
        }, () => { /* final lock */

            gamification.isGamification('move in', direction);
            DOMnavigation.showX('left');
            DOMnavigation.linkX('left', 'navigation.fromX("from_left", "lock")');
            DOMnavigation.linkX('right', 'navigation.fromX("from_right", "lock")');

        });
        
    },
    
    isLogo: (typeMove, direction, isNull, isNotNull) => {
        
        DOMme.showCircle();
        DOMme.showName();
                
        check.move(typeMove, () => { 
        
            check.audio(isNull, null);
            DOMme.moveInCircle(direction);
            DOMme.moveInName(direction);
            setTimeout(() => { DOMme.resetCircle(); DOMme.resetName(); check.unlockedLocks(null, () => { me.animateMe('_final_forever') }, null); }, timeMoveIn);
        
        }, () => { 
        
            check.audio(null, isNotNull);
            DOMme.moveOutCircle(direction);
            DOMme.moveOutName(direction);
            setTimeout(() => { DOMme.hideCircle(); DOMme.hideName(); DOMme.resetCircle(); DOMme.resetName(); }, timeMoveOut);
        
        }, null);
        
    }
    
};

var job = {
    
    isJob: (type, typeMove, direction) => {
        
        if ((type === 'intro') || (type === 'video')) {
            
            check.move(typeMove, () => {

                DOMjob.showJob();
                DOMjob.showJobX(pageId.toString());
                DOMjob.moveInJobX(pageId.toString(), direction);
                setTimeout(() => { DOMjob.resetJobX(pageId.toString()) }, timeMoveIn);

            }, () => { 

                DOMjob.moveOutJobX(pageId.toString(), direction);

                if (direction === 'from_right') { 

                    if (pageId === lastPageId) {

                        setTimeout(() => { DOMjob.hideJobX((lastPageId).toString()); DOMjob.resetJobX((lastPageId).toString()); }, timeMoveOut);

                    } else {

                        setTimeout(() => { DOMjob.hideJobX((pageId - 1).toString()); DOMjob.resetJobX((pageId - 1).toString()); }, timeMoveOut);

                    };

                } else if (direction === 'from_left') { 

                    setTimeout(() => { DOMjob.hideJobX((pageId + 1).toString()); DOMjob.resetJobX((pageId + 1).toString()); }, timeMoveOut);

                };

            }, null);
            
            if (type === 'intro') {
                
                job.isIntro(typeMove, direction);
            
            } else if (type === 'video') {
                
                job.isVideo(typeMove, direction);
                
            };
            
        } else if (type === 'gallery') {
            
            job.isGallery(typeMove, direction);
            
        };
        
    },
    
    isIntro: (typeMove, direction) => {
        
        check.move(typeMove, () => { 
        
            DOMjob.showIntroX(pageId.toString());
            DOMjob.moveInIntroX(pageId.toString(), direction);
            setTimeout(() => { DOMjob.resetIntroX(pageId.toString()) }, timeMoveIn);
            DOMjob.linkGalleryX(pageId.toString(), 'navigation.fromX("from_center_in", "intro")');
        
        }, () => { 

            DOMjob.moveOutIntroX(pageId.toString(), direction);
            
            if (direction === 'from_right') {
                
                if (pageId === lastPageId) {

                    setTimeout(() => { DOMjob.hideIntroX((lastPageId).toString()); DOMjob.resetIntroX((lastPageId).toString()); }, timeMoveOut);

                } else {

                    setTimeout(() => { DOMjob.hideIntroX((pageId - 1).toString()); DOMjob.resetIntroX((pageId - 1).toString()); }, timeMoveOut);

                };
                
            } else if (direction === 'from_left') { 
                
                setTimeout(() => { DOMjob.hideIntroX((pageId + 1).toString()); DOMjob.resetIntroX((pageId + 1).toString()); }, timeMoveOut);
                
            };

        }, null);
        
    },
    
    isGallery: (typeMove, direction) => {
        
        check.move(typeMove, () => {
            
            DOMjob.hideIntroX((pageId - 10).toString());
            DOMjob.showGalleryXcontainer((pageId - 10).toString());
            DOMjob.showGalleryX((pageId - 10).toString(), picId.toString());
            DOMjob.moveInGalleryX((pageId - 10).toString(), picId.toString(), direction);
            setTimeout(() => { DOMjob.resetGalleryX((pageId - 10).toString(), picId.toString()); }, timeMoveIn);
            
        }, () => { 

            check.picId(() => { // key
                
                DOMjob.moveOutGalleryX((pageId - 10).toString(), (picId - 1).toString(), direction);
                
                if (direction === 'from_left_pic') {
                    
                    setTimeout(() => { DOMjob.hideGalleryX(() => { if (pageId >= 10) { (pageId - 10).toString() } else { pageId.toString() } }, (picId + 1).toString()); DOMjob.resetGalleryX(() => { if (pageId >= 10) { (pageId - 10).toString() } else { pageId.toString() } }, (picId + 1).toString()); }, timeMoveOut);
                                        
                } else if (direction === 'from_right_pic') {
                    
                    setTimeout(() => { DOMjob.hideGalleryX(() => { if (pageId >= 10) { (pageId - 10).toString() } else { pageId.toString() } }, (picId - 1).toString()); DOMjob.resetGalleryX(() => { if (pageId >= 10) { (pageId - 10).toString() } else { pageId.toString() } }, (picId - 1).toString()); }, timeMoveOut);
                                        
                } else if (direction === 'from_center_out') {
                    
                    setTimeout(() => { DOMjob.hideGalleryX(() => { if (pageId >= 10) { (pageId - 10).toString() } else { pageId.toString() } }, lastPicId.toString()); DOMjob.resetGalleryX(() => { if (pageId >= 10) { (pageId - 10).toString() } else { pageId.toString() } }, lastPicId.toString()); }, timeMoveOut);
                                        
                };

            }, null, () => { // initial
                
                DOMjob.moveOutGalleryX((pageId - 10).toString(), picId.toString(), direction);
                setTimeout(() => { DOMjob.hideGalleryX((pageId - 10).toString(), (picId - 1).toString()); DOMjob.resetGalleryX((pageId - 10).toString(), (picId - 1).toString()); }, timeMoveOut);
            
            }, () => { // final
                
                DOMjob.moveOutGalleryX((pageId - 10).toString(), picId.toString(), direction);
                
                if (direction === 'from_center_out') {
                    
                    setTimeout(() => { DOMjob.hideGalleryX(pageId.toString(), lastPicId.toString()); DOMjob.resetGalleryX(pageId.toString(), lastPicId.toString()); }, timeMoveOut);
                                        
                } else {
                    
                    setTimeout(() => { DOMjob.hideGalleryX((pageId - 10).toString(), lastPicId.toString()); DOMjob.resetGalleryX((pageId - 10).toString(), lastPicId.toString()); }, timeMoveOut);
                    
                };

            }, () => { // any but initial or final
                
                DOMjob.moveOutGalleryX((pageId - 10).toString(), picId.toString(), direction);
                
                if (direction === 'from_left_pic') {
                    
                    setTimeout(() => { DOMjob.hideGalleryX((pageId - 10).toString(), (picId + 1).toString()); DOMjob.resetGalleryX((pageId - 10).toString(), (picId + 1).toString()); }, timeMoveOut);
                                        
                } else if (direction === 'from_right_pic') {
                    
                    setTimeout(() => { DOMjob.hideGalleryX((pageId - 10).toString(), (picId - 1).toString()); DOMjob.resetGalleryX((pageId - 10).toString(), (picId - 1).toString()); }, timeMoveOut);
                                        
                };
            
            }); 

        }, null);
        
    },
    
    isVideo: (typeMove, direction) => {
        
        check.move(typeMove, () => { 
        
            audios.background.volume = 0.0;
            DOMjob.showVideoX(videoId.toString());
            DOMjob.moveInVideoX(videoId.toString(), direction);
            setTimeout(() => { DOMjob.resetVideoX(videoId.toString()) }, timeMoveIn);
        
        }, () => { 

            DOMjob.moveOutVideoX(videoId.toString(), direction);
            
            if (direction === 'from_above') {
                
                if (videoId === lastVideoId) {

                    setTimeout(() => { DOMjob.hideVideoX((lastVideoId).toString()); DOMjob.resetVideoX((lastVideoId).toString()); }, timeMoveOut);

                } else {

                    setTimeout(() => { DOMjob.hideVideoX((videoId - 1).toString()); DOMjob.resetVideoX((videoId - 1).toString()); }, timeMoveOut);

                };
                
            } else if (direction === 'from_below') { 
                
                setTimeout(() => { DOMjob.hideVideoX((videoId + 1).toString()); DOMjob.resetVideoX((videoId + 1).toString()); }, timeMoveOut);
                
            };

        }, null);
        
    }
    
};

var gamification = {
    
    set: { // SIDE-EFFECTS WARNING: external variable's value manipulation
    
        unlock: () => { lockId[pageId] = 'unlocked'; /* ! */ unlockedLocks++; /* ! */ keys--; /* ! */ },
        key: () => { keyId[(pageId - 10)] = 'found'; /* ! */ keys++; /* ! */ foundKeys++; /* ! */ },
        src: id => srcLock = id  /* ! */
    
    },
    
    use: {
        
        key: () => {
            
            check.keyAmount(() => { 
                
                audios.locked.play();
                DOMgamification.moveLocked();
                setTimeout(() => { DOMgamification.resetLock() }, timeMoveLocked);
            
            }, () => { 
            
                audios.unlock.play();
                gamification.set.unlock(); // SIDE-EFFECTS WARNING
                gamification.isLocked('move out', 'from_center_in');
                navigation.toX('from_center_out');
            
            });

        }
        
    },
    
    get: {
        
        key: direction => {
            
            audios.item.play();
            gamification.set.key();
            DOMgamification.setAmount('key_' + foundKeys.toString());
            DOMgamification.moveOutKey('from_center_in');
            DOMgamification.moveOutAmount('from_center_in');
            setTimeout(() => { DOMgamification.hideKey(); DOMgamification.hideAmount(); DOMgamification.resetKey(); DOMgamification.resetAmount(); }, timeMoveOut);
            navigation.changePage(direction);
            
        }
        
    },
    
    isGamification: (typeMove, direction) => {
    
        if (pageId >= 10) { check.lock((pageId - 10), () => { gamification.isLocked(typeMove, direction) }, () => { check.key(() => { gamification.isKey(typeMove, direction) }, null, null) }, null); } else { check.lock(pageId, () => { gamification.isLocked(typeMove, direction) }, () => { check.key(() => { gamification.isKey(typeMove, direction) }, null, null) }, null); }
            
    },
    
    isLocked: (typeMove, direction) => {
        
        DOMgamification.showLock();
        DOMgamification.showAmount();
        DOMgamification.setAmount('lock_' + unlockedLocks.toString());
        DOMgamification.linkLock('gamification.use.key()');
        
        check.keyAmount(() => { gamification.set.src('lock') }, () => { gamification.set.src('lock_and_key') });
        
        DOMgamification.setLock(srcLock);
        
        check.move(typeMove, () => { 

            DOMgamification.moveInLock(direction);
            DOMgamification.moveInAmount(direction);
            setTimeout(() => { DOMgamification.resetLock(); DOMgamification.resetAmount(); }, timeMoveIn);

        }, () => { 

            DOMgamification.moveOutLock(direction);
            DOMgamification.moveOutAmount(direction);
            setTimeout(() => { DOMgamification.hideLock(); DOMgamification.hideAmount(); DOMgamification.resetLock(); DOMgamification.resetAmount(); }, timeMoveOut);

        }, null);
        
    },
    
    isKey: (typeMove, direction) => {
        
        DOMgamification.showKey();
        DOMgamification.showAmount();
        DOMgamification.setAmount('key_' + foundKeys.toString());
        DOMgamification.linkKey('gamification.get.key("from_left_pic")');
        
        check.move(typeMove, () => { 

            DOMgamification.moveInKey(direction);
            DOMgamification.moveInAmount(direction);
            setTimeout(() => { DOMgamification.resetKey(); DOMgamification.resetAmount(); }, timeMoveIn);

        }, () => { 

            DOMgamification.moveOutKey(direction);
            DOMgamification.moveOutAmount(direction);
            setTimeout(() => { DOMgamification.hideKey(); DOMgamification.resetKey(); DOMgamification.hideAmount(); DOMgamification.resetAmount(); }, timeMoveOut);

        }, null);
        
    }
    
};

var navigation = {
    
    set: { // SIDE-EFFECTS WARNING: external variable's value manipulation
    
        pageId: value => { pageId = value /* ! */ },
        picId: value => { picId = value /* ! */ },
        videoId: value => { videoId = value /* ! */ },
        discoveredVideos: value => { discoveredVideos = value /* ! */ }
    
    },
    
    changePage: direction => {
        
        if (direction === 'from_left') {
            
            if (pageId === 0) {
                
                navigation.set.pageId(lastPageId); // SIDE-EFFECTS WARNING
                
            } else {
                
                navigation.set.pageId((pageId - 1)); // SIDE-EFFECTS WARNING
                
            };
            
        } else if (direction === 'from_right') {
          
            if (pageId === lastPageId) {
                
                navigation.set.pageId(0); // SIDE-EFFECTS WARNING
                
            } else {
                
                navigation.set.pageId((pageId + 1)); // SIDE-EFFECTS WARNING
                
            };
            
        } else if (direction === 'from_left_pic') {
            
            navigation.set.picId((picId - 1)); // SIDE-EFFECTS WARNING
            
        } else if (direction === 'from_right_pic') {
            
            navigation.set.picId((picId + 1)); // SIDE-EFFECTS WARNING
            
        } else if (direction === 'from_center_out') {
            
            navigation.set.pageId((pageId - 10)); // SIDE-EFFECTS WARNING
            navigation.set.picId(0); // SIDE-EFFECTS WARNING
            
        } else if (direction === 'from_center_in') {
            
            navigation.set.pageId((pageId + 10)); // SIDE-EFFECTS WARNING
            
        } else if (direction === 'from_above') {
          
            if (videoId === lastVideoId) {
                
                navigation.set.videoId(0); // SIDE-EFFECTS WARNING
                
            } else {
                
                navigation.set.videoId((videoId + 1)); // SIDE-EFFECTS WARNING
                
                if (discoveredVideos < totalVideos) {
                  
                    navigation.set.discoveredVideos(discoveredVideos + 1);
                    
                };
                
            };
            
        } else if (direction === 'from_below') {
          
            if (videoId === 0) {
                
                navigation.set.videoId(lastVideoId); // SIDE-EFFECTS WARNING
                
            } else {
                
                navigation.set.videoId((videoId - 1)); // SIDE-EFFECTS WARNING
                
            };
            
        };
        
        navigation.toX(direction);
        
    },
    
    fromX: (direction, typePage) => {
    
        click.basic(direction);
        
        if (typePage === 'me') {
            
            me.isMe('move out', direction);
            
        } else if (typePage === 'lock') {
            
            gamification.isGamification('move out', direction);
            
        } else if (typePage === 'job') {
            
            job.isJob('intro', 'move out', direction);
            
        } else if (typePage === 'intro') {
            
            job.isIntro('move out', direction);
            
        } else if (typePage === 'gallery') {
            
            job.isJob('gallery', 'move out', direction);
            
        } else if (typePage === 'video') {
            
            job.isJob('video', 'move out', direction);
            
        };
        
        navigation.changePage(direction);
    
    },
    
    toX: direction => {
                
        DOMnavigation.showX('left');
        DOMnavigation.showX('right');
        DOMnavigation.hideX('close');
        DOMnavigation.hideX('up');
        DOMnavigation.hideX('down');
        
        
        /* to Me */
        
        if (pageId === 0) {
            
            DOMnavigation.linkX('right', 'navigation.fromX("from_right", "me")');
            
            check.lock(pageId, () => { DOMnavigation.hideX('left') }, () => {
                
                DOMnavigation.linkX('left', 'navigation.fromX("from_left", "me")'); 
                DOMnavigation.showX('up');
                DOMnavigation.linkX('up', 'navigation.fromX("from_above", "me")'); 
                
                if (discoveredVideos === totalVideos) { 
                    
                    DOMnavigation.showX('down');
                    DOMnavigation.linkX('down', 'navigation.fromX("from_below", "me")');
                    
                };
            
            }, null);
            
            if (videoId === 0) {
                
                setTimeout(() => { me.isMe('move in', direction) }, (timeMoveOut / 2));
                
            } else if (videoId > 0) {
                
                setTimeout(() => { job.isJob('video', 'move in', direction) }, (timeMoveOut / 2));
                DOMnavigation.hideX('left');
                DOMnavigation.hideX('right');
                DOMnavigation.showX('down');
                DOMnavigation.linkX('down', 'navigation.fromX("from_below", "video")');
                DOMnavigation.linkX('up', 'navigation.fromX("from_above", "video")');
                                
            };
        
            
        /* to Gallery */
            
        } else if ((pageId >= 11) && (pageId <= (lastPageId + 10))) {
            
            DOMnavigation.linkX('left', 'navigation.fromX("from_left_pic", "gallery")');
            DOMnavigation.linkX('right', 'navigation.fromX("from_right_pic", "gallery")');
            
            check.picId(() => { /* beyond last pic - show key */
                
                setTimeout(() => { gamification.isGamification('move in', direction) }, (timeMoveOut / 2));
                DOMnavigation.linkX('left', 'navigation.fromX("from_left_pic", "lock")');
                DOMnavigation.hideX('right');
                DOMnavigation.showX('close');
                DOMnavigation.linkX('close', 'navigation.fromX("from_center_out", "lock")');

            }, null, () => { setTimeout(() => { job.isJob('gallery', 'move in', direction) }, (timeMoveOut / 2)); DOMnavigation.hideX('left') }, () => { /* last pic and already took key - show button to close */
                
                setTimeout(() => { job.isJob('gallery', 'move in', direction) }, (timeMoveOut / 2));
                
                check.key(null, () => { 

                    DOMnavigation.hideX('right');
                    DOMnavigation.showX('close');
                    DOMnavigation.linkX('close', 'navigation.fromX("from_center_out", "gallery")');

                }, null);

            }, () => { setTimeout(() => { job.isJob('gallery', 'move in', direction) }, (timeMoveOut / 2)) });
        
            
        /* to Job */
            
        } else {
            
            check.lock(pageId, () => { /* job locked - show lock */
            
                setTimeout(() => { gamification.isGamification('move in', direction) }, (timeMoveOut / 2));
                DOMnavigation.linkX('left', 'navigation.fromX("from_left", "lock")');
                
                if (pageId === lastPageId) {
                
                    DOMnavigation.hideX('right');
                    
                } else {
                    
                    DOMnavigation.linkX('right', 'navigation.fromX("from_right", "lock")');
                    
                };
            
            }, () => { /* job unlocked - show job */
            
                setTimeout(() => { job.isJob('intro', 'move in', direction) }, (timeMoveOut / 2));
                DOMnavigation.linkX('left', 'navigation.fromX("from_left", "job")');

                if ((pageId === lastPageId) && (unlockedLocks < (totalLocks - 1))) { /* game not finished - hide button to next page (initial page) */

                    DOMnavigation.hideX('right');

                } else { /* game finished - show button to next page (initial page) */

                    DOMnavigation.linkX('right', 'navigation.fromX("from_right", "job")');

                };
            
            }, null);
            
        };
        
    }
    
    
    
};