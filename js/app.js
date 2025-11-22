document.addEventListener("DOMContentLoaded", function() {

    const timers = [];
    const timerLocation = document.getElementById("timer-wrapper");
    const timerTemplate = document.getElementById("timer-template").content.firstElementChild;
    const addButton = document.getElementById("add-timer");

    // Re-apply body class after DOM content is loaded
    const bodyClass = localStorage.getItem("bodyClass");
    if (bodyClass) {
        document.body.classList.add(bodyClass);
    }

    // Get existing timers from local storage
    const storedTimers = JSON.parse(localStorage.getItem("timers"));
    if (storedTimers) {
        storedTimers.forEach(timer => {
           let restoredTimer = new Timer(timer.id, timerTemplate, timerLocation, storeTimers, removeTimer);
           restoredTimer.restoreData(timer);
           timers.push(restoredTimer);
        });
    }

    // Add new timer when the "Add Timer" button is clicked
    addButton.addEventListener("click", () => {
        timers.push(
            new Timer(timers.length, timerTemplate, timerLocation, storeTimers, removeTimer)
        );
        storeTimers();
    });

    // Toggle style
    document.getElementById('logo').addEventListener("click", () => {
        document.body.classList.toggle("fit316-style");
        document.body.classList.toggle("rsr-style");
        localStorage.setItem("bodyClass", document.body.className);
    });

    /**
     * Store the current state of all timers in local storage.
     */
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

    /**
     * Remove a timer from the UI and local storage.
     * @param timerId
     */
    function removeTimer(timerId) {
        const index = timers.findIndex(t => t.id === timerId);
        if (index !== -1) {
            timers.splice(index, 1);
            storeTimers();
        }
    }
});