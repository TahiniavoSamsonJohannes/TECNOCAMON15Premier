/* SEARCH APP */
$(".search-app input").focusin(function(){
    $(".search-app").addClass("search-app-focused");
    $(".search-app-more").fadeOut(100);
});
$(".search-app input").focusout(function(){
    $(".search-app").removeClass("search-app-focused");
    setTimeout(function(){
        $(".search-app-more").fadeIn(100);
    },500);
});

const phone = document.querySelector('.phone');
const appsDrawer = document.querySelector('.apps-drawer');
const allApps = document.querySelector('all-apps');
const appsDrawerButtonToggle = document.querySelector('.apps-drawer-toggle-button');
const listOfAllApps = document.querySelector(".list-of-all-apps");
const appsLabel = document.querySelectorAll(".apps-label");
const appsTables = document.querySelectorAll(".apps-table");

listOfAllApps.addEventListener("scroll",function() {
    const listOfAllAppsRect = listOfAllApps.getBoundingClientRect();
    closeLongPressAppPopup();
    
    appsTables.forEach(appsTable => {
        const appsTableRect = appsTable.getBoundingClientRect();
        const triggerDistance = 24;
        const onAlphabet = document.querySelector(`div[data-pagination="${appsTable.id}"]`);

        /* LIST OF ALL APPS PAGINATION */
        if(appsTableRect.top <= listOfAllAppsRect.top + triggerDistance && appsTableRect.bottom-2 > listOfAllAppsRect.top){
            if(appsTable.id === "<img src='icons/Applications/apps_suggestions_off.png'>"){
                onAlphabet.querySelector("img").setAttribute("src","icons/Applications/apps_suggestions_on.png");
            }else if(appsTable.id === "<img src='icons/Applications/favorites_apps_off.png'>"){
                onAlphabet.querySelector("img").setAttribute("src","icons/Applications/favorites_apps_on.png");
            }else{
                onAlphabet.classList.add('on-alphabet');
            }
        }else{
            if(appsTable.id === "<img src='icons/Applications/apps_suggestions_off.png'>"){
                onAlphabet.querySelector("img").setAttribute("src","icons/Applications/apps_suggestions_off.png");
            }else if(appsTable.id === "<img src='icons/Applications/favorites_apps_off.png'>"){
                onAlphabet.querySelector("img").setAttribute("src","icons/Applications/favorites_apps_off.png");
            }else{
                onAlphabet.classList.remove('on-alphabet');
            }
        }

    });
    
});

const appsDrawerPaginationContainer = document.querySelector(".apps-drawer-pagination-container");
const appsDrawerPagination = document.querySelectorAll(".apps-drawer-pagination");
appsDrawerPagination.forEach(appsPagination => {
    appsPagination.onclick = function(event) {
        let appsPage = event.target.closest('.apps-drawer-pagination');
        
        appsDrawerPaginationPopup(appsPage);
    }

});

function appsDrawerPaginationPopup(appsPage){
    let appsDrawerPaginationPopup = document.querySelector('.apps-drawer-pagination-popup');
    appsDrawerPaginationPopup.innerHTML = appsPage.getAttribute('data-pagination');
    appsDrawerPaginationPopup.style.top = appsPage.offsetTop - appsPage.offsetHeight +"px";
    
    /* STRECH AND SHRINK ANIMATION */
    appsDrawerPaginationPopup.style.display = "flex";
    setTimeout(function() {
        appsDrawerPaginationPopup.style.fontSize = "13px";
        appsDrawerPaginationPopup.style.transform = "scale(1)";
    },20);
    setTimeout(function() {
        appsDrawerPaginationPopup.style.transform = "scale(0.5)";
        appsDrawerPaginationPopup.style.fontSize = "10.4px";
    },500);
    setTimeout(function() {
        appsDrawerPaginationPopup.style.display = "none";
    },600);

    let appsPageTarget = [...appsLabel].find(label => label.id === appsPage.id);

    listOfAllApps.scroll({
        left: 0,
        top: appsPageTarget.offsetTop,
        behavior:"smooth"
    });
}





function closeLongPressAppPopup() {
    longPressAppPopup.style.transform = "scale(0.7)";
    setTimeout(() => {
        longPressAppPopup.style.display = "none";
    },100);
}


