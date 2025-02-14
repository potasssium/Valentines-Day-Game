const { app, BrowserWindow } = require("electron");

function createWindow() {
    const win = new BrowserWindow({
        width: 910,
        height: 570,
        maxWidth: 1280,
        maxHeight: 720,
        scale: 0.7,
        webPreferences: {
            nodeIntegration: true, // Allow Kaboom to work in Electron
            contextIsolation: false
        }
    });

    win.loadFile("index.html"); // Load the game

   // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});