// Inter Process Communication
// This file contains the code that will talk with the browser's code.

import { Event, ipcMain } from 'electron';
import setupLocalServer from './localServer/setup';

export enum IPCEvents {
  titlebar_minimize = 'Titlebar_minimize',
  titlebar_maximize = 'Titlebar_maximize',
  titlebar_close = 'Titlebar_close',

  App_startLocalServer = 'App_startLocalServer',
  App_startLocalServerFail = 'App_startLocalServerFail',

  Server_leagueClientLockedChampion = 'Server_leagueClientLockedChampion',
}

export default (browserWindow: Electron.BrowserWindow) => {
  // You can't omit the function between calling the function on the browserWindow object
  // This will cause a parameter from the ipcMain event to be passed into the browserWindow's function throwing errors.
  ipcMain.on(IPCEvents.titlebar_minimize, () => browserWindow.minimize());
  ipcMain.on(IPCEvents.titlebar_maximize, () => browserWindow.maximize());
  ipcMain.on(IPCEvents.titlebar_close, () => browserWindow.close());

  ipcMain.on(IPCEvents.App_startLocalServer, async (event: Event) => {
    try {
      // Sets up the local http server for use
      await setupLocalServer();
    } catch {
      // It can fail if the user declined the firewall prompt or if the port is in use
      event.sender.send(IPCEvents.App_startLocalServerFail);
    }
  });
};
