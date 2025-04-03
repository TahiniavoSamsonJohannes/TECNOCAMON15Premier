let brightness_width = parseFloat($(".brightness-level").css("height"));
let brightness_level = document.querySelector(".brightness-level");
let box = document.querySelector(".brightness-container-measure").getBoundingClientRect();
let isMouseDownOnBrightness = false;


/* SETTINGS BRIGTHNESS */
document.querySelector(".brightness-container-measure").addEventListener("mousedown", function(e){
    isMouseDownOnBrightness = true;
    brightnessLevel(e);
});
document.querySelector(".brightness-container-measure").addEventListener("mouseup", function(){
    isMouseDownOnBrightness = false;
    $("#brightness-icon").attr("src","icons/Raccourci_parametres/Luminosite.png");
});
document.querySelector(".brightness-container-measure").addEventListener("mouseleave", function(){
    isMouseDownOnBrightness = false;
    $("#brightness-icon").attr("src","icons/Raccourci_parametres/Luminosite.png");
});
document.querySelector(".brightness-container-measure").addEventListener("mousemove", function(e){
    brightnessLevel(e);
});

function brightnessLevel(event){
    if(isMouseDownOnBrightness){
        brightness_width = event.clientX - box.left;
        brightness_level.style.width = brightness_width+"px";
        console.log(brightness_width);
    
        $("#brightness-icon").attr("src","icons/Raccourci_parametres/Luminosite_active.png");
    }
}

/* DOWN ARROW FOR MORE PARAMATERS */
let moreQuickSettings = "closed";
let settingsBtnPage1;
let settingsBtnPage2 = document.querySelectorAll(".settings-btn-page2 > .grid-circle");
settingsBtnPage2.forEach(btn => {btn.style.position = "relative";});

let is5Columns = true;
setSettingsBtnPosition();

let dataBtn = document.querySelector("#data");
let dataBtnIndex = [...settingsBtnPage1].indexOf(dataBtn);

$(".more-settings-btn").click(function(){
    if(moreQuickSettings == "opened"){
        /* CLOSE MORE SETTINGS */
        $("#down-arrow").fadeIn(200);
        $(".quick-settings").css({height:"88px"});
        $(".filter-notif-settings img:first-child").fadeOut(250);
        $(".settings-btn-page2").fadeOut(500);
        
        $(".previousSettings").fadeOut(250);
        $(".nextSettings").fadeOut(250);
        $(".settings-btn-name").fadeOut(250);
        $(".settings-pagination").fadeOut(200);
        previousSettings();

        setSettingsBtnPosition();
        $(".settings-btn-page2").fadeOut(250);
        for(let i = 0; i < [...settingsBtnPage1].length; i++) {
            if(i > dataBtnIndex) {
                [...settingsBtnPage1][i].style.display = 'none';
                setTimeout(() => {
                    [...settingsBtnPage1][i].style.display = 'flex';
                },1000);
            }
        }
        
        moreQuickSettings = "closed";
    }else if(moreQuickSettings == "closed"){
        /* OPEN MORE SETTINGS */
        $("#down-arrow").fadeOut(200);
        $(".quick-settings").css({height:"260px"});
        $(".filter-notif-settings img:first-child").fadeIn(250);
        $(".settings-btn-page2").fadeIn(500);
        
        $(".previousSettings").fadeIn(250);
        $(".nextSettings").fadeIn(250);
        $(".settings-btn-name").fadeIn(500);
        $(".settings-pagination").css({display:"flex"});

        setSettingsBtnPosition();
        $(".settings-btn-page2").fadeIn(250);
        for(let i = 0; i < [...settingsBtnPage1].length; i++) {
            if(i > dataBtnIndex) {
                [...settingsBtnPage1][i].style.display = 'flex';
            }
        }
        
        moreQuickSettings = "opened";
    }
});

function setSettingsBtnPosition(){
    settingsBtnPage1 = document.querySelectorAll(".settings-btn-page1 > .grid-circle");
    if(is5Columns){
        for(let i = 0; i < settingsBtnPage1.length; i++) {
            settingsBtnPage1[i].style.transform = `translate(${(i%5)*36}px,${Math.floor(i/5)*64}px)`;
        }
    }else{
        for(let i = 0; i < settingsBtnPage1.length; i++) {
            settingsBtnPage1[i].style.transform = `translate(${(i%4)*48}px,${Math.floor(i/4)*64}px)`;
        }
    }
    is5Columns = !is5Columns;
}

