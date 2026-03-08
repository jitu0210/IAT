const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    },
  });

  if (!app.isPackaged) {
    // Dev mode: local Vite dev server
    win.loadURL("http://localhost:5173").catch(err => console.error(err));
    win.webContents.openDevTools();
  } else {
    // Production: load offline build if exists
    win.loadFile(path.join(__dirname, "Frontend", "build", "index.html"))
       .catch(err => {
         console.error("Failed to load local build, fallback to Vercel:", err);
         win.loadURL("https://iat-frontend.vercel.app/");
       });
  }
}

app.whenReady().then(() => {
  createWindow();
  if (app.isPackaged) autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox({
    message: "Update ready. Restart now?",
    buttons: ["Restart", "Later"]
  }).then(result => {
    if (result.response === 0) autoUpdater.quitAndInstall();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});


// const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
// const path = require("path");

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       contextIsolation: true,
//       nodeIntegration: false
//     },
//   });

//   if (!app.isPackaged) {
//     win.loadURL("https://iat-frontend.vercel.app/");
//   } else {
//     win.loadFile(path.join(__dirname, "frontend", "build", "index.html"));
//   }
// }

// app.whenReady().then(() => {
//   createWindow();
//   if (app.isPackaged) autoUpdater.checkForUpdatesAndNotify();
// });

// autoUpdater.on("update-downloaded", () => {
//   dialog.showMessageBox({
//     message: "Update ready. Restart now?",
//     buttons: ["Restart", "Later"]
//   }).then(result => {
//     if (result.response === 0) autoUpdater.quitAndInstall();
//   });
// });

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });
