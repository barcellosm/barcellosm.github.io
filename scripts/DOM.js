var setDOMvalue = (id, type, value) => {
    
    var getElement = document.getElementById(id);
    
    if (type === 'src') {
        
        getElement.src = value;
        
    } if (type === 'data') {
        
        getElement.data = value;
        
    } else if (type === 'display') {
        
        getElement.style.display = value;
        
    } else if (type === 'class') {
        
        getElement.className = value;
        
    } else if (type === 'touch') {
        
        getElement.setAttribute("ontouchstart", value);
        
    } else if (type === 'click') {
        
        getElement.setAttribute("onclick", value);
        
    } else if (type === 'link') {
        
        getElement.href = value;
        
    };
    
};

var DOMme = {
    
    linkCircle: value => link('image_button_circle', value),
    linkName: value => link('image_button_name', value),
    
    showCircle: () => setDOMvalue('image_button_circle', 'display', 'inline'),
    showName: () => setDOMvalue('image_button_name', 'display', 'inline'),
    
    hideCircle: () => setDOMvalue('image_button_circle', 'display', 'none'),
    hideName: () => setDOMvalue('image_button_name', 'display', 'none'),
    
    
    moveInCircle: direction => setDOMvalue('image_button_circle', 'class', 'button ' + positionLogo + ' move_in_' + direction),
    moveInName: direction => setDOMvalue('image_button_name', 'class', 'button ' + positionLogo + ' move_in_' + direction),
    
    moveOutCircle: direction => setDOMvalue('image_button_circle', 'class', 'button ' + positionLogo + ' move_out_' + direction),
    moveOutName: direction => setDOMvalue('image_button_name', 'class', 'button ' + positionLogo + ' move_out_' + direction),
    
    moveUpAndDownCircle: id => setDOMvalue('image_button_circle', 'class', 'button ' + positionLogo + ' move_up_and_down_circle' + id),
    moveUpAndDownName: id => setDOMvalue('image_button_name', 'class', 'button ' + positionLogo + ' move_up_and_down_name' + id),
    
    resetCircle: () => setDOMvalue('image_button_circle', 'class', 'button ' + positionLogo),
    resetName: () => setDOMvalue('image_button_name', 'class', 'button ' + positionLogo),
    
    
};

var DOMjob = {
    
    linkGalleryX: (id, value) => link('image_button_job_gallery_' + id, value),
    
    showJob: () => setDOMvalue('job', 'display', 'inline'),
    showJobX: id => setDOMvalue(id, 'display', 'inline'),
    showIntroX: id => setDOMvalue(id + '_intro', 'display', 'inline'),
    showGalleryXcontainer: id => setDOMvalue(id + '_gallery', 'display', 'inline'),
    showGalleryX: (idA, idB) => setDOMvalue('image_job_gallery_' + idA + '_' + idB, 'display', 'inline'),
    showVideoX: id => setDOMvalue('video_' + id, 'display', 'inline'),
    
    hideJob: () => setDOMvalue('job', 'display', 'none'),
    hideJobX: id => setDOMvalue(id, 'display', 'none'),
    hideIntroX: id => setDOMvalue(id + '_intro', 'display', 'none'),
    hideGalleryXcontainer: id => setDOMvalue(id + '_gallery', 'display', 'none'),
    hideGalleryX: (idA, idB) => setDOMvalue('image_job_gallery_' + idA + '_' + idB, 'display', 'none'),
    hideVideoX: id => setDOMvalue('video_' + id, 'display', 'none'),
    
    
    moveInJobX: (id, direction) => setDOMvalue(id, 'class', 'move_in_' + direction),
    moveInIntroX: (id, direction) => { setDOMvalue('image_job_description_' + id, 'class', 'job_description move_in_job_description_' + direction); setDOMvalue('image_button_job_gallery_' + id, 'class', 'button button_job_gallery move_in_button_job_gallery_' + direction); },
    moveInGalleryX: (idA, idB, direction) => setDOMvalue('image_job_gallery_' + idA + '_' + idB, 'class', 'job_gallery move_in_' + direction),
    moveInVideoX: (id, direction) => setDOMvalue('video_' + id, 'class', 'video move_in_' + direction),
    
    moveOutJobX: (id, direction) => setDOMvalue(id, 'class', 'move_out_' + direction),
    moveOutIntroX: (id, direction) => { setDOMvalue('image_job_description_' + id, 'class', 'job_description move_out_job_description_' + direction); setDOMvalue('image_button_job_gallery_' + id, 'class', 'button button_job_gallery move_out_button_job_gallery_' + direction); },
    moveOutGalleryX: (idA, idB, direction) => setDOMvalue('image_job_gallery_' + idA + '_' + idB, 'class', 'job_gallery move_out_' + direction),
    moveOutVideoX: (id, direction) => setDOMvalue('video_' + id, 'class', 'video move_out_' + direction),
    
    resetJobX: id => setDOMvalue(id, 'class', ''),
    resetIntroX: id => { setDOMvalue('image_job_description_' + id, 'class', 'job_description'); setDOMvalue('image_button_job_gallery_' + id, 'class', 'button button_job_gallery'); },
    resetGalleryX: (idA, idB) => setDOMvalue('image_job_gallery_' + idA + '_' + idB, 'class', 'job_gallery'),
    resetVideoX: id => setDOMvalue('video_' + id, 'class', 'video'),
    
    cleanJob: () => { DOMjob.hideJobX(1); DOMjob.hideJobX(2); DOMjob.hideJobX(3); DOMjob.hideGalleryXcontainer(1); DOMjob.hideGalleryXcontainer(2); DOMjob.hideGalleryXcontainer(3); }
    
};

