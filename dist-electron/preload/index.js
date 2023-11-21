"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
const os = require("os");
const electronStore = require("electron-store");
var EventsKeys = /* @__PURE__ */ ((EventsKeys2) => {
  EventsKeys2["SET_DNS"] = "dialogs:set-dns";
  EventsKeys2["CLEAR_DNS"] = "dialogs:clear-dns";
  EventsKeys2["ADD_DNS"] = "dialogs:add-dns";
  EventsKeys2["RELOAD_SERVER_LIST"] = "reloadServerList";
  EventsKeys2["FETCH_DNS_LIST"] = "dialogs:fetch_dns_list";
  EventsKeys2["NOTIFICATION"] = "notification";
  EventsKeys2["DIALOG_ERROR"] = "dialogs:d_error";
  EventsKeys2["OPEN_BROWSER"] = "dialogs:open_browser";
  EventsKeys2["GET_CURRENT_ACTIVE"] = "dialogs:get_current_active";
  EventsKeys2["DELETE_DNS"] = "DELETE_DNS";
  EventsKeys2["TOGGLE_THEME"] = "ui:toggleTheme";
  EventsKeys2["GET_SETTINGS"] = "setting:get";
  EventsKeys2["SET_NETWORK_INTERFACE"] = "setting:set_network_interface";
  EventsKeys2["GET_NETWORK_INTERFACE_LIST"] = "setting:get_network_interface_list";
  EventsKeys2["SAVE_SETTINGS"] = "setting:save";
  EventsKeys2["TOGGLE_START_UP"] = "setting:toggleStartUp";
  EventsKeys2["FLUSHDNS"] = "dialogs:flushDns";
  EventsKeys2["PING"] = "dialogs:ping";
  EventsKeys2["TOGGLE_PIN"] = "dialog:togglePin";
  EventsKeys2["CHECK_UPDATE"] = "CHECK_UPDATE";
  EventsKeys2["START_UPDATE"] = "START_UPDATE";
  EventsKeys2["UPDATE_PROGRESS"] = "UPDATE_PROGRESS";
  EventsKeys2["UPDATE_ERROR"] = "UPDATE_ERROR";
  EventsKeys2["CLOSE"] = "close";
  EventsKeys2["MINIMIZE"] = "MINIMIZE_APP";
  return EventsKeys2;
})(EventsKeys || {});
const serversConstant = [
  {
    key: "SHECAN",
    name: "Shecan",
    servers: ["178.22.122.100", "185.51.200.2"],
    avatar: "shecan.png",
    rate: 10,
    tags: ["Gaming", "Web", "Ai"],
    isPin: false
  },
  {
    key: "ELECTRO",
    name: "Electro Team",
    servers: ["78.157.42.100", "78.157.42.101"],
    avatar: "electro.png",
    rate: 9,
    tags: ["Gaming", "Web", "Ai"],
    isPin: false
  },
  {
    key: "RADAR_GAME",
    name: "Radar game",
    servers: ["10.202.10.10", "10.202.10.11"],
    avatar: "radar.png",
    rate: 5,
    tags: ["Gaming"],
    isPin: false
  },
  {
    key: "ClOUD_FLARE",
    name: "Cloudflare",
    servers: ["1.1.1.1", "1.0.0.1"],
    avatar: "cloudflare.png",
    rate: 0,
    tags: ["Web"],
    isPin: false
  }
];
const defaultSetting = {
  lng: "eng",
  autoUpdate: true,
  minimize_tray: false,
  network_interface: "Auto",
  use_analytic: true
};
const store = new electronStore({
  defaults: {
    dnsList: serversConstant,
    settings: defaultSetting
  },
  name: "dockstudioStore_1.9.0"
});
const ipcPreload = {
  setDns: (server) => electron.ipcRenderer.invoke(EventsKeys.SET_DNS, server),
  clearDns: () => electron.ipcRenderer.invoke(EventsKeys.CLEAR_DNS),
  notif: (message) => electron.ipcRenderer.send(EventsKeys.NOTIFICATION, message),
  dialogError: (title, message) => electron.ipcRenderer.send(EventsKeys.DIALOG_ERROR, title, message),
  openBrowser: (url) => electron.ipcRenderer.send(EventsKeys.OPEN_BROWSER, url),
  addDns: (data) => electron.ipcRenderer.invoke(EventsKeys.ADD_DNS, data),
  deleteDns: (server) => electron.ipcRenderer.invoke(EventsKeys.DELETE_DNS, server),
  reloadServerList: (servers) => electron.ipcRenderer.invoke(EventsKeys.RELOAD_SERVER_LIST, servers),
  fetchDnsList: () => electron.ipcRenderer.invoke(EventsKeys.FETCH_DNS_LIST),
  getCurrentActive: () => electron.ipcRenderer.invoke(EventsKeys.GET_CURRENT_ACTIVE),
  getSettings: () => electron.ipcRenderer.invoke(EventsKeys.GET_SETTINGS),
  toggleStartUP: () => electron.ipcRenderer.invoke(EventsKeys.TOGGLE_START_UP),
  flushDns: () => electron.ipcRenderer.invoke(EventsKeys.FLUSHDNS),
  saveSettings: (settings) => electron.ipcRenderer.invoke(EventsKeys.SAVE_SETTINGS, settings),
  ping: (server) => electron.ipcRenderer.invoke(EventsKeys.PING, server),
  checkUpdate: () => electron.ipcRenderer.invoke(EventsKeys.CHECK_UPDATE),
  startUpdate: () => electron.ipcRenderer.invoke(EventsKeys.START_UPDATE),
  on: (string, cb) => electron.ipcRenderer.on(string, cb),
  off: (string, cb) => electron.ipcRenderer.on(string, cb),
  close: () => electron.ipcRenderer.send(EventsKeys.CLOSE),
  minimize: () => electron.ipcRenderer.send(EventsKeys.MINIMIZE),
  togglePinServer: (server) => electron.ipcRenderer.invoke(EventsKeys.TOGGLE_PIN, server)
};
const uiPreload = {
  toggleTheme: (newTheme) => electron.ipcRenderer.invoke(EventsKeys.TOGGLE_THEME, newTheme)
};
const osItems = {
  os: os.platform(),
  getInterfaces: () => electron.ipcRenderer.invoke(EventsKeys.GET_NETWORK_INTERFACE_LIST)
};
const storePreload = {
  get: (key) => store.get(key)
};
electron.contextBridge.exposeInMainWorld("ui", uiPreload);
electron.contextBridge.exposeInMainWorld("ipc", ipcPreload);
electron.contextBridge.exposeInMainWorld("os", osItems);
electron.contextBridge.exposeInMainWorld("storePreload", storePreload);
exports.ipcPreload = ipcPreload;
exports.osItems = osItems;
exports.storePreload = storePreload;
exports.uiPreload = uiPreload;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaGFyZWQvY29uc3RhbnRzL2V2ZW50c0tleXMuY29uc3RhbnQudHMiLCIuLi8uLi9zcmMvc2hhcmVkL2NvbnN0YW50cy9zZXJ2ZXJzLmNvc250YW50LnRzIiwiLi4vLi4vc3JjL3NoYXJlZC9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5nLmNvbnRhbnQudHMiLCIuLi8uLi9zcmMvbWFpbi9zdG9yZS9zdG9yZS50cyIsIi4uLy4uL3NyYy9wcmVsb2FkL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIEV2ZW50c0tleXMge1xyXG4gIFNFVF9ETlMgPSBcImRpYWxvZ3M6c2V0LWRuc1wiLFxyXG4gIENMRUFSX0ROUyA9IFwiZGlhbG9nczpjbGVhci1kbnNcIixcclxuICBBRERfRE5TID0gXCJkaWFsb2dzOmFkZC1kbnNcIixcclxuICBSRUxPQURfU0VSVkVSX0xJU1QgPSBcInJlbG9hZFNlcnZlckxpc3RcIixcclxuICBGRVRDSF9ETlNfTElTVCA9IFwiZGlhbG9nczpmZXRjaF9kbnNfbGlzdFwiLFxyXG4gIE5PVElGSUNBVElPTiA9IFwibm90aWZpY2F0aW9uXCIsXHJcbiAgRElBTE9HX0VSUk9SID0gXCJkaWFsb2dzOmRfZXJyb3JcIixcclxuICBPUEVOX0JST1dTRVIgPSBcImRpYWxvZ3M6b3Blbl9icm93c2VyXCIsXHJcbiAgR0VUX0NVUlJFTlRfQUNUSVZFID0gXCJkaWFsb2dzOmdldF9jdXJyZW50X2FjdGl2ZVwiLFxyXG4gIERFTEVURV9ETlMgPSBcIkRFTEVURV9ETlNcIixcclxuICBUT0dHTEVfVEhFTUUgPSBcInVpOnRvZ2dsZVRoZW1lXCIsXHJcbiAgR0VUX1NFVFRJTkdTID0gXCJzZXR0aW5nOmdldFwiLFxyXG4gIFNFVF9ORVRXT1JLX0lOVEVSRkFDRSA9IFwic2V0dGluZzpzZXRfbmV0d29ya19pbnRlcmZhY2VcIixcclxuICBHRVRfTkVUV09SS19JTlRFUkZBQ0VfTElTVCA9IFwic2V0dGluZzpnZXRfbmV0d29ya19pbnRlcmZhY2VfbGlzdFwiLFxyXG4gIFNBVkVfU0VUVElOR1MgPSBcInNldHRpbmc6c2F2ZVwiLFxyXG4gIFRPR0dMRV9TVEFSVF9VUCA9IFwic2V0dGluZzp0b2dnbGVTdGFydFVwXCIsXHJcbiAgRkxVU0hETlMgPSBcImRpYWxvZ3M6Zmx1c2hEbnNcIixcclxuICBQSU5HID0gXCJkaWFsb2dzOnBpbmdcIixcclxuICBUT0dHTEVfUElOID0gXCJkaWFsb2c6dG9nZ2xlUGluXCIsXHJcbiAgQ0hFQ0tfVVBEQVRFID0gXCJDSEVDS19VUERBVEVcIixcclxuICBTVEFSVF9VUERBVEUgPSBcIlNUQVJUX1VQREFURVwiLFxyXG4gIFVQREFURV9QUk9HUkVTUyA9IFwiVVBEQVRFX1BST0dSRVNTXCIsXHJcbiAgVVBEQVRFX0VSUk9SID0gXCJVUERBVEVfRVJST1JcIixcclxuICBDTE9TRSA9IFwiY2xvc2VcIixcclxuICBNSU5JTUlaRSA9IFwiTUlOSU1JWkVfQVBQXCIsXHJcbn1cclxuIiwiaW1wb3J0IHsgU2VydmVyLCBTZXJ2ZXJTdG9yZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3NlcnZlci5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXJ2ZXJzQ29uc3RhbnQ6IEFycmF5PFNlcnZlclN0b3JlPiA9IFtcclxuICB7XHJcbiAgICBrZXk6IFwiU0hFQ0FOXCIsXHJcbiAgICBuYW1lOiBcIlNoZWNhblwiLFxyXG4gICAgc2VydmVyczogW1wiMTc4LjIyLjEyMi4xMDBcIiwgXCIxODUuNTEuMjAwLjJcIl0sXHJcbiAgICBhdmF0YXI6IFwic2hlY2FuLnBuZ1wiLFxyXG4gICAgcmF0ZTogMTAsXHJcbiAgICB0YWdzOiBbXCJHYW1pbmdcIiwgXCJXZWJcIiwgXCJBaVwiXSxcclxuICAgIGlzUGluOiBmYWxzZSxcclxuICB9LFxyXG4gIHtcclxuICAgIGtleTogXCJFTEVDVFJPXCIsXHJcbiAgICBuYW1lOiBcIkVsZWN0cm8gVGVhbVwiLFxyXG4gICAgc2VydmVyczogW1wiNzguMTU3LjQyLjEwMFwiLCBcIjc4LjE1Ny40Mi4xMDFcIl0sXHJcbiAgICBhdmF0YXI6IFwiZWxlY3Ryby5wbmdcIixcclxuICAgIHJhdGU6IDksXHJcbiAgICB0YWdzOiBbXCJHYW1pbmdcIiwgXCJXZWJcIiwgXCJBaVwiXSxcclxuICAgIGlzUGluOiBmYWxzZSxcclxuICB9LFxyXG4gIHtcclxuICAgIGtleTogXCJSQURBUl9HQU1FXCIsXHJcbiAgICBuYW1lOiBcIlJhZGFyIGdhbWVcIixcclxuICAgIHNlcnZlcnM6IFtcIjEwLjIwMi4xMC4xMFwiLCBcIjEwLjIwMi4xMC4xMVwiXSxcclxuICAgIGF2YXRhcjogXCJyYWRhci5wbmdcIixcclxuICAgIHJhdGU6IDUsXHJcbiAgICB0YWdzOiBbXCJHYW1pbmdcIl0sXHJcbiAgICBpc1BpbjogZmFsc2UsXHJcbiAgfSxcclxuXHJcbiAge1xyXG4gICAga2V5OiBcIkNsT1VEX0ZMQVJFXCIsXHJcbiAgICBuYW1lOiBcIkNsb3VkZmxhcmVcIixcclxuICAgIHNlcnZlcnM6IFtcIjEuMS4xLjFcIiwgXCIxLjAuMC4xXCJdLFxyXG4gICAgYXZhdGFyOiBcImNsb3VkZmxhcmUucG5nXCIsXHJcbiAgICByYXRlOiAwLFxyXG4gICAgdGFnczogW1wiV2ViXCJdLFxyXG4gICAgaXNQaW46IGZhbHNlLFxyXG4gIH0sXHJcbl07XHJcbiIsImltcG9ydCB7IFNldHRpbmdJblN0b3JlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvc2V0dGluZ3MuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZGVmYXVsdFNldHRpbmc6IFNldHRpbmdJblN0b3JlID0ge1xyXG4gIGxuZzogXCJlbmdcIixcclxuICBhdXRvVXBkYXRlOiB0cnVlLFxyXG4gIG1pbmltaXplX3RyYXk6IGZhbHNlLFxyXG4gIG5ldHdvcmtfaW50ZXJmYWNlOiBcIkF1dG9cIixcclxuICB1c2VfYW5hbHl0aWM6IHRydWUsXHJcbn07XHJcbiIsImltcG9ydCBlbGVjdHJvblN0b3JlIGZyb20gXCJlbGVjdHJvbi1zdG9yZVwiO1xyXG5cclxuaW1wb3J0IHsgc2VydmVyc0NvbnN0YW50IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb25zdGFudHMvc2VydmVycy5jb3NudGFudFwiO1xyXG5pbXBvcnQge1xyXG4gIFNldHRpbmdJblN0b3JlLFxyXG4gIFN0b3JlS2V5LFxyXG59IGZyb20gXCIuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zZXR0aW5ncy5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgZGVmYXVsdFNldHRpbmcgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmcuY29udGFudFwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXJTdG9yZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zZXJ2ZXIuaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgc3RvcmUgPSBuZXcgZWxlY3Ryb25TdG9yZTxTdG9yZUtleT4oe1xyXG4gIGRlZmF1bHRzOiB7XHJcbiAgICBkbnNMaXN0OiBzZXJ2ZXJzQ29uc3RhbnQsXHJcbiAgICBzZXR0aW5nczogZGVmYXVsdFNldHRpbmcsXHJcbiAgfSxcclxuICBuYW1lOiBcImRvY2tzdHVkaW9TdG9yZV8xLjkuMFwiLFxyXG59KTtcclxuIiwiLy8gU2VlIHRoZSBFbGVjdHJvbiBkb2N1bWVudGF0aW9uIGZvciBkZXRhaWxzIG9uIGhvdyB0byB1c2UgcHJlbG9hZCBzY3JpcHRzOlxyXG4vLyBodHRwczovL3d3dy5lbGVjdHJvbmpzLm9yZy9kb2NzL2xhdGVzdC90dXRvcmlhbC9wcm9jZXNzLW1vZGVsI3ByZWxvYWQtc2NyaXB0c1xyXG5pbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciB9IGZyb20gXCJlbGVjdHJvblwiO1xyXG5cclxuaW1wb3J0IHsgU2VydmVyLCBTZXJ2ZXJTdG9yZSB9IGZyb20gXCIuLi9zaGFyZWQvaW50ZXJmYWNlcy9zZXJ2ZXIuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IEV2ZW50c0tleXMgfSBmcm9tIFwiLi4vc2hhcmVkL2NvbnN0YW50cy9ldmVudHNLZXlzLmNvbnN0YW50XCI7XHJcbmltcG9ydCB7XHJcbiAgU2V0dGluZ0luU3RvcmUsXHJcbiAgU3RvcmVLZXksXHJcbn0gZnJvbSBcIi4uL3NoYXJlZC9pbnRlcmZhY2VzL3NldHRpbmdzLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgb3MgZnJvbSBcIm9zXCI7XHJcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSBcIi4uL21haW4vc3RvcmUvc3RvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBpcGNQcmVsb2FkID0ge1xyXG4gIHNldERuczogKHNlcnZlcjogU2VydmVyKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoRXZlbnRzS2V5cy5TRVRfRE5TLCBzZXJ2ZXIpLFxyXG4gIGNsZWFyRG5zOiAoKSA9PiBpcGNSZW5kZXJlci5pbnZva2UoRXZlbnRzS2V5cy5DTEVBUl9ETlMpLFxyXG4gIG5vdGlmOiAobWVzc2FnZTogc3RyaW5nKSA9PlxyXG4gICAgaXBjUmVuZGVyZXIuc2VuZChFdmVudHNLZXlzLk5PVElGSUNBVElPTiwgbWVzc2FnZSksXHJcbiAgZGlhbG9nRXJyb3I6ICh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpID0+XHJcbiAgICBpcGNSZW5kZXJlci5zZW5kKEV2ZW50c0tleXMuRElBTE9HX0VSUk9SLCB0aXRsZSwgbWVzc2FnZSksXHJcbiAgb3BlbkJyb3dzZXI6ICh1cmw6IHN0cmluZykgPT4gaXBjUmVuZGVyZXIuc2VuZChFdmVudHNLZXlzLk9QRU5fQlJPV1NFUiwgdXJsKSxcclxuICBhZGREbnM6IChkYXRhOiBQYXJ0aWFsPFNlcnZlcj4pID0+XHJcbiAgICBpcGNSZW5kZXJlci5pbnZva2UoRXZlbnRzS2V5cy5BRERfRE5TLCBkYXRhKSxcclxuICBkZWxldGVEbnM6IChzZXJ2ZXI6IFNlcnZlcikgPT5cclxuICAgIGlwY1JlbmRlcmVyLmludm9rZShFdmVudHNLZXlzLkRFTEVURV9ETlMsIHNlcnZlciksXHJcbiAgcmVsb2FkU2VydmVyTGlzdDogKHNlcnZlcnM6IEFycmF5PFNlcnZlcj4pID0+XHJcbiAgICBpcGNSZW5kZXJlci5pbnZva2UoRXZlbnRzS2V5cy5SRUxPQURfU0VSVkVSX0xJU1QsIHNlcnZlcnMpLFxyXG4gIGZldGNoRG5zTGlzdDogKCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKEV2ZW50c0tleXMuRkVUQ0hfRE5TX0xJU1QpLFxyXG4gIGdldEN1cnJlbnRBY3RpdmU6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZShFdmVudHNLZXlzLkdFVF9DVVJSRU5UX0FDVElWRSksXHJcbiAgZ2V0U2V0dGluZ3M6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZShFdmVudHNLZXlzLkdFVF9TRVRUSU5HUyksXHJcbiAgdG9nZ2xlU3RhcnRVUDogKCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKEV2ZW50c0tleXMuVE9HR0xFX1NUQVJUX1VQKSxcclxuICBmbHVzaERuczogKCkgPT4gaXBjUmVuZGVyZXIuaW52b2tlKEV2ZW50c0tleXMuRkxVU0hETlMpLFxyXG4gIHNhdmVTZXR0aW5nczogKHNldHRpbmdzOiBTZXR0aW5nSW5TdG9yZSkgPT5cclxuICAgIGlwY1JlbmRlcmVyLmludm9rZShFdmVudHNLZXlzLlNBVkVfU0VUVElOR1MsIHNldHRpbmdzKSxcclxuICBwaW5nOiAoc2VydmVyOiBTZXJ2ZXIpID0+IGlwY1JlbmRlcmVyLmludm9rZShFdmVudHNLZXlzLlBJTkcsIHNlcnZlciksXHJcbiAgY2hlY2tVcGRhdGU6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZShFdmVudHNLZXlzLkNIRUNLX1VQREFURSksXHJcbiAgc3RhcnRVcGRhdGU6ICgpID0+IGlwY1JlbmRlcmVyLmludm9rZShFdmVudHNLZXlzLlNUQVJUX1VQREFURSksXHJcbiAgb246IChzdHJpbmc6IHN0cmluZywgY2I6IGFueSkgPT4gaXBjUmVuZGVyZXIub24oc3RyaW5nLCBjYiksXHJcbiAgb2ZmOiAoc3RyaW5nOiBzdHJpbmcsIGNiOiBhbnkpID0+IGlwY1JlbmRlcmVyLm9uKHN0cmluZywgY2IpLFxyXG4gIGNsb3NlOiAoKSA9PiBpcGNSZW5kZXJlci5zZW5kKEV2ZW50c0tleXMuQ0xPU0UpLFxyXG4gIG1pbmltaXplOiAoKSA9PiBpcGNSZW5kZXJlci5zZW5kKEV2ZW50c0tleXMuTUlOSU1JWkUpLFxyXG4gIHRvZ2dsZVBpblNlcnZlcjogKHNlcnZlcjogU2VydmVyU3RvcmUpID0+XHJcbiAgICBpcGNSZW5kZXJlci5pbnZva2UoRXZlbnRzS2V5cy5UT0dHTEVfUElOLCBzZXJ2ZXIpLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVpUHJlbG9hZCA9IHtcclxuICB0b2dnbGVUaGVtZTogKG5ld1RoZW1lOiBzdHJpbmcpID0+XHJcbiAgICBpcGNSZW5kZXJlci5pbnZva2UoRXZlbnRzS2V5cy5UT0dHTEVfVEhFTUUsIG5ld1RoZW1lKSxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBvc0l0ZW1zID0ge1xyXG4gIG9zOiBvcy5wbGF0Zm9ybSgpLFxyXG4gIGdldEludGVyZmFjZXM6ICgpID0+XHJcbiAgICBpcGNSZW5kZXJlci5pbnZva2UoRXZlbnRzS2V5cy5HRVRfTkVUV09SS19JTlRFUkZBQ0VfTElTVCksXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc3RvcmVQcmVsb2FkID0ge1xyXG4gIGdldDogPFQgZXh0ZW5kcyBrZXlvZiBTdG9yZUtleT4oa2V5OiBUKSA9PiBzdG9yZS5nZXQ8VD4oa2V5KSxcclxufTtcclxuXHJcbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoXCJ1aVwiLCB1aVByZWxvYWQpO1xyXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKFwiaXBjXCIsIGlwY1ByZWxvYWQpO1xyXG5jb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkKFwib3NcIiwgb3NJdGVtcyk7XHJcbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoXCJzdG9yZVByZWxvYWRcIiwgc3RvcmVQcmVsb2FkKTtcclxuIl0sIm5hbWVzIjpbIkV2ZW50c0tleXMiLCJpcGNSZW5kZXJlciIsImNvbnRleHRCcmlkZ2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQVksSUFBQSwrQkFBQUEsZ0JBQUw7QUFDTEEsY0FBQSxTQUFVLElBQUE7QUFDVkEsY0FBQSxXQUFZLElBQUE7QUFDWkEsY0FBQSxTQUFVLElBQUE7QUFDVkEsY0FBQSxvQkFBcUIsSUFBQTtBQUNyQkEsY0FBQSxnQkFBaUIsSUFBQTtBQUNqQkEsY0FBQSxjQUFlLElBQUE7QUFDZkEsY0FBQSxjQUFlLElBQUE7QUFDZkEsY0FBQSxjQUFlLElBQUE7QUFDZkEsY0FBQSxvQkFBcUIsSUFBQTtBQUNyQkEsY0FBQSxZQUFhLElBQUE7QUFDYkEsY0FBQSxjQUFlLElBQUE7QUFDZkEsY0FBQSxjQUFlLElBQUE7QUFDZkEsY0FBQSx1QkFBd0IsSUFBQTtBQUN4QkEsY0FBQSw0QkFBNkIsSUFBQTtBQUM3QkEsY0FBQSxlQUFnQixJQUFBO0FBQ2hCQSxjQUFBLGlCQUFrQixJQUFBO0FBQ2xCQSxjQUFBLFVBQVcsSUFBQTtBQUNYQSxjQUFBLE1BQU8sSUFBQTtBQUNQQSxjQUFBLFlBQWEsSUFBQTtBQUNiQSxjQUFBLGNBQWUsSUFBQTtBQUNmQSxjQUFBLGNBQWUsSUFBQTtBQUNmQSxjQUFBLGlCQUFrQixJQUFBO0FBQ2xCQSxjQUFBLGNBQWUsSUFBQTtBQUNmQSxjQUFBLE9BQVEsSUFBQTtBQUNSQSxjQUFBLFVBQVcsSUFBQTtBQXpCREEsU0FBQUE7QUFBQSxHQUFBLGNBQUEsQ0FBQSxDQUFBO0FDRUwsTUFBTSxrQkFBc0M7QUFBQSxFQUNqRDtBQUFBLElBQ0UsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUyxDQUFDLGtCQUFrQixjQUFjO0FBQUEsSUFDMUMsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sTUFBTSxDQUFDLFVBQVUsT0FBTyxJQUFJO0FBQUEsSUFDNUIsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBO0FBQUEsSUFDRSxL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
