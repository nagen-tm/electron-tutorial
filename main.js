const { app, BrowserWindow, Menu} = require('electron')
const path = require('node:path')

// for any development checks
const isDev = process.env.NODE_ENV !== 'production'
// darwin, win32, linux
const isMac = process.platform === 'darwin'

// can create multiple windows
const createWindow = () => {
  const win = new BrowserWindow({
    width: isDev ? 1000: 500,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // will open devtools if in dev env
  if(isDev){
    win.webContents.openDevTools();
  }
  // for file management, use path to folder 
  win.loadFile(path.join(__dirname, './renderer/index.html'))
}

// example of a second window
function createAboutWindow() {
  const abooutWin = new BrowserWindow({
    width: 300,
    height: 300,
  })

  // for file management, use path to folder 
  abooutWin.loadFile(path.join(__dirname, './renderer/about.html'))
}

// this is what loads the window html file
app.whenReady().then(() => {
  createWindow()

  // implment the menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu)

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
      createWindow()
    }
  })
})

// menu template for the top bar
// for mac, this is where the first item is the product name
// to adjust for that product name for mac specifically is the first set of labels/submenu
// the end label is specifically for windows/linux
const menu = [
  ...isMac ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: createAboutWindow
      }
    ]
  }] : [],
  {
    role: 'fileMenu'
  },
  ...(!isMac ? [
    {
      label: 'Help',
      submenu: [
        {
        label: 'About',
        click: createAboutWindow
        }
      ]
    }
  ]
  : [])
]

// specific platform functionality for quiti
app.on('window-all-closed', () => {
  if(!isMac){
    app.quit()
  }
})