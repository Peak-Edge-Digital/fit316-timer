document.addEventListener("DOMContentLoaded", function() {

    const timers = [];
    const timerLocation = document.getElementById("timer-wrapper");
    const timerTemplate = document.getElementById("timer-template").content.firstElementChild;
    const addButton = document.getElementById("add-timer");

    // Get existing timers from local storage
    const storedTimers = JSON.parse(localStorage.getItem("timers"));
    if (storedTimers) {
        storedTimers.forEach(timer => {
           let restoredTimer = new Timer(timer.id, timerTemplate, timerLocation, storeTimers, removeTimer);
           restoredTimer.restoreData(timer);
           timers.push(restoredTimer);
        });
    }

    addButton.addEventListener("click", () => {
        timers.push(
            new Timer(timers.length, timerTemplate, timerLocation, storeTimers, removeTimer)
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

    function removeTimer(timerId) {
        const index = timers.findIndex(t => t.id === timerId);
        if (index !== -1) {
            timers.splice(index, 1);
            storeTimers();
        }
    }
});