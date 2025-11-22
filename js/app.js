document.addEventListener("DOMContentLoaded", function() {

    const timers = [];
    const timerLocation = document.getElementById("timer-wrapper");
    const timerTemplate = document.getElementById("timer-template").content.firstElementChild;

    timers.push(
        new Timer(timers.length+1, timerTemplate, timerLocation)
    );

});