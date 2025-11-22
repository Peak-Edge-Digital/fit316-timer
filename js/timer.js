
class Timer {

    id = null;
    timer = null;
    label = null;
    isActive = false;
    startTime = null;
    intervalId = null;
    elapsedTime = 0

    constructor(id, htmlTemplate, location) {
        this.id = id;
        this.timer = htmlTemplate.cloneNode(true);
        this.label = this.timer.querySelector('label');
        location.appendChild(this.timer);

        this.timer.querySelector('.time').addEventListener('click', () => {
            if (this.isActive) {
                // Pause timer
                this.pauseTimer();
            } else {
                // Start timer
                this.startTimer();
            }
        });

        this.label.addEventListener('input', () => {
            this.setCookie('label', this.label.textContent);
        });

        let cookieStartTime = parseInt(this.getCookie('startTime')),
            cookieIsActive = this.getCookie('isActive'),
            cookiePausedTime = parseInt(this.getCookie('pausedTime')),
            cookieLabel = this.getCookie('label');
        if (cookieLabel !== null) {
            this.label.textContent = cookieLabel;
        }
        if (cookieStartTime !== null) {
            this.startTime = cookieStartTime;
            // Fix errors
            if (isNaN(this.startTime)) {
                this.startTime = null;
            }
            if (cookieIsActive === 'true') {
                this.startTimer(false);
            } else {
                if (!isNaN(cookiePausedTime)) {
                    this.storeElapsedTime(cookiePausedTime);
                    this.updateTime(cookiePausedTime);
                }
            }
        }
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
        this.setCookie('startTime', this.startTime);
        this.setCookie('isActive', this.isActive);
    }

    pauseTimer() {
        this.isActive = false;
        this.timer.classList.remove('active');
        clearInterval(this.intervalId);
        this.storeElapsedTime();
        this.setCookie('isActive', this.isActive);
        this.setCookie('pausedTime', Date.now());
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

    setCookie(name, value) {
        let d = new Date();
        d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = 'fit316_timer_' + this.id + '_' + name + "=" + value + ";" + expires + ";path=/";
    }

    getCookie(name) {
        let varName = 'fit316_timer_' + this.id + '_' + name + "=",
            decodedCookie = decodeURIComponent(document.cookie),
            ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(varName) == 0) {
                return c.substring(varName.length, c.length);
            }
        }
        return null;
    }

}