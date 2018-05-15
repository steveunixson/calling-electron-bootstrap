"use strict";

const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const path = require('path')
const request = require('request');
const querystring = require('querystring');
const {ipcMain} = require('electron')
const BrowserWindow = electron.BrowserWindow

//TODO add config
//const config = require('config.json')('./config/app.json');


require('dotenv').config();

var mainWindow = null;

//app.setName(config.productName)

function windowCreate() {
  mainWindow = new BrowserWindow({
    width: 1000, 
    height: 1000,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      defaultEncoding: 'UTF-8'
    }
  });
  if (process.env.PACKAGE === 'true'){
    mainWindow.loadURL(`file://${__dirname}/app/login/index.html`);
    //mainWindow.setMenu(null);

  } else {
   mainWindow.loadURL(`file://${__dirname}/app/login/index.html`);
   mainWindow.webContents.openDevTools();
  }
}

function login() {
  
  var form = {
    username: 'usr',
    password: 'pwd',
    opaque: 'opaque',
    logintype: '1'
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-api-key': 'testkey'
    },
    uri: 'http://localhost:8001/login',
    body: formData,
    method: 'POST'
  }, function (err, res, body) {
    //it works!
  });
}



app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', windowCreate);



