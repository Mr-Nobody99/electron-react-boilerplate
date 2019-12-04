import { IpcRenderer, ipcRenderer } from "electron";
declare global{
    interface Window{
        IPC: IpcRenderer;
    }
}
window.IPC = ipcRenderer;