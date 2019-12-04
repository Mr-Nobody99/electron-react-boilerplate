process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';

declare var MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;
declare var MAIN_WINDOW_WEBPACK_ENTRY: any;

import { app, BrowserWindow } from 'electron';

if (require('electron-squirrel-startup')) {
    app.quit();
}

export class E_Windows{
    private static _main: BrowserWindow | null = null;
    private static _worker: BrowserWindow | null = null;
    
    static get MAIN() { return (this._main as BrowserWindow); }
    static set MAIN(win: BrowserWindow | null) { this._main = win; }

    static get WORKER() { return (this._worker as BrowserWindow); }
    static set WORKER(win: BrowserWindow | null) {this._worker = win; }
}

const createWindow = () => {
    const windowOptions = {
        width: 800,
        height: 600,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    };

    E_Windows.MAIN = new BrowserWindow(windowOptions);
    E_Windows.MAIN.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    E_Windows.MAIN.on('closed', () => { E_Windows.MAIN = null; });
    E_Windows.MAIN.webContents.openDevTools();

};

app.on('ready', createWindow);
app.on('activate', () => { E_Windows.MAIN === null && createWindow(); });
app.on('window-all-closed', () => { process.platform !== 'darwin' && app.quit(); });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// require('./Worker/Worker_Main');