/* AllAppsOffline */
const longPressAppPopup = document.querySelector('.long-press-app-popup');
const uninstallApp = document.querySelector('#uninstall-app');
const informationsApp = document.querySelector('#informations-app');
const sendAppToDesktop = document.querySelector('#send-app-to-desktop');
const inversedTriangle1 = document.querySelector('.inversed-triangle1'); 
let apps = document.querySelectorAll(".app");
const popupWidth = 165, popupHeight = 35;
let popupLeft, pressedApp = null;

listOfAllApps.addEventListener('click',() => {
    closeLongPressAppPopup();
});

apps.forEach(app => {
    let longPressApp;
    app.setAttribute('draggable', false);
    app.firstChild.setAttribute('draggable', false);
    
    /* ADDING APPS NAME */
    let appsName = app.querySelector('img').getAttribute('alt');
    let divAppName = document.createElement('div');
    divAppName.innerHTML = appsName;
    divAppName.classList.add('draggableText');
    app.appendChild(divAppName);

    app.children[0].addEventListener('click', (event) => {
        event.stopPropagation();
    });

    app.addEventListener('mousedown', (event) => {
        event.stopPropagation();
        closeLongPressAppPopup();
        
        pressedApp = event.target.closest('.app');
        let pressedAppRect = pressedApp.getBoundingClientRect();
        const marginY = 35, marginX2 = 30 ,marginX3 = 20, marginX4 = -10, difference = 12;

        longPressApp = setTimeout(() => {
            // Placer la popup au-dessus de l'élément pressé
            let appLeft = Math.ceil(pressedApp.offsetLeft);
            let appWidth = pressedApp.offsetWidth;
            let appHeight = pressedApp.offsetHeight;
            let appRight = appLeft + Math.ceil(appWidth);
            let appHalfWidth = appWidth/2;
            switch (true){
                case (appLeft > 0 && appLeft < 10): {
                    popupLeft = appLeft;
                    longPressAppPopup.style.left = `${popupLeft}px`;
                    longPressAppPopup.style.transformOrigin = 'bottom left';
                    break;
                }
                case (appLeft > 50 && appLeft < 60): {
                    popupLeft = appLeft - marginX2;
                    longPressAppPopup.style.left = `${popupLeft}px`;
                    longPressAppPopup.style.transformOrigin = 'bottom left';
                    break;
                }
                case (appLeft > 100 && appLeft < 110): {
                    popupLeft = appRight - popupWidth + marginX3;
                    longPressAppPopup.style.left = `${popupLeft}px`;
                    longPressAppPopup.style.transformOrigin = 'bottom right';
                    break;
                }
                case (appLeft > 150 && appLeft < 160): {
                    popupLeft = appRight - popupWidth + marginX4;
                    longPressAppPopup.style.left = `${popupLeft}px`;
                    longPressAppPopup.style.transformOrigin = 'bottom right';
                    break;
                }
                default:{
                    console.log('No element has this left offset');
                }

            }

            let phoneRect = phone.getBoundingClientRect();
            longPressAppPopup.style.top = `${pressedAppRect.top - phoneRect.top - appHeight - marginY}px`;
            inversedTriangle1.style.left = `${appLeft + appHalfWidth - popupLeft - difference}px`;

            appLongClickAnimation(app,longPressAppPopup);
            
        },200);
    });
    app.addEventListener('mouseup', () => {
        clearTimeout(longPressApp);
    });
    

});

