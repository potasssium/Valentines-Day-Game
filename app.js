const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
    Menu.setApplicationMenu(null);
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

   win.webContents.openDevTools();
}

app.whenReady()
  .then(createWindow)
  .catch((error) => {
    console.error("Error during app initialization:", error);
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});