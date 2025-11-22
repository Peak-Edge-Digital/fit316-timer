
class Timer {

    id = null;
    timer = null;
    label = null;
    labelText = null;
    isActive = false;
    startTime = null;
    intervalId = null;
    elapsedTime = 0
    onStateChangeCallback = {};

    constructor(id, htmlTemplate, location, onStateChangeCallback = {}) {
        this.id = id;
        this.timer = htmlTemplate.cloneNode(true);
        this.label = this.timer.querySelector('label');
        this.onStateChangeCallback = onStateChangeCallback;

        // Draw the HTML
        this.draw(location);

        // Add listener for on time click
        this.timer.querySelector('.time').addEventListener('click', () => {
            if (this.isActive) {
                // Pause timer
                this.pauseTimer();
            } else {
                // Start timer
                this.startTimer();
            }
            this.onStateChangeCallback();
        });

        // Add listener for label change
        this.label.addEventListener('blur', () => {
            this.labelText = this.label.textContent;
            this.onStateChangeCallback();
        });

    }

    restoreData(data) {
        this.labelText = data.labelText;
        this.label.textContent = this.labelText;
        this.startTime = data.startTime;
        this.isActive = data.isActive;
        this.elapsedTime = data.elapsedTime;

        if (this.isActive) {
            this.startTimer(false);
        } else {
            this.startTime = Date.now() - this.elapsedTime;
            this.updateTime();
        }
    }

    draw(location) {
        location.appendChild(this.timer);
    }

    startTimer(setStartTime = true) {
        if (setStartTime) {
            if (this.startTime == null) {
                // First time starting the timer
                this.startTime = Date.now();
            } else {
                // Resuming a paused timer
                this.startTime = Date.now() - this.elapsedTime;
            }
        }
        this.isActive = true;
        this.timer.classList.add('active');
        this.intervalId = setInterval(() => {
            this.updateTime();
        }, 40);
    }

    pauseTimer() {
        this.isActive = false;
        this.timer.classList.remove('active');
        clearInterval(this.intervalId);
        this.storeElapsedTime();
    }

    updateTime(givenTime = null) {
        let diffInMs = (givenTime !== null) ? givenTime - this.startTime : Date.now() - this.startTime,
            milliseconds = diffInMs % 1000,
            totalSeconds = Math.floor(diffInMs / 1000),
            seconds = totalSeconds % 60,
            totalMinutes = Math.floor(totalSeconds / 60),
            minutes = totalMinutes % 60,
            hours = Math.floor(totalMinutes / 60);

        this.timer.querySelector('.hours').textContent = String(hours).padStart(2, '0');
        this.timer.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
        this.timer.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
        this.timer.querySelector('.milliseconds').textContent = String(milliseconds).padStart(3, '0');
    }

    storeElapsedTime(time = Date.now()) {
        this.elapsedTime = time - this.startTime;
    }

    isActive() {
        return this.isActive;
    }

}