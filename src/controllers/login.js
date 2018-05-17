const axios = require('axios')
const config = require('../config/api')
const log = require('../libs/log')(module);
const ipc = require('electron').ipcMain

const electron = require('electron');

const jwt_decode = require('jwt-decode')

const Store = require('electron-store');
const store = new Store();

exports.login = function(){
    
    ipc.on('asynchronous-message', function (event, arg) {
        axios.post('http://localhost:8001/api/login', {
            password: arg.password,
            username: arg.username
          })
          .then(function (response) {
            var username = response.data.welcome
            var token = response.data.token
            store.set('username', username);
            store.set('token', token)
            log.info("Login successful");
            show()
          })
          .catch(function (error) {
            log.error("Login failed");
          });    
    })
    
}

function show(){
    var token = store.get('token')
    var decoded = jwt_decode(token);
    if (decoded.role === 'user'){
        //const modalPath = path.join('file://', __dirname, '../../sections/windows/modal.html')
            let win = new electron.BrowserWindow({ kiosk: true })
            win.on('close', function () { win = null })
            win.loadURL('https://duckduckgo.com/')
            win.setMenu(null);
            win.show()
    }else{
        let win = new electron.BrowserWindow({ width: 1280, height: 820 })
        win.on('close', function () { win = null })
        win.loadURL('https://yandex.ru')
        win.show()
    }
}