var DOMgamification = {
    
    setLock: id => { setDOMvalue('image_button_lock', 'src', 'resources/images/' + id + '.png'); setDOMvalue('image_button_lock', 'class', 'button button_' + id); },
    setAmount: id => setDOMvalue('image_lock_and_key_amount', 'data', 'resources/images/lock_and_key_amount_' + id + '.svg'),
    
    linkLock: value => link('image_button_lock', value),
    linkKey: value => link('image_button_unlock_key', value),
    
    showLock: () => setDOMvalue('image_button_lock', 'display', 'inline'),
    showKey: () => setDOMvalue('image_button_unlock_key', 'display', 'inline'),
    showAmount: () => setDOMvalue('image_lock_and_key_amount', 'display', 'inline'),
    
    hideLock: () => setDOMvalue('image_button_lock', 'display', 'none'),
    hideKey: () => setDOMvalue('image_button_unlock_key', 'display', 'none'),
    hideAmount: () => setDOMvalue('image_lock_and_key_amount', 'display', 'none'),
    
    
    moveInLock: direction => setDOMvalue('image_button_lock', 'class', 'button_' + srcLock + ' move_in_lock_' + direction),
    moveInKey: direction => setDOMvalue('image_button_unlock_key', 'class', 'button_unlock_key move_in_lock_' + direction),
    moveInAmount: direction => setDOMvalue('image_lock_and_key_amount', 'class', 'move_in_amount_' + direction),
    
    moveOutLock: direction => setDOMvalue('image_button_lock', 'class', 'button_' + srcLock + ' move_out_lock_' + direction),
    moveOutKey: direction => setDOMvalue('image_button_unlock_key', 'class', 'button_unlock_key move_out_lock_' + direction),
    moveOutAmount: direction => setDOMvalue('image_lock_and_key_amount', 'class', 'move_out_amount_' + direction),
    
    moveLocked: () => setDOMvalue('image_button_lock', 'class', 'button_' + srcLock + ' move_locked'),
    
    resetLock: () => setDOMvalue('image_button_lock', 'class', 'button button_' + srcLock),
    resetKey: () => setDOMvalue('image_button_unlock_key', 'class', 'button button_unlock_key'),
    resetAmount: () => setDOMvalue('image_lock_and_key_amount', 'class', '')
    
};

var DOMnavigation = {
    
    linkX: (id, value) => link('image_button_navigation_' + id, value), // id = 'left' || 'right' || 'close'
    linkA: (id, value) => setDOMvalue('link_' + id, 'link', value),
    
    showX: id => setDOMvalue('image_button_navigation_' + id, 'display', 'inline'), // id = 'left' || 'right' || 'close'
    showXClicked: id => setDOMvalue('image_button_navigation_' + id + '_clicked', 'display', 'inline'), // id = 'left' || 'right' || 'close'
    
    hideX: id => setDOMvalue('image_button_navigation_' + id, 'display', 'none'), // id = 'left' || 'right' || 'close'
    hideXClicked: id => setDOMvalue('image_button_navigation_' + id + '_clicked', 'display', 'none'), // id = 'left' || 'right' || 'close'
    
    
    moveInSocial: direction => { setDOMvalue('image_button_navigation_twitter', 'class', 'button move_in_' + direction); setDOMvalue('image_button_navigation_linkedin', 'class', 'button move_in_' + direction); },
    
    moveOutSocial: direction => { setDOMvalue('image_button_navigation_twitter', 'class', 'button move_out_' + direction); setDOMvalue('image_button_navigation_linkedin', 'class', 'button move_out_' + direction); },
    
    resetSocial: direction => { setDOMvalue('image_button_navigation_twitter', 'class', 'button'); setDOMvalue('image_button_navigation_linkedin', 'class', 'button'); }
    
};