$(document).ready(function(){
	$(".phone-btn-power").click(function() {
        /* Recuperer la valeur de l'attribut display */
        var screen = $(".screen").css("display");
        if(screen === "flex") {
            $(".screen").fadeOut(1000).css("display", "none");
        }else{
            $(".screen").fadeIn(500).css("display", "flex");
        }
    });

});

/* PREVENT RESIZE */
window.addEventListener("resize", () => {
    document.body.style.zoom = "100%";
});

window.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.key === "+" || e.key === "-") {
        e.preventDefault();
        document.body.style.zoom = "100%";
    }
});

