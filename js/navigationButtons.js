/* NAVIGATION BUTTONS */
const overview = document.querySelector('.overview');
const home = document.querySelector('.home');
const back = document.querySelector('.back');

home.addEventListener('click', () => {
    pageEffect.homePage();
    closeLongPressAppDesktopPopup();
    closeLongPressAppPopup();
    if(notificationPanelState === 'opened' || appsDrawerOpen === true){
        hideNotificationPanel();
        hideAppsDrawer();
    }
});

back.addEventListener('click', () => {
    closeLongPressAppDesktopPopup();
    closeLongPressAppPopup();
    if(notificationPanelState === 'opened'){
        hideNotificationPanel();
    }else if(appsDrawerOpen === true){
        hideAppsDrawer();
    }
});