/* Vérifier si l'élément est déjà sur le desktop, si oui supprimer celle existante, et 
aller vers le dernier conteneur d'application et vérifier si elle n'est pas pleine,
si oui alors placer une copie de l'élément après le dernier élément du conteneur courant,
sinon créer un nouveau conteneur vide avec les mêmes dimensions colonnes lignes, et 
placer l'élément dans ce conteneur au tout début */
sendAppToDesktop.addEventListener('click', (event) => {
    closeLongPressAppPopup();
    let lastCellHavingChild = null;
    const firstCellIndex = 0, lastCellIndex = 24;
    let appClone = pressedApp.cloneNode(true);
    let appCloneName = appClone.querySelector('img').getAttribute('alt');
    // L'index de la cellule contenant l'élément déjà mais qu'on veut réinsérer
    let cellIndexOfExistingElement;

    /* Récupérer le dernier conteneur grille */
    let lastGridContainer = gridContainers[gridContainers.length-1];

    /* Vérifier si l'élément qu'on veut insérer est déjà présent dans l'une des cellules d'un conteneur */
    /* Parcourir chaque conteneurs */
    gridContainers.forEach(gridContainer => {
        // Récupérer toutes les cellules du conteneur courant
        let cells = gridContainer.querySelectorAll('.grid-cell');
        /* Parcourir chaque cellules */
        cells.forEach(cell => {
            if(cell.children.length > 0){
                /* Récupérer la dernière cellule du dernier conteneur contenant un élément et placer notre élément dans la cellule suivante */
                if(gridContainer === lastGridContainer){
                    lastCellHavingChild = cell;
                }
                /* Vérifier si l'élément qu'on veut inséré existe déjà, si oui, supprimer celle existante */
                let appInCellName = cell.children[0].querySelector('img').getAttribute('alt');
                if(appCloneName === appInCellName){
                    cellIndexOfExistingElement = parseInt(cell.getAttribute('data-cell'));
                    let cellNode = document.querySelector(`#${gridContainer.id} > .grid-cell[data-cell='${cellIndexOfExistingElement}']`);
                    let appInCell = cellNode.querySelector('.draggable');
                    appInCell.style.transform = 'scale(0)';
                    setTimeout(() => {
                        cellNode.removeChild(appInCell);
                    },100);
                }
            }
        });
    });

    
    appClone.querySelector('img').classList.remove('app-icon');
    appClone.classList.remove('app');        
    appClone.classList.add('draggable');
    appClone.setAttribute('data-new', 'true');

    /* S'il existe au moins cellule ayant un élément */
    if(lastCellHavingChild != null){
        let lastCellHavingChildIndex = parseInt(lastCellHavingChild.getAttribute('data-cell'));
        let afterLastCellHavingChildIndex = lastCellHavingChildIndex + 1;
        let afterLastCellHavingChild = document.querySelector(`#${lastGridContainer.id} > .grid-cell[data-cell="${afterLastCellHavingChildIndex}"]`);
        /* Vérifier si l'élément déjà existant est dans la dernière cellule contenant un élément, si oui, réinsérer au même emplacement */
        if(cellIndexOfExistingElement === lastCellHavingChildIndex){
            appClone.setAttribute('data-cell', `${cellIndexOfExistingElement}`);
            lastCellHavingChild.appendChild(appClone);
            /* Vérifier si l'index de la dernière cellule contenant un élément n'est pas celle de la dernière cellule du conteneur */
        }else if(lastCellHavingChildIndex != lastCellIndex){
            appClone.setAttribute('data-cell', `${afterLastCellHavingChildIndex}`);
            afterLastCellHavingChild.appendChild(appClone);
        }else{
            /* Créer un nouveau conteneur grille */
            createNewGridContainer(appClone);
            hideAppsDrawer();
        }
    }else{
        /* Placer l'élément dans la première cellule */
        let firstCell = document.querySelector(`#${lastGridContainer.id} > .grid-cell[data-cell="${firstCellIndex}"]`);
        appClone.setAttribute('data-cell', `${firstCellIndex}`);
        firstCell.appendChild(appClone);
    }

    appClone = null;
    /* FERMER LA POPUP */
    closeLongPressAppPopup();

});


let appsDrawerOpen = false;
appsDrawerButtonToggle.addEventListener('click', () => {
    if(!appsDrawerOpen){
        showAppsDrawer();
    }else{
        hideAppsDrawer();
    }
    closeLongPressAppPopup();
    closeLongPressAppDesktopPopup();
});

function showAppsDrawer(){
    $('.apps-drawer').fadeIn(250).addClass('apps-drawer-background');
    $('.all-apps').fadeIn(250).addClass('apps-drawer-show');
    $('.desktop').css('opacity', '0');
    appsDrawerOpen = true;
}
function hideAppsDrawer(){
    $('.apps-drawer').fadeOut(250).removeClass('apps-drawer-background');
    $('.all-apps').fadeOut(100).removeClass('apps-drawer-show');
    $('.desktop').css('opacity', '1');
    appsDrawerOpen = false;
}