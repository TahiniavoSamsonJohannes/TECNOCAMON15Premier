let pageEffect = {
    firstNumPage: 1,
    currentNumPage : 1,
    nbPage : null,
    currentAppsGrid : null,
    appsGrids : null, // Noeud des grilles d'applications
    init: function(appsGrids){
        this.nbPage = appsGrids.length;
        this.appsGrids = Array.from(appsGrids);
        appsGrids.forEach((appsGrid, index) => {
            appsGrid.style.transform = 'rotateY(-90deg)';
            appsGrid.style.opacity = 0;
            document.querySelector(`#cp${index+1}`).style.backgroundColor = '#ffffff50';
        });

        appsGrids[0].style.transform = 'rotate(0deg)';
        appsGrids[0].style.opacity = 1;

        document.querySelector(`#cp${this.currentNumPage}`).style.backgroundColor = '#ffffff';
    },
    nextPage: function(){
        if(this.currentNumPage < this.nbPage){
            this.currentAppsGrid = this.appsGrids.find(appsGrid => appsGrid.id === `container${this.currentNumPage}`);
            this.currentAppsGrid.style.transform = 'rotateY(90deg)';
            this.currentAppsGrid.style.opacity = 0;
            document.querySelector(`#cp${this.currentNumPage}`).style.backgroundColor = '#ffffff50';
            this.currentNumPage += 1;
            this.currentAppsGrid = this.appsGrids.find(appsGrid => appsGrid.id === `container${this.currentNumPage}`);
            this.currentAppsGrid.style.transform = 'rotateY(0deg)';
            this.currentAppsGrid.style.opacity = 1;
            document.querySelector(`#cp${this.currentNumPage}`).style.backgroundColor = '#ffffff';
        }
    },
    previousPage: function(){
        if(this.currentNumPage > this.firstNumPage){
            this.currentAppsGrid = this.appsGrids.find(appsGrid => appsGrid.id === `container${this.currentNumPage}`);
            this.currentAppsGrid.style.transform = 'rotateY(-90deg)';
            this.currentAppsGrid.style.opacity = 0;
            document.querySelector(`#cp${this.currentNumPage}`).style.backgroundColor = '#ffffff50';
            this.currentNumPage -= 1;
            this.currentAppsGrid = this.appsGrids.find(appsGrid => appsGrid.id === `container${this.currentNumPage}`);
            this.currentAppsGrid.style.transform = 'rotateY(0deg)';
            this.currentAppsGrid.style.opacity = 1;
            document.querySelector(`#cp${this.currentNumPage}`).style.backgroundColor = '#ffffff';
        }
    },
    homePage: function(){
        if(this.currentNumPage != this.firstNumPage){
            if(this.currentNumPage > this.firstNumPage){
                this.currentAppsGrid = this.appsGrids.find(appsGrid => appsGrid.id === `container${this.currentNumPage}`);
                this.currentAppsGrid.style.transform = 'rotateY(-90deg)';
                this.currentAppsGrid.style.opacity = 0;
                document.querySelector(`#cp${this.currentNumPage}`).style.backgroundColor = '#ffffff50';
                this.currentNumPage -= 1;
                this.currentAppsGrid = this.appsGrids.find(appsGrid => appsGrid.id === `container${this.currentNumPage}`);
                this.currentAppsGrid.style.transform = 'rotateY(0deg)';
                this.currentAppsGrid.style.opacity = 1;
                document.querySelector(`#cp${this.currentNumPage}`).style.backgroundColor = '#ffffff';
            }
            setTimeout(() => {pageEffect.homePage();},150);
        }
    },
    updatePage: function(newAppsGrid){
        let nbOldPage = this.nbPage;
        this.appsGrids = Array.from(newAppsGrid);
        this.nbPage = this.appsGrids.length;
        if(this.nbPage > nbOldPage){
            while(this.currentNumPage < this.nbPage){
                pageEffect.nextPage();
            }
        }else if(this.nbPage < nbOldPage){
            if(this.currentNumPage > this.firstNumPage){
                this.currentNumPage -= 1;
                this.currentAppsGrid = this.appsGrids.find(appsGrid => appsGrid.id === `container${this.currentNumPage}`);
                this.currentAppsGrid.style.transform = 'rotateY(0deg)';
                this.currentAppsGrid.style.opacity = 1;
                document.querySelector(`#cp${this.currentNumPage}`).style.backgroundColor = '#ffffff';
            }else{
                this.currentNumPage += 1;
                this.currentAppsGrid = this.appsGrids.find(appsGrid => appsGrid.id === `container${this.currentNumPage}`);
                this.currentAppsGrid.style.transform = 'rotateY(0deg)';
                this.currentAppsGrid.style.opacity = 1;
                document.querySelector(`#cp${this.currentNumPage}`).style.backgroundColor = '#ffffff';
            }
        }

    }
}

