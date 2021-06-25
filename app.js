const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);
const fs = require('fs')

app.use(express.static('public'));

const USERNAMES = process.env.USERNAMES.split(',');
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {

    socket.on('GET', weekID => {
        socket.emit('DATA', {
            weekID: weekID,
            calendar: getCalendar(weekID)
        });
    })

    socket.on('UPDATE', json => {
        updateCalendar(json.weekID, json.calendar);
        io.local.emit('DATA', {
            weekID: json.weekID,
            calendar: getCalendar(json.weekID)
        });
    });
});

server.listen(PORT, () => {
    console.log(`Planning teletravail app listening at port ${PORT}`)
});

function getCalendar(namefile) {
    let storage = {}
    try {
        storage = JSON.parse(fs.readFileSync('var/' + namefile + '.json', 'utf8'));
    } catch (e) {}

    const calendar = {};
    USERNAMES.forEach(name => {
        calendar[name] = storage[name] || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    })
    return calendar;
}

function updateCalendar(weekID, content) {
    fs.writeFileSync('var/' + weekID + '.json', JSON.stringify(content));
}
