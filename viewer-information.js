let webinar = {
  spinnerColor: "#000",
  shortId: "",
  textDateformat: "MMM D @ h:mmA z",
  countDownLabels: {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  selector: {
    textDate: ".ss-datetime",
    calendar: ".ss-calendar",
    calendarContainer: ".ss-calendar__container",
    calendarContainerLeft: ".ss-calendar__container-left",
    calendarContainerRight: ".ss-calendar__container-right",
    calendarDate: ".ss-calendar__date",
    calendarDay: ".ss-calendar__day",
    calendarWeekdayMonth: ".ss-calendar__weekday-month",
    calendarTime: ".ss-calendar__time",
    countdown: ".ss-countdown",
    countdownDaysContainer: ".ss-countdown__days-container",
    countdownHoursContainer: ".ss-countdown__hours-container",
    countdownMinutesContainer: ".ss-countdown__minutes-container",
    countdownSecondsContainer: ".ss-countdown__seconds-container",
    countDownSeparator: ".ss-countdown__separator",
    countDownLabel: ".ss-countdown__label",
    countdownDays: ".ss-countdown__days",
    countdownHours: ".ss-countdown__hours",
    countdownMinutes: ".ss-countdown__minutes",
    countdownSeconds: ".ss-countdown__seconds",
  },
  spinner: function () {
    return `<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a"><stop stop-color=${this.spinnerColor} stop-opacity="0" offset="0%"/><stop stop-color=${this.spinnerColor} stop-opacity=".631" offset="63.146%"/><stop stop-color=${this.spinnerColor} offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><g transform="translate(1 1)"><path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2"><animateTransform attributeName="transform" type="rotate" from="0 18 18"  to="360 18 18"  dur="0.9s" repeatCount="indefinite" /></path><circle fill=${this.spinnerColor} cx="36" cy="18" r="1"> <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18"  dur="0.9s" repeatCount="indefinite" /></circle></g></g></svg>`;
  },
  countdownContainer: function () {
    return `<div class=${
      this.selector.countdownDaysContainer.split(".")[1]
    }><span class=${
      this.selector.countdownDays.split(".")[1]
    }>00</span><span class=${this.selector.countDownLabel.split(".")[1]}>${
      this.countDownLabels.days
    }</span></div>

    
    <div class=${
      this.selector.countdownHoursContainer.split(".")[1]
    }><span class=${
      this.selector.countdownHours.split(".")[1]
    }>00</span><span class=${this.selector.countDownLabel.split(".")[1]}>${
      this.countDownLabels.hours
    }</span></div>

    <div class=${
      this.selector.countdownMinutesContainer.split(".")[1]
    }><span class=${
      this.selector.countdownMinutes.split(".")[1]
    }>00</span><span class=${this.selector.countDownLabel.split(".")[1]}>${
      this.countDownLabels.minutes
    }</span></div>

    <div class=${
      this.selector.countdownSecondsContainer.split(".")[1]
    }><span class=${
      this.selector.countdownSeconds.split(".")[1]
    }>00</span><span class=${this.selector.countDownLabel.split(".")[1]}>${
      this.countDownLabels.seconds
    }</span></div>
    `;
  },
  textDateContainers: function () {
    return document.querySelectorAll(this.selector.textDate);
  },
  countdownContainers: function () {
    return document.querySelectorAll(this.selector.countdown);
  },
  calendarContainers: function () {
    return document.querySelectorAll(this.selector.calendar);
  },
  loadContainers: function () {
    const self = this;
    this.textDateContainers() &&
      this.textDateContainers().forEach(function (container) {
        return (container.innerHTML = self.spinner());
      });
    this.countdownContainers() &&
      this.countdownContainers().forEach(function (container) {
        return (container.innerHTML = self.spinner());
      });

    this.calendarContainers() &&
      this.calendarContainers().forEach(function (container) {
        return (container.innerHTML = self.spinner());
      });
  },
  localTimezone: function () {
    dayjs.extend(window.dayjs_plugin_utc);
    dayjs.extend(window.dayjs_plugin_timezone);
    dayjs.extend(window.dayjs_plugin_advancedFormat);
    return dayjs.tz.guess();
  },
  apiUrl: function () {
    return `https://api.joinnow.live/webinars/${
      this.shortId
    }/registration-information?timezone=${this.localTimezone()}`;
  },
  formattedDateTime: function (time, textDateformat) {
    return dayjs(time).tz(this.localTimezone()).format(textDateformat);
  },
  getTimeRemaining: function (endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  },
  updateClock: function (
    endtime,
    daysSpan,
    hoursSpan,
    minutesSpan,
    secondsSpan,
    timeInterval
  ) {
    const time = this.getTimeRemaining(endtime);

    if (time.total <= 0) {
      clearInterval(timeInterval);
      this.countdownContainer();
      return;
    }

    daysSpan.innerHTML = ("0" + time.days).slice(-2);
    hoursSpan.innerHTML = ("0" + time.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + time.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + time.seconds).slice(-2);
  },
  calendarNode: function (req) {
    const upcomingTimes = JSON.parse(req).upcoming_times;
    const self = this;
    this.calendarContainers().forEach(function (clock) {
      clock.innerHTML = ""; // destroy current spinner
      upcomingTimes.forEach(function (upcomingTime) {
        clock.innerHTML += `<div class=${
          self.selector.calendarContainer.split(".")[1]
        }><div class=${
          self.selector.calendarContainerLeft.split(".")[1]
        }><span class=${
          self.selector.calendarDate.split(".")[1]
        }>${self.formattedDateTime(upcomingTime, "MMM")}</span>
        <span class=${
          self.selector.calendarDay.split(".")[1]
        }>${self.formattedDateTime(upcomingTime, "D")}</span></div>
        <div class=${
          self.selector.calendarContainerRight.split(".")[1]
        }><span class=${
          self.selector.calendarWeekdayMonth.split(".")[1]
        }>${self.formattedDateTime(upcomingTime, "dddd: MMMM D")}</span>
        <span class=${
          self.selector.calendarTime.split(".")[1]
        }>${self.formattedDateTime(
          upcomingTime,
          "hh:mm A z"
        )}</span></div></div>`;
      });
    });
  },
  countdownNode: function (req) {
    const endtime = JSON.parse(req).upcoming_times[0];
    const self = this;
    this.countdownContainers().forEach(function (clock) {
      clock.innerHTML = self.countdownContainer();
      const daysSpan = document.querySelector(self.selector.countdownDays);
      const hoursSpan = document.querySelector(self.selector.countdownHours);
      const minutesSpan = document.querySelector(
        self.selector.countdownMinutes
      );
      const secondsSpan = document.querySelector(
        self.selector.countdownSeconds
      );
      let timeInterval = setInterval(
        self.updateClock.bind(self),
        1000,
        endtime,
        daysSpan,
        hoursSpan,
        minutesSpan,
        secondsSpan
      );
      self.updateClock(
        endtime,
        daysSpan,
        hoursSpan,
        minutesSpan,
        secondsSpan,
        timeInterval
      );
    });
  },
  textNode: function (req) {
    const upcomingTime = JSON.parse(req).upcoming_times[0];
    const self = this;
    this.textDateContainers().forEach(function (container) {
      container.innerHTML = self.formattedDateTime(
        upcomingTime,
        self.textDateformat
      );
    });
  },
  errorNode: function () {
    this.textDateContainers() &&
      this.textDateContainers().forEach(function (container) {
        container.innerHTML = "Invalid ID";
      });
    this.countdownContainers() &&
      this.countdownContainers().forEach(function (container) {
        container.innerHTML = "Invalid ID";
      });

    this.calendarContainers() &&
      this.calendarContainers().forEach(function (container) {
        container.innerHTML = "Invalid ID";
      });
  },
  request: function (funcs, err) {
    if (this.shortId === "") {
      err();
      return;
    }
    const request = new XMLHttpRequest();
    request.open("GET", this.apiUrl());
    request.send();
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        // see if the request is ready
        if (this.status === 200) {
          funcs.forEach(function (func) {
            return func(request.responseText);
          });
        } else {
          err();
        }
      }
    };
  },
};

// bind this to the webinar to fix scopes

let textNode = webinar.textNode.bind(webinar);
let errorNode = webinar.errorNode.bind(webinar);
let countdownNode = webinar.countdownNode.bind(webinar);
let calendarNode = webinar.calendarNode.bind(webinar);

// find the element and show a loading spinner until the following loads

// webinar.request(textNode, errorNode);
