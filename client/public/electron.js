const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.loadURL(`https://localhost:3000')}`
    );
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});