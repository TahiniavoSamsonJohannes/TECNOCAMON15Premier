const volume_min = 0, volume_max = parseFloat($(".volume-container-measure").css("height"));
let volume_height = parseFloat($(".volume-level").css("height"));
let volume_level = document.querySelector(".volume-level");
let volumeControlOverlayTimeoutID, isMouseDownOnVolumeControlOverlay = false;
let volumeContainerMeasure = document.querySelector(".volume-container-measure");
let volumeContainerMeasureRect = volumeContainerMeasure.getBoundingClientRect();
let volume_medias_state = $("#volume-medias-state").attr("src");

function volumeUp(){
    showVolumeControlOverlay();

    if(volume_height <= volume_max){
        volume_height += (volume_max*15)/100;
        volume_level.style.height = volume_height+"px";

        if(volume_height > volume_min){
            $("#volume-medias-state").attr("src","icons/Volume/volume_medias.png");
        }

    }
}
function volumeDown(){
    showVolumeControlOverlay();

    if(volume_height > volume_min){
        volume_height -= (volume_max*15)/100;
        volume_level.style.height = volume_height+"px";
    }
    if(volume_height <= volume_min+0.1){
        $("#volume-medias-state").attr("src","icons/Volume/no_volume_medias.png");
        volume_level.style.height = "0px";
    }
}
function ringState(){
    showVolumeControlOverlay();

    let ring_state = $("#ring-state").attr("src");
    if(ring_state === "icons/Volume/ring.png"){
        $("#ring-state").attr("src","icons/Volume/vibrate.png");
        $(".signal-battery img:nth-child(1)").fadeIn(100);
    }else if(ring_state === "icons/Volume/vibrate.png"){
        $("#ring-state").attr("src","icons/Volume/soundless.png");
        $(".signal-battery img:nth-child(1)").attr("src","icons/Barre_detat/soundless_notif.png");
    }else if(ring_state === "icons/Volume/soundless.png"){
        $("#ring-state").attr("src","icons/Volume/ring.png");
        $(".signal-battery img:nth-child(1)").attr("src","icons/Barre_detat/vibrate_notif.png");
        $(".signal-battery img:nth-child(1)").fadeOut(0);
    }
}
function showVolumeControlOverlay(){
    if(volumeControlOverlayTimeoutID){clearTimeout(volumeControlOverlayTimeoutID);}
    $(".volume-control-overlay").addClass("show");
    volumeControlOverlayTimeoutID = setTimeout(function(){$(".volume-control-overlay").removeClass("show");},3000);
}


volumeContainerMeasure.addEventListener("mousedown", function(e){
    isMouseDownOnVolumeControlOverlay = true;
    volumeLevel(e);
});
volumeContainerMeasure.addEventListener("mouseup", function(){
    isMouseDownOnVolumeControlOverlay = false;
});
volumeContainerMeasure.addEventListener("mouseleave", function(){
    isMouseDownOnVolumeControlOverlay = false;
});
volumeContainerMeasure.addEventListener("mousemove", function(e){
    volumeLevel(e);
});

function volumeLevel(event){
    if(isMouseDownOnVolumeControlOverlay){
        if(volumeControlOverlayTimeoutID){clearTimeout(volumeControlOverlayTimeoutID);}
        $(".volume-control-overlay").addClass("show");
        volumeControlOverlayTimeoutID = setTimeout(function(){$(".volume-control-overlay").removeClass("show");},3000);

        volume_height = volumeContainerMeasureRect.top + volumeContainerMeasureRect.height - event.clientY;
        volume_level.style.height = volume_height+"px";
    
        if(volume_height <= volume_min+10){
            $("#volume-medias-state").attr("src","icons/Volume/no_volume_medias.png");
            volume_level.style.height = "0px";
        }else{
            $("#volume-medias-state").attr("src","icons/Volume/volume_medias.png");
        }
    }
}

document.querySelector("#volume-medias-icon").addEventListener("mousedown", (event) => {
    event.stopPropagation();
});
document.querySelector("#volume-medias-icon").addEventListener("click", (event) => {
    event.stopPropagation();
});
document.querySelector("#volume-medias-state").addEventListener("mousedown", (event) => {
    event.stopPropagation();
});
document.querySelector("#volume-medias-state").addEventListener("click", (event) => {
    event.stopPropagation();
    showVolumeControlOverlay();
    if(volume_medias_state === "icons/Volume/volume_medias.png"){
        $("#volume-medias-state").attr("src","icons/Volume/no_volume_medias.png");
        volume_medias_state = $("#volume-medias-state").attr("src");
        volume_level.style.height = "0px";
    }else if(volume_medias_state === "icons/Volume/no_volume_medias.png"){
        $("#volume-medias-state").attr("src","icons/Volume/volume_medias.png");
        volume_medias_state = $("#volume-medias-state").attr("src");
        volume_level.style.height = volume_height+"px";
    }
});