/* NOTIF PARAMATERS PAGINATION */
$(".settings-pagination").click(function(){
    $(".settings-pagination").fadeOut(200);
    $("#down-arrow").fadeIn(200);
});

/* NOTIF DROPDOWN STATE */
let notificationPanelState = "closed";
/* FADE OUT THE CONTAINER AT THE LOAD */
$(".notification-panel-container").fadeOut(100);

function showNotificationPanel(){
    $(".notification-panel-container").fadeIn(100);
    $(".notification-panel-container").addClass('blur');
    $(".notification-panel").css({transform:"translateY(0%)"});
    $('.apps-drawer-toggle-button').css('z-index', '16');
    closeLongPressAppDesktopPopup();
    closeLongPressAppPopup();
    notificationPanelState = "opened";
}
function hideNotificationPanel(){
    if(moreQuickSettings == "opened"){
        $(".quick-settings").css({height:"88px"});
        $(".filter-notif-settings img:first-child").fadeOut(250);
        $(".settings-btn-name").fadeOut(250);

        $("#down-arrow").fadeIn(200);
        $(".settings-pagination").fadeOut(200);
        $(".settings-btn-page2").fadeOut(500);
        
        setSettingsBtnPosition();
        previousSettings();
        
        moreQuickSettings = "closed";
    }else{
        $(".notification-panel-container").fadeOut(500);
        $(".notification-panel-container").removeClass('blur');
        $(".notification-panel").css({transform:"translateY(-110%)"});
        $('.apps-drawer-toggle-button').css('z-index', '17');
        notificationPanelState = "closed";
    }
}

$(".notification-panel-toggle-button").click(function(){
    if(notificationPanelState === "closed"){
        /* SHOW THE NOTIF DROPDOWN */
        showNotificationPanel();
    }else if(notificationPanelState === "opened"){
        /* HIDE THE NOTIF DROPDOWN */
        hideNotificationPanel();
    }

});

function previousSettings(){
    $(".settings-btn-page1").css({transform: "translateX(0%)"});
    $(".settings-btn-page2").css({transform: "translateX(115%)"});
    $(".settings-pagination .settings-page1").css({background: "rgb(0, 94, 255)"});
    $(".settings-pagination .settings-page2").css({background: "rgba(0, 60, 255, 0.25)"});
}
function nextSettings(){
    $(".settings-btn-page1").css({transform: "translateX(-115%)"});
    $(".settings-btn-page2").css({transform: "translateX(0%)"});
    $(".settings-pagination .settings-page2").css({background: "rgb(0, 94, 255)"});
    $(".settings-pagination .settings-page1").css({background: "rgba(0, 60, 255, 0.25)"});
}


document.querySelector(".settings").addEventListener("click", function(event){event.stopPropagation();});

