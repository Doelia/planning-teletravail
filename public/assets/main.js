Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((new Date(this.getFullYear(), this.getMonth(), this.getDate()) - onejan) / 86400000) + onejan.getDay() + 1) / 7);
};
Date.prototype.getLastMonday = function() {
    const prevMonday = new Date(this.valueOf()) || new Date()
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7)
    return prevMonday
};
Date.prototype.addDay = function(i) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + i);
    return date;
}
Date.prototype.getFullMonth = function(i) {
    const m = this.getMonth() + 1;
    return (m < 10) ? '0' + m : m;
}
Date.prototype.getDayName = function() {
    return ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'][this.getDay() - 1];
}

const now = new Date();
const socket = io();

var app = new Vue({
    el: "#app",
    data: {
        calendar: { },
        currentWeekID: '',
        monday: now.getLastMonday(),
    },
    methods: {
        getDay(idx) {
            return this.monday.addDay(idx-1);
        },
        onNewCalendarData: function(weekID, calendar) {
            if (weekID === this.currentWeekID) {
                document.getElementById('app').style.display = 'block';
                this.calendar = calendar;
            }
        },
        leftClick(name, k) {
            this.calendar[name][k] = this.calendar[name][k] === 1 ? 2 : 1;
            socket.emit('UPDATE', {
                weekID: this.currentWeekID,
                calendar: this.calendar,
            });
        },
        rightClick($e, name, k) {
            $e.preventDefault();
            this.calendar[name][k] = this.calendar[name][k] === 0 ? 3 : 0;
            socket.emit('UPDATE', {
                weekID: this.currentWeekID,
                calendar: this.calendar,
            });
        },
        moveWeek(n) {
            this.monday = this.monday.addDay(n * 7);
            this.currentWeekID = this.monday.getFullYear() + '_' + this.monday.getWeek()
            socket.emit('GET', this.currentWeekID);
        }
    }
})

app.moveWeek(0);

socket.on('DATA', (data) => {
    app.onNewCalendarData(data.weekID, data.calendar);
})

