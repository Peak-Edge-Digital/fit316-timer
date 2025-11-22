document.addEventListener("DOMContentLoaded", function() {

    const timers = [];
    const timerLocation = document.getElementById("timer-wrapper");
    const timerTemplate = document.getElementById("timer-template").content.firstElementChild;
    const addButton = document.getElementById("add-timer");

    // Get existing timers from local storage
    const storedTimers = JSON.parse(localStorage.getItem("timers"));
    if (storedTimers) {
        storedTimers.forEach(timer => {
           let t = new Timer(timer.id, timerTemplate, timerLocation);
           timers.push(t);
        });
    }

    addButton.addEventListener("click", () => {
        timers.push(
            new Timer(timers.length+1, timerTemplate, timerLocation)
        );
        localStorage.setItem("timers", JSON.stringify(timers));
    });
});