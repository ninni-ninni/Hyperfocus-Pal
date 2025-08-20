const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  startTimer: () => ipcRenderer.send("start-timer"),
  resetTimer: () => ipcRenderer.send("reset-timer"),
  onUpdateTimer: (callback) => ipcRenderer.on("update-timer", (event, value) => callback(value)),
  onTimerFinished: (callback) => ipcRenderer.on("timer-finished", callback)
});