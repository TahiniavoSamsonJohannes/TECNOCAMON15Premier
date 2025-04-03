function dateOfToday(){
    let currentDate = new Date();
    let currentTime = document.querySelector('.time');
    let currentTimeNotif = document.querySelector('.notif-time');
    let todayDate = document.querySelector('.notif-date');
    
    /* Date, day, month, year */
    let day = currentDate.getDay();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    
    /* Hour, minute */
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    
    if(hour < 10) {
        hour = "0" + hour;
    }
    if(minute < 10){
        minute = "0" + minute;
    }

    let daysOfTheWeek = ["Dim.","Lun.","Mar.","Mer.","Jeu.","Ven.","Sam."];
    let monthsOfTheYear = ["jan.","fév.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];

    currentTime.innerHTML = hour + ':' + minute;
    currentTimeNotif.innerHTML = hour + ':' + minute;
    todayDate.innerHTML = daysOfTheWeek[day] + ' ' + date + ' ' + monthsOfTheYear[month];

    /* Appel de la fonction toutes les 1 minutes ou 60000 millisecondes */
    setTimeout(dateOfToday,1000);
}
/* CALL THE FUNCTION DATE ON THE LOAD OF THE WINDOW */
window.onload = dateOfToday;