const settingsBtnIcon = document.querySelectorAll('.settings-btn-icon');
settingsBtnIcon.forEach(btn => {
    btn.onclick = () => {
        if(btn.classList.contains('settings-btn-icon')){
            btn.classList.toggle('btn-active');
            btn.parentNode.classList.toggle('activate');
        }
        if(btn.getAttribute('alt') === 'theme'){
            document.querySelector('.quick-settings').classList.toggle('light-theme');
            document.querySelector('.settings-btn-name').classList.toggle('light-theme');
            document.querySelector('.settings-brightness').classList.toggle('light-theme');
            document.querySelector('.settings-btn-icon').classList.toggle('light-theme');
            document.querySelector('.btn-active').classList.toggle('light-theme');
            document.querySelector('.ring-state').classList.toggle('light-theme');
            document.querySelector('.medias-volume').classList.toggle('light-theme');
            document.querySelector('.long-press-app-popup').classList.toggle('light-theme');
            document.querySelector('.long-press-app-desktop-popup').classList.toggle('light-theme');
            document.querySelector('.popup img').classList.toggle('light-theme');
            document.querySelector('.popup-text').classList.toggle('light-theme');

            /* SVG IMAGE CHANGING COLOR */
            document.querySelector('svg polygon').classList.toggle('light-theme');

            document.querySelector('.apps-drawer-pagination-popup').classList.toggle('light-theme');
            if(document.querySelector('.apps-drawer-pagination-popup > img')){
                document.querySelector('.apps-drawer-pagination-popup > img').classList.toggle('light-theme');
            }
            
            /* SAVE THE THEME IN THE BROWSER STORAGE */
            if(localStorage.getItem('theme') == 'light'){
                localStorage.setItem('theme', 'dark');
            }else{
                localStorage.setItem('theme', 'light');
            }
        }
        if(btn.getAttribute('alt') === 'wifi'){
            if(btn.getAttribute('src') === "icons/Raccourci_parametres/Wi-Fi.png"){
                btn.src = "icons/Raccourci_parametres/Wi-Fi_active.png";
            }else{
                btn.src = "icons/Raccourci_parametres/Wi-Fi.png"
            }
        }
        if(btn.getAttribute('alt') === 'lamp'){
            document.body.classList.toggle('lamp-active');
            if(btn.getAttribute('src') === "icons/Raccourci_parametres/Lampe_de_poche.png"){
                btn.src = "icons/Raccourci_parametres/Lampe_de_poche_active.png";
            }else{
                btn.src = "icons/Raccourci_parametres/Lampe_de_poche.png"
            }
        }
        if(btn.getAttribute('alt') === 'sim'){
            if(btn.getAttribute('src') === "icons/Raccourci_parametres/SIM1.png"){
                btn.src = "icons/Raccourci_parametres/SIM2.png";
            }else{
                btn.src = "icons/Raccourci_parametres/SIM1.png"
            }
            setTimeout(() => {
                btn.parentNode.classList.toggle('activate');
                btn.classList.toggle('btn-active');
            },1000);

        }
        if(btn.getAttribute('alt') === 'nodisturb'){
            document.querySelector('.notification-bar > .signal-battery > #nodisturb').classList.toggle('show-icon');
            document.querySelector('.notification-panel-signal-battery > .signal-battery > #nodisturb').classList.toggle('show-icon');
        }
        if(btn.getAttribute('alt') === 'hotspot'){
            document.querySelector('.notification-bar > .signal-battery > #hotspot').classList.toggle('show-icon');
            document.querySelector('.notification-panel-signal-battery > .signal-battery > #hotspot').classList.toggle('show-icon');
        }
    }
});

/* SAVE THE THEME IN THE BROWSER STORAGE */
if(localStorage.getItem('theme') == 'light'){
    document.querySelector('.quick-settings').classList.add('light-theme');
    document.querySelector('.settings-btn-name').classList.add('light-theme');
    document.querySelector('.settings-brightness').classList.add('light-theme');
    document.querySelector('.settings-btn-icon').classList.add('light-theme');
    document.querySelector('.btn-active').classList.add('light-theme');
    document.querySelector('.ring-state').classList.add('light-theme');
    document.querySelector('.medias-volume').classList.add('light-theme');
    document.querySelector('.long-press-app-popup').classList.add('light-theme');
    document.querySelector('.long-press-app-desktop-popup').classList.add('light-theme');
    document.querySelector('.popup img').classList.add('light-theme');
    document.querySelector('.popup-text').classList.add('light-theme');
    document.querySelector('svg polygon').classList.add('light-theme');
    document.querySelector('.apps-drawer-pagination-popup').classList.add('light-theme');
    document.querySelector('.apps-drawer-pagination-popup > img').classList.add('light-theme');
}else if(localStorage.getItem('theme' == 'dark')){
    document.querySelector('.quick-settings').classList.remove('light-theme');
    document.querySelector('.settings-btn-name').classList.remove('light-theme');
    document.querySelector('.settings-brightness').classList.remove('light-theme');
    document.querySelector('.settings-btn-icon').classList.remove('light-theme');
    document.querySelector('.btn-active').classList.remove('light-theme');
    document.querySelector('.ring-state').classList.remove('light-theme');
    document.querySelector('.medias-volume').classList.remove('light-theme');
    document.querySelector('.long-press-app-popup').classList.remove('light-theme');
    document.querySelector('.long-press-app-desktop-popup').classList.remove('light-theme');
    document.querySelector('.popup img').classList.remove('light-theme');
    document.querySelector('.popup-text').classList.remove('light-theme');
    document.querySelector('svg polygon').classList.remove('light-theme');
    document.querySelector('.apps-drawer-pagination-popup').classList.remove('light-theme');
    document.querySelector('.apps-drawer-pagination-popup > img').classList.remove('light-theme');
}else{
    localStorage.setItem('theme', 'dark');
}
