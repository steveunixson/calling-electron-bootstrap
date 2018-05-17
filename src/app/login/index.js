const ipc = require('electron').ipcRenderer
const asyncMsgBtn = document.getElementById('submit-btn')


asyncMsgBtn.addEventListener('click', function () {
    
    var username = document.getElementById('inputUserName').value
    var password = document.getElementById('inputPassword').value

    var data = {
        "username" : username,
        "password" : password
    }

    ipc.send('asynchronous-message', data)
    
})

