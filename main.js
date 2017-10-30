import 'babel-polyfill'
import { app, shell, Menu, BrowserWindow } from 'electron'
import { exec } from 'child_process'

const mainWindow

function init () {
  createMainWindow()
}

function createMainWindow () {
  mainWindow = new BrowserWindow({
    width: 700,
    height: 580,
    frame: false
  })
  mainWindow.loadURL('file://' + __dirname + '/app/index.html')

  const template = [
    {
      label: 'Attendant',
      submenu: [
        {
          role: 'about'
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          }
        },
        {
          role: 'reload'
        },
        {
          role: 'quit'
        }
      ]
    }
  ]

  Menu.setApplicationMenu(
    Menu.buildFromTemplate(template)
  )
}

app.on('ready', init)
