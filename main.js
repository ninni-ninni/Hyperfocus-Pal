const { app, BrowserWindow, ipcMain } = require("electron");
let win; 
let timer = 900;
let countdown;

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 650,
    icon: __dirname + "/HyperfocusPal_icon.ico",
    webPreferences: { 
      preload: __dirname + "/preload.js", // 👈 usa il preload
      contextIsolation: true,             // 👈 di default è true, meglio ribadirlo
      nodeIntegration: false              // 👈 niente require diretto nel renderer
    },
  });
  win.removeMenu();
  win.loadFile("index.html");
}

function startTimer() {
  clearInterval(countdown); // stop eventuale vecchio timer
  win.webContents.send("update-timer", timer); // subito aggiorno la UI
  
  countdown = setInterval(() => {
    timer--;
    win.webContents.send("update-timer", timer);

    if (timer <= 0) {
      clearInterval(countdown);
      win.webContents.send("timer-finished"); // avvisa il renderer
    }
  }, 1000);
}

app.whenReady().then(createWindow);

ipcMain.on("start-timer", () => {
  console.log("Ricevuto segnale dal renderer: start-timer");
  startTimer();
});

ipcMain.on("reset-timer", () => {
  timer = 900; // reset a 15 minuti
  clearInterval(countdown);
  win.webContents.send("update-timer", timer); // aggiorna subito la UI
  startTimer();
});

// Chiudi l’app quando tutte le finestre sono chiuse (solo su Windows/Linux)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});