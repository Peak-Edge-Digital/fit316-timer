document.addEventListener("DOMContentLoaded", function() {

    const timers = [];
    const timerLocation = document.getElementById("timer-wrapper");
    const timerTemplate = document.getElementById("timer-template").content.firstElementChild;
    const addButton = document.getElementById("add-timer");

    // Get existing timers from local storage
    const storedTimers = JSON.parse(localStorage.getItem("timers"));
    if (storedTimers) {
        storedTimers.forEach(timer => {
           let restoredTimer = new Timer(timer.id, timerTemplate, timerLocation, storeTimers);
           restoredTimer.restoreData(timer);
           timers.push(restoredTimer);
        });
    }

    addButton.addEventListener("click", () => {
        timers.push(
            new Timer(timers.length, timerTemplate, timerLocation, storeTimers)
        );
        storeTimers();
    });

    function storeTimers() {
        const timerData = timers.map(t => ({
            id: t.id,
            labelText: t.labelText,
            startTime: t.startTime,
            isActive: t.isActive,
            elapsedTime: t.elapsedTime,
            pausedTime: t.pausedTime
        }));
        localStorage.setItem("timers", JSON.stringify(timerData));
    }
});