const interface = document.querySelector('.interface');
const interfaceRect = interface.getBoundingClientRect();
const appsDesktop = document.querySelector('.appsDesktop');
const appsDesktopRect = appsDesktop.getBoundingClientRect();
let gridContainers;
let gridContainerQuickAccess;
const hiddenDiv = document.createElement('hiddenDiv');
const gridContainerPagination = document.querySelector('.grid-container-pagination');
const goToPreviousPage = document.getElementById('previousPage');
const goToNextPage = document.getElementById('nextPage');

/* PAGE EFFECT */

goToNextPage.onclick = () => {
    pageEffect.nextPage();
};
goToPreviousPage.onclick = () => {
    pageEffect.previousPage();
};
goToNextPage.ondragover = (event) => {
    event.target.classList.add('appsDesktopEdgesHover');
    pageEffect.nextPage();
};
goToPreviousPage.ondragover = (event) => {
    event.target.classList.add('appsDesktopEdgesHover');
    pageEffect.previousPage();
};
goToNextPage.ondragleave = (event) => {
    event.target.classList.remove('appsDesktopEdgesHover');
};
goToPreviousPage.ondragleave = (event) => {
    event.target.classList.remove('appsDesktopEdgesHover');
};

let observer = new MutationObserver(function(mutationsList, observer){
    for(mutation of mutationsList){
        if(mutation.type === 'childList'){
            /* Types de mutation : 
            - childList: Indique que des noeuds enfants ont été ajoutés ou supprimés.
            - attributes : Indique qu'un attribut d'un noeud observé a été modifié.
            - characterData : Indique que les données de texte d'un noeud observé ont été modifiées.
            */
            mutation.addedNodes.forEach(node => {
                if(node.nodeType === 1){
                    if(node.getAttribute('data-new') === 'true'){
                        /* Types de noeuds :
                        - 1 : (Element), correspond aux éléments HTML (comme <div>, <p>, etc.)
                        - 3 : (Text), correspond aux noeuds de texte à l'intérieur des éléments
                        - 8 : (Comment), correspond aux noeuds de commentaire HTML (comme <!-- Comment -->)
                        */
                        node.removeAttribute('data-new');
                        /* Petite animation au moment de l'insertion */
                        node.style.transform = 'scale(0)';
                        setTimeout(() => {
                            node.style.transform = 'scale(1.2)';
                        },100);
                        setTimeout(() => {
                            node.style.transform = 'scale(1)';
                        },300);

                        /* Mise à jour des éléments */
                        setTimeout(() => {
                            updateAppsDesktop();
                            pageEffect.updatePage(gridContainers);
                        },100)
                    }
                    if(node.getAttribute('data-dropped') === 'true'){
                        console.log('HERE IS THE NODE YOU"RE LOOKING FOR');
                        console.log(node);
                        node.setAttribute('data-dropped', 'false');
                        let gridContainers = document.querySelectorAll('.grid-container');
                        gridContainers.forEach(gridContainer => {
                            let draggables = gridContainer.querySelectorAll('.draggable');
                            draggables.forEach(draggable => {
                                draggable.style.transform = 'scale(0.9)';
                                setTimeout(() => {
                                    draggable.style.transform = 'scale(1.1)';
                                },100);
                                setTimeout(() => {
                                    draggable.style.transform = 'scale(0.9)';
                                },300);
                                setTimeout(() => {
                                    draggable.style.transform = 'scale(1.1)';
                                },400);
                                setTimeout(() => {
                                    draggable.style.transform = 'scale(1)';
                                },500);
                            });
                        });
                    }
                    if(node.getAttribute('data-containerOrigin') !== node.getAttribute('data-containerTarget')){
                        setTimeout(() => {
                            updateAppsDesktop();
                        },100)
                    }

                }

            
            });
        }
    }
});
/* Mise à jour de enfant direct à l'élément observé et tous les descendants sous-éléments */
let config = {childList: true, subtree: true};
observer.observe(interface, config);

interface.addEventListener('dragover', (event) => {
    event.preventDefault();
    /* Positionner la copie de l'élément sous le curseur */
    let dragImageLeft = (event.clientX - interfaceRect.left - draggedElementWidth/2);
    let dragImageTop = (event.clientY - interfaceRect.top - draggedElementHeight*(2/3));
    dragImage.style.left = dragImageLeft + "px";
    dragImage.style.top = dragImageTop + "px";
});

appsDesktop.addEventListener('dragenter', (event) => {event.preventDefault();});
appsDesktop.addEventListener('dragover', (event) => {event.preventDefault();});
appsDesktop.addEventListener('click', () => {closeLongPressAppDesktopPopup();});


function updateAppsDesktop() {
    gridContainers = document.querySelectorAll('.grid-container');
    /* QUICK ACCESS APPS */
    gridContainerQuickAccess = document.querySelector('.grid-container-quick-access');
    let draggablesQuickAccess = gridContainerQuickAccess.querySelectorAll('.draggable');
    draggablesQuickAccess.forEach(draggableQuickAccess => {
        draggableQuickAccess.setAttribute('draggable', true);
        draggableQuickAccess.firstElementChild.setAttribute('draggable', false);

        /* Remove the name of the app */
        let checkAppsName = draggableQuickAccess.querySelector('.draggableText');
        if(checkAppsName){
            checkAppsName.remove();
        }

        // Initialize positions of draggable elements
        let cell = draggableQuickAccess.parentNode;
        setPosition(draggableQuickAccess, cell);

        draggableQuickAccess.addEventListener('dragstart', handleDragStart);
        draggableQuickAccess.addEventListener('dragend', handleDragEnd);
        draggableQuickAccess.addEventListener('dragover', (event) => {event.preventDefault();});
        draggableQuickAccess.addEventListener('dragleave', (event) => {event.preventDefault();});
        draggableQuickAccess.addEventListener('drop', handleDrop);
        draggableQuickAccess.addEventListener('mousedown', handleMouseDown);
        draggableQuickAccess.addEventListener('click', (event) => {event.stopPropagation();});
        draggableQuickAccess.addEventListener('mouseup', handleMouseUp);

    });

    gridContainerQuickAccess.addEventListener('dragenter', (event) => {event.preventDefault();});
    gridContainerQuickAccess.addEventListener('dragover', (event) => {event.preventDefault();});
    gridContainerQuickAccess.addEventListener('dragleave', (event) => {event.preventDefault();});

    /* L'API MutationObserver pour surveiller les modifications apportées au DOM */
    /* L'évènement DOMNodeInserted est obsolète */
    let cells = gridContainerQuickAccess.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.addEventListener('dragenter', (event) => {event.preventDefault();});
        cell.addEventListener('dragleave', (event) => {event.preventDefault();});
        cell.addEventListener('dragover', handleDragOver);
        cell.addEventListener('drop', handleDrop);

    });
    /* QUICK ACCESS APPS END ------ */
    
    gridContainers.forEach((gridContainer, index)=> {
        let draggables = gridContainer.querySelectorAll('.draggable');
        let circlePaginations = document.querySelectorAll('.circle-pagination');
        let circlePagination = circlePaginations[index];
        // Supprimer le conteneur grille vide
        if(draggables.length == 0) {
            if(gridContainers.length > 1){
                gridContainer.remove();
                circlePagination.remove();
                gridContainers = document.querySelectorAll('.grid-container');
                setTimeout(() => {
                    updateAppsDesktop();
                    pageEffect.updatePage(gridContainers);
                },100);
            }
        }else{
            // Mise à jour des id
            gridContainer.id = `container${index+1}`;
            try {
                circlePagination.id = `cp${index+1}`;
            } catch (error) {
                console.log(error);
            }
        }


        draggables.forEach(draggable => {
            draggable.setAttribute('draggable', true);
            draggable.firstChild.setAttribute('draggable', false);
        
            /* ADDING APPS NAME */
            let checkAppsName = draggable.querySelector('.draggableText');
            if (!checkAppsName){
                let appsName = draggable.querySelector('img').getAttribute('alt');
                let divAppName = document.createElement('div');
                divAppName.innerHTML = appsName;
                divAppName.classList.add('draggableText');
                draggable.appendChild(divAppName);
            }

            // Initialize positions of draggable elements
            let cell = draggable.parentNode;
            setPosition(draggable, cell);
        
            draggable.addEventListener('dragstart', handleDragStart);
            draggable.addEventListener('dragend', handleDragEnd);
            draggable.addEventListener('dragover', (event) => {event.preventDefault();});
            draggable.addEventListener('dragleave', (event) => {event.preventDefault();});
            draggable.addEventListener('drop', handleDrop);
            draggable.addEventListener('mousedown', handleMouseDown);
            draggable.addEventListener('click', (event) => {event.stopPropagation();});
            draggable.addEventListener('mouseup', handleMouseUp);
        });
    
        gridContainer.addEventListener('dragenter', (event) => {event.preventDefault();});
        gridContainer.addEventListener('dragover', (event) => {event.preventDefault();});
        gridContainer.addEventListener('dragleave', (event) => {event.preventDefault();});
    
        /* L'API MutationObserver pour surveiller les modifications apportées au DOM */
        /* L'évènement DOMNodeInserted est obsolète */
        let cells = gridContainer.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            cell.addEventListener('dragenter', (event) => {event.preventDefault();});
            cell.addEventListener('dragleave', (event) => {event.preventDefault();});
            cell.addEventListener('dragover', handleDragOver);
            cell.addEventListener('drop', handleDrop);
    
        });
    });
}

updateAppsDesktop();
pageEffect.init(gridContainers);


const longPressAppDesktopPopup = document.querySelector('.long-press-app-desktop-popup');
const deleteAppButton = document.querySelector('#delete-app');
const inversedTriangle2 = document.querySelector('.inversed-triangle2');
const desktop = document.querySelector('.desktop');
let draggedElement = null, draggedElementName;
let moveToNext = false, moveToPrevious = false;
let draggedElementWidth, draggedElementHeight;
var dragImage = null;
let targetCell;
let appToDelete, longPressAppDesktop;

longPressAppDesktopPopup.addEventListener('click',(event) => {event.stopPropagation()});

function handleMouseDown(event) {
    event.stopPropagation();
    closeLongPressAppDesktopPopup();
    console.log('top: '+event.target.getBoundingClientRect().top);
    appToDelete = event.target.closest('.draggable');
    longPressAppDesktop = setTimeout(() => {
        const marginX = 5, marginYUp = 10, marginYDown = 17;
        
        const appToDeleteRect = appToDelete.getBoundingClientRect();
        let longPressAppDesktopPopupLeft = appToDelete.offsetLeft - marginX;
        let longPressAppDesktopPopupTop = appToDeleteRect.top - appsDesktopRect.top - appToDeleteRect.height - marginYUp;
        longPressAppDesktopPopup.style.left = `${longPressAppDesktopPopupLeft}px`;
        if(longPressAppDesktopPopupTop + appsDesktopRect.top < appsDesktopRect.top){
            longPressAppDesktopPopupTop = appToDeleteRect.top - appsDesktopRect.top + appToDeleteRect.height + marginYDown;
            longPressAppDesktopPopup.style.transformOrigin = 'top center';
            inversedTriangle2.classList.add('triangle2');
        }else{
            longPressAppDesktopPopup.style.transformOrigin = 'bottom center';
            inversedTriangle2.classList.remove('triangle2');
        }
        longPressAppDesktopPopup.style.top = `${longPressAppDesktopPopupTop}px`;

        appLongClickAnimation(appToDelete,longPressAppDesktopPopup);

    },200);

}

function appLongClickAnimation(app,popup) {
    app.style.transform = "scale(0.9)";
    app.style.opacity = "0.8";
    setTimeout(() => {
        popup.style.display = "flex";
        setTimeout(() => {
            popup.style.transform = "scale(1)";
        },1);
        app.style.transform = "scale(1)";
        app.style.opacity = "1";
    },400);
}

function handleMouseUp(event) {
    event.stopPropagation();
    clearTimeout(longPressAppDesktop);
}

function closeLongPressAppDesktopPopup() {
    longPressAppDesktopPopup.style.transform = 'scale(0)';
    setTimeout(() => {
        longPressAppDesktopPopup.style.display = 'none';
    },10);
}

deleteAppButton.addEventListener('click', () => {
    appToDelete.style.transform = 'scale(0.9)';
    appToDelete.style.filter = 'grayscale(100%)';
    appToDelete.style.opacity = '0.7';
    setTimeout(() => {
        closeLongPressAppDesktopPopup();
        appToDelete.remove();
        updateAppsDesktop();
        pageEffect.updatePage(gridContainers);
        appToDelete = null;
    },100);
});

function handleDragStart(event) {
    /* Arrêt du handleMouseDown */
    closeLongPressAppDesktopPopup();
    clearTimeout(longPressAppDesktop);

    draggedElement = event.target.closest('.draggable');

    draggedElementName = draggedElement.querySelector('.draggableText');
    if(draggedElementName){
        draggedElementName.style.visibility = 'hidden';
    }


    let draggedElementInfos = draggedElement.getBoundingClientRect();
    draggedElementWidth = draggedElementInfos.width;
    draggedElementHeight = draggedElementInfos.height;

    // Créer un image de glissement
    dragImage = draggedElement.cloneNode(true);
    interface.appendChild(dragImage);
    dragImage.classList.add('drag-image');
    
    
    event.dataTransfer.setDragImage(hiddenDiv,0,0);

    // Positionner la copie de l'élément sous le curseur
    let dragImageLeft = (event.clientX - interfaceRect.left - draggedElementWidth/2);
    let dragImageTop = (event.clientY - interfaceRect.top - draggedElementHeight*(2/3));
    dragImage.style.left = dragImageLeft + "px";
    dragImage.style.top = dragImageTop + "px";
    
    
    // Après que le navigateur a terminé de traiter l'évènement dragstart ajout de classe
    // Pour éviter des incohérences visuelles ou des comportements imprévus
    setTimeout(() => {
        draggedElement.classList.add('dragging');
    }, 0);
}

function handleDragEnd(event) {
    event.preventDefault();
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        if(draggedElementName){
            setTimeout(() => {
                draggedElementName.style.visibility = 'visible';
            },400);
        }
        interface.removeChild(dragImage);

        draggedElement = null;
    }
}

function handleDrop(event) {
    event.preventDefault();
    if (draggedElement) {
        draggedElement.classList.remove('dragging');
        if(draggedElementName){
            setTimeout(() => {
                draggedElementName.style.visibility = 'visible';
            },400);
        }
        interface.removeChild(dragImage);
        draggedElement.setAttribute('data-dropped', 'true');

        draggedElement = null;
    }
}

function handleDragOver(event) {
    event.preventDefault();

    /* Arrêt du handleMouseDown */
    closeLongPressAppDesktopPopup();
    clearTimeout(longPressAppDesktop);

    targetCell = event.target.closest('.grid-cell');
    let targetGridContainer = event.target.closest('.grid-container');
    if(!targetGridContainer){
        targetGridContainer = event.target.closest('.grid-container-quick-access');
    }

    if (targetCell.classList.contains('grid-cell')){
        // Récuperer l'index de la cellule cible
        let targetCellIndex = parseInt(targetCell.getAttribute('data-cell'));
        // Récuperer l'index de l'élément draggé
        let draggedIndex = parseInt(draggedElement.getAttribute('data-cell'));
        // Récuperer la cellule origine de l'élément draggé
        /* let originCell = document.querySelector(`#${gridContainer.id} > .grid-cell[data-cell="${draggedIndex}"]`); */
        let originCell = draggedElement.parentNode;

        if (targetCellIndex !== draggedIndex) {
            // Déplacer l'élément
            moveElement(draggedElement, originCell, targetCellIndex, targetGridContainer);
        }
    }


}



function moveElement(element, originCell, targetCellIndex, targetGridContainer) {
    // Empêcher le drop d'un élément étranger dans grid-container-quick-access s'il est plein
    let draggables = targetGridContainer.querySelectorAll('.draggable');
    if(targetGridContainer.id === 'containerX' && draggables.length >= 5 && originCell.parentNode !== targetGridContainer){
        return false;
    }

    // Récupérer la cellule cible
    let targetCell = document.querySelector(`#${targetGridContainer.id} > .grid-cell[data-cell="${targetCellIndex}"]`);
    // Récupérer l'élément dans la cellule cible
    let existingElement = targetCell.querySelector('.draggable');

    // Vérifier s'il existe et s'il est différent de l'élément draggé
    if (existingElement && existingElement !== draggedElement) {
        let nextCellIndex = targetCellIndex + 1;
        let previousCellIndex = targetCellIndex - 1;
        if ((parseInt(element.getAttribute('data-cell')) < parseInt(existingElement.getAttribute('data-cell')) && !moveToNext) || moveToPrevious) {
            // Move target cell element to previous cell
            if (document.querySelector(`#${targetGridContainer.id} > .grid-cell[data-cell="${previousCellIndex}"]`)) {
                moveToPrevious = true;
                moveElement(existingElement, targetCell, previousCellIndex, targetGridContainer);
            }
        } else {
            // Move target cell element to next cell
            if (document.querySelector(`#${targetGridContainer.id} > .grid-cell[data-cell="${nextCellIndex}"]`)) {
                moveToNext = true;
                moveElement(existingElement, targetCell, nextCellIndex, targetGridContainer);
            }
        }
        moveToNext = false, moveToPrevious = false;
        
    }

    element.setAttribute('data-containerOrigin',originCell.parentNode.id);
    element.setAttribute('data-containerTarget',targetCell.parentNode.id);
    element.setAttribute('data-dropped',true);
    setPosition(element, targetCell);
    setTimeout(() => {
        element.setAttribute('data-cell', targetCellIndex);
        targetCell.appendChild(element);
    },150);
}

function setPosition(element, cell){
    let draggableLeft = 6, draggableTop = 10;

    element.style.left = `${cell.offsetLeft+draggableLeft}px`;
    element.style.top = `${cell.offsetTop+draggableTop}px`;
}

/* CREATE A NEW GRID CONTAINER */

function createNewGridContainer(appToBeInserted){
    
    const newGridContainer = document.createElement('div');
    newGridContainer.className = 'grid-container';
    const lastGridContainer = gridContainers[gridContainers.length-1];
    const lastGridContainerId = lastGridContainer.id;
    const newGridContainerIndex = parseInt(lastGridContainerId.substring(lastGridContainerId.length-1))+1;
    newGridContainer.id = 'container' + newGridContainerIndex;
    for(let i = 0; i < 25; i++){
        const newGridCell = document.createElement('div');
        newGridCell.className = 'grid-cell';
        newGridCell.setAttribute('data-cell', i);
        newGridContainer.appendChild(newGridCell);
    }

    lastGridContainer.insertAdjacentElement('afterend', newGridContainer);
    newGridContainer.querySelector(`.grid-cell[data-cell='0']`).appendChild(appToBeInserted);
    /* Ajout d'une nouvelle pagination des conteneurs grilles */
    let circlePagination = document.createElement('div');
    circlePagination.classList.add('circle-pagination');
    circlePagination.id = `cp${newGridContainerIndex}`;
    gridContainerPagination.appendChild(circlePagination);
    

}


