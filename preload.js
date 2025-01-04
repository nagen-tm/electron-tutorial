const os = require('os');
const path = require('path');
const Toastify = require('toastify-js')
const { contextBridge } = require('electron')

// preload allows for npm packages to be used in the renderer
// https://www.electronjs.org/docs/latest/tutorial/tutorial-preload

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir()
})

contextBridge.exposeInMainWorld('path', {
  join:(...args) => path.join(...args)
})

contextBridge.exposeInMainWorld('Toastify', {
  toast: (options) => Toastify(options).showToast()
})