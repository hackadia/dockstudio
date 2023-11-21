"use strict";
const electron = require("electron");
const node_os = require("node:os");
const node_path = require("node:path");
const path = require("path");
const electronUpdater = require("electron-updater");
const isDev = require("electron-is-dev");
const electronStore = require("electron-store");
const ms = require("ms");
const dotenv = require("dotenv");
require("fs/promises");
const os = require("os");
const child_process = require("child_process");
const fs = require("fs");
const AutoLaunch = require("auto-launch");
const sudo = require("sudo-prompt");
const network = require("network");
const util = require("util");
const _$1 = require("lodash");
const uuid = require("uuid");
const net = require("net");
const typesafeI18n = require("typesafe-i18n");
const pingLib = require("ping");
const electronLog = require("electron-log");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k2 in e) {
      if (k2 !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k2);
        Object.defineProperty(n, k2, d.get ? d : {
          enumerable: true,
          get: () => e[k2]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
function getIconPath() {
  let icon2;
  switch (process.platform) {
    case "win32":
      icon2 = path.join(process.env.PUBLIC, "icons/icon.ico");
      break;
    case "darwin":
      icon2 = path.join(process.env.PUBLIC, "icons/icon.ico");
      break;
    case "linux":
      icon2 = path.join(process.env.PUBLIC, "icons/icon.png");
      break;
    default:
      icon2 = path.join(process.env.PUBLIC, "icons/icon.ico");
      break;
  }
  return icon2;
}
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
function update(win2, app) {
  electronUpdater.autoUpdater.autoDownload = store.get("settings").autoUpdate;
  electronUpdater.autoUpdater.disableWebInstaller = false;
  if (isDev)
    electronUpdater.autoUpdater.updateConfigPath = path__namespace.resolve("dev-app-update.yml");
  electronUpdater.autoUpdater.allowDowngrade = false;
  electronUpdater.autoUpdater.fullChangelog = true;
  electronUpdater.autoUpdater.logger = require("electron-log");
  electronUpdater.autoUpdater.setFeedURL({
    provider: "github",
    owner: "hackadia",
    repo: "dockstudio"
  });
  electronUpdater.autoUpdater.on("checking-for-update", function() {
    electronUpdater.autoUpdater.logger.info("checking....");
  });
  electronUpdater.autoUpdater.on("update-available", (arg) => {
    win2.webContents.send("update-can-available", {
      update: true,
      version: app.getVersion(),
      notes: arg.releaseNotes,
      newVersion: arg == null ? void 0 : arg.version
    });
  });
  electronUpdater.autoUpdater.on("update-not-available", (arg) => {
    win2.webContents.send("update-can-available", {
      update: false,
      version: app.getVersion(),
      newVersion: arg == null ? void 0 : arg.version
    });
    electronUpdater.autoUpdater.logger.info("update not found");
  });
  electronUpdater.autoUpdater.on("error", (x2) => {
    electronUpdater.autoUpdater.logger.error(x2.message);
  });
  electronUpdater.autoUpdater.on("update-downloaded", (info) => {
    electronUpdater.autoUpdater.quitAndInstall(false, true);
  });
  electron.ipcMain.handle(EventsKeys.CHECK_UPDATE, async () => {
    if (!app.isPackaged) {
      const error = new Error(
        "The update feature is only available after the package."
      );
      return { message: error.message, error };
    }
    try {
      const update2 = await electronUpdater.autoUpdater.checkForUpdates();
      return { updateInfo: (update2 == null ? void 0 : update2.updateInfo) || null };
    } catch (error) {
      electronUpdater.autoUpdater.logger.error(error.message);
      return { message: "Network error", error, isError: true };
    }
  });
  electron.ipcMain.handle(EventsKeys.START_UPDATE, async (event, args) => {
    startDownload(
      (error, progressInfo) => {
        if (error) {
          event.sender.send(EventsKeys.UPDATE_ERROR, {
            message: error.message,
            error
          });
        } else {
          electronUpdater.autoUpdater.logger.info(progressInfo);
          event.sender.send(EventsKeys.UPDATE_PROGRESS, progressInfo);
        }
      },
      () => electronUpdater.autoUpdater.quitAndInstall(false, true)
    );
  });
  async function checkUpdate() {
    try {
      if (electronUpdater.autoUpdater.autoDownload) {
        electronUpdater.autoUpdater.logger.info("start Checking Update...");
        return await electronUpdater.autoUpdater.checkForUpdates();
      }
    } catch (error) {
      electronUpdater.autoUpdater.logger.error(error.message);
    }
  }
  if (electronUpdater.autoUpdater.autoDownload && !isDev) {
    checkUpdate();
    setInterval(() => {
      electronUpdater.autoUpdater.autoDownload = store.get("settings").autoUpdate;
      checkUpdate();
    }, ms("2h"));
  }
}
function startDownload(callback, complete) {
  electronUpdater.autoUpdater.on("download-progress", (info) => callback(null, info));
  electronUpdater.autoUpdater.on("error", (err) => callback(err, null));
  electronUpdater.autoUpdater.on("update-downloaded", complete);
  electronUpdater.autoUpdater.downloadUpdate().catch((e) => callback(e, null));
}
async function getOverlayIcon(server) {
  return getPublicFilePath(`icons/icon-connected.png`);
}
function getPublicFilePath(filePath) {
  return node_path.join(process.env.PUBLIC, filePath);
}
const k = "aptabase-electron@0.2.2";
async function D(e) {
  const [n, t] = await U();
  return {
    appVersion: e.getVersion(),
    isDebug: !e.isPackaged,
    locale: e.getLocale(),
    osName: n,
    osVersion: t,
    engineName: "Chromium",
    engineVersion: process.versions.chrome,
    sdkVersion: k
  };
}
async function U() {
  switch (process.platform) {
    case "win32":
      return ["Windows", os.release()];
    case "darwin":
      return ["macOS", await E()];
    default:
      return await T();
  }
}
async function E() {
  try {
    return (await new Promise((n, t) => {
      child_process.exec(
        "/usr/bin/sw_vers -productVersion",
        (s, r) => {
          if (s) {
            t(s);
            return;
          }
          n(r);
        }
      );
    })).trim();
  } catch {
    return "";
  }
}
async function T() {
  try {
    const n = (await new Promise((l, a) => {
      fs.readFile(
        "/etc/os-release",
        "utf8",
        (c, i) => {
          if (c) {
            a(c);
            return;
          }
          l(i);
        }
      );
    })).split(`
`), t = {};
    for (const l of n) {
      const [a, c] = l.split("=");
      a && c && (t[a] = c.replace(/"/g, ""));
    }
    const s = t.NAME ?? "Linux", r = t.VERSION_ID ?? "";
    return [s, r];
  } catch {
    return ["Linux", ""];
  }
}
const f = require("crypto");
function S() {
  return f && f.randomUUID ? f.randomUUID() : [
    p(8),
    p(4),
    p(4),
    p(4),
    p(12)
  ].join("-");
}
const y = "abcdefghijklmnopqrstuvwxyz0123456789", _ = y.length;
function p(e) {
  let n = "";
  for (let t = 0; t < e; t++)
    n += y.charAt(Math.floor(Math.random() * _));
  return n;
}
const M = 1 * 60 * 60;
let h = S(), b = /* @__PURE__ */ new Date(), m = "", V = "", o;
const v = {
  US: "https://us.aptabase.com",
  EU: "https://eu.aptabase.com",
  DEV: "http://localhost:3000",
  SH: ""
};
async function R(e, n) {
  if (electron.app.isReady()) {
    console.warn(
      "Aptabase: `initialize` must be invoked before the app is ready. Tracking will be disabled."
    );
    return;
  }
  const t = e.split("-");
  if (t.length !== 3 || v[t[1]] === void 0) {
    console.warn(
      `Aptabase: App Key "${e}" is invalid. Tracking will be disabled.`
    );
    return;
  }
  H(), await electron.app.whenReady(), C(), V = `${F(t[1], n)}/api/v0/event`, o = await D(electron.app), m = e, x();
}
const g = [];
function I(e, n) {
  if (!m || !o)
    return g.push({ eventName: e, props: n }), Promise.resolve();
  let t = /* @__PURE__ */ new Date();
  const s = t.getTime() - b.getTime();
  Math.floor(s / 1e3) > M && (h = S()), b = t;
  const l = {
    timestamp: t.toISOString(),
    sessionId: h,
    eventName: e,
    systemProps: {
      isDebug: o.isDebug,
      locale: o.locale,
      osName: o.osName,
      osVersion: o.osVersion,
      engineName: o.engineName,
      engineVersion: o.engineVersion,
      appVersion: o.appVersion,
      sdkVersion: o.sdkVersion
    },
    props: n
  };
  return new Promise((a) => {
    const c = (u) => {
      console.error("Aptabase: Failed to send event", u), a();
    }, i = electron.net.request({
      method: "POST",
      url: V,
      credentials: "omit"
    });
    i.setHeader("Content-Type", "application/json"), i.setHeader("App-Key", m), i.on("error", c), i.on("abort", c), i.on("response", (u) => {
      u.statusCode >= 300 && console.warn(
        `Aptabase: Failed to send event "${e}": ${u.statusCode} ${u.statusMessage}`
      ), a();
    }), i.write(JSON.stringify(l)), i.end();
  });
}
function x() {
  for (; g.length > 0; ) {
    const e = g.shift();
    e && I(e.eventName, e.props);
  }
}
function H() {
  electron.protocol.registerSchemesAsPrivileged([
    {
      scheme: "aptabase-ipc",
      privileges: {
        bypassCSP: true,
        corsEnabled: true,
        supportFetchAPI: true,
        secure: true
      }
    }
  ]);
}
function C() {
  electron.protocol.registerStringProtocol("aptabase-ipc", (e, n) => {
    var t, s;
    try {
      const r = (s = (t = e.uploadData) == null ? void 0 : t[0]) == null ? void 0 : s.bytes, { eventName: l, props: a } = JSON.parse((r == null ? void 0 : r.toString()) ?? "{}");
      I(l, a);
    } catch (r) {
      console.error("Aptabase: Failed to send event", r);
    }
    n("");
  });
}
function F(e, n) {
  if (e === "SH") {
    if (!(n != null && n.host)) {
      console.warn(
        "Aptabase: Host parameter must be defined when using Self-Hosted App Key. Tracking will be disabled."
      );
      return;
    }
    return n.host;
  }
  return v[e];
}
class DnsService {
  constructor(platform2) {
    this.platform = platform2;
  }
  async setDns(nameServers) {
    return this.platform.setDns(nameServers);
  }
  async getActiveDns() {
    return this.platform.getActiveDns();
  }
  async clearDns() {
    return this.platform.clearDns();
  }
  async getInterfacesList() {
    return this.platform.getInterfacesList();
  }
  async flushDns() {
    return this.platform.flushDns();
  }
}
class Platform {
  execCmd(cmd) {
    return new Promise((resolve, reject) => {
      sudo.exec(cmd, { name: "dockstudio" }, (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });
  }
}
class LinuxPlatform extends Platform {
  async clearDns() {
    try {
      await this.setDns(["1.1.1.1", "8.8.8.8", "192.168.1.1", "127.0.0.1"]);
    } catch (e) {
      throw e;
    }
  }
  async getActiveDns() {
    try {
      const cmd = "grep nameserver /etc/resolv.conf | awk '{print $2}'";
      const text = await this.execCmd(cmd);
      const regex = new RegExp("(?<=nameserver\\s)\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}", "g");
      return text.trim().match(regex);
    } catch (e) {
      throw e;
    }
  }
  async getInterfacesList() {
    return [];
  }
  async setDns(nameServers) {
    try {
      let lines = "";
      for (let i = 0; i < nameServers.length; i++) {
        lines += `nameserver ${nameServers[i]}
`;
      }
      const cmd = `echo '${lines.trim()}' > /etc/resolv.conf`;
      await this.execCmd(cmd);
      const cmdRestart = "systemctl restart systemd-networkd";
      await this.execCmd(cmdRestart);
    } catch (e) {
      throw e;
    }
  }
  async flushDns() {
    try {
      await this.execCmd("systemd-resolve --flush-caches");
    } catch (e) {
      throw e;
    }
  }
}
class WindowsPlatform extends Platform {
  async clearDns() {
    try {
      let networkInterface = store.get("settings").network_interface;
      if (networkInterface == "Auto")
        networkInterface = (await this.getValidateInterface()).name;
      return new Promise((resolve, reject) => {
        sudo.exec(
          `netsh interface ip set dns "${networkInterface}" dhcp`,
          {
            name: "dockstudio"
          },
          (error) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          }
        );
      });
    } catch (e) {
      throw e;
    }
  }
  async getActiveDns() {
    try {
      let networkInterface = store.get("settings").network_interface;
      if (networkInterface == "Auto")
        networkInterface = (await this.getValidateInterface()).name;
      const cmd = `netsh interface ip show dns "${networkInterface}"`;
      const text = await this.execCmd(cmd);
      return this.extractDns(text);
    } catch (e) {
      throw e;
    }
  }
  getInterfacesList() {
    return new Promise((resolve, reject) => {
      network.get_interfaces_list((err, obj) => {
        if (err)
          reject(err);
        else
          resolve(obj);
      });
    });
  }
  async setDns(nameServers) {
    try {
      let networkInterface = store.get("settings").network_interface;
      if (networkInterface == "Auto")
        networkInterface = (await this.getValidateInterface()).name;
      const cmdServer1 = `netsh interface ip set dns "${networkInterface}" static ${nameServers[0]}`;
      await this.execCmd(cmdServer1);
      if (nameServers[1]) {
        const cmdServer2 = `netsh interface ip add dns "${networkInterface}" ${nameServers[1]} index=2`;
        await this.execCmd(cmdServer2);
      }
    } catch (e) {
      throw e;
    }
  }
  async getValidateInterface() {
    try {
      const interfaces = await this.getInterfacesList();
      const activeInterface = interfaces.find(
        (inter) => inter.gateway_ip != null
      );
      if (!activeInterface)
        throw new Error("CONNECTION_FAILED");
      return activeInterface;
    } catch (error) {
      throw error;
    }
  }
  extractDns(input) {
    const regex = /Statically Configured DNS Servers:\s+([\d.]+)\s+([\d.]+)/gm;
    const matches = regex.exec(input) || [];
    if (!matches.length)
      return [];
    return [matches[1].trim(), matches[2].trim()];
  }
  async flushDns() {
    return new Promise((resolve, reject) => {
      sudo.exec(
        `ipconfig /flushdns`,
        {
          name: "dockstudio"
        },
        (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        }
      );
    });
  }
}
const execPromise = util.promisify(child_process.exec);
class MacPlatform extends Platform {
  async clearDns() {
    try {
      await this.setDns(["8.8.8.8", "8.8.4.4"]);
    } catch (e) {
      throw e;
    }
  }
  async getActiveDns() {
    try {
      const { stdout } = await execPromise(
        "scutil --dns | awk '/nameserver/ { print $3 }'"
      );
      return stdout.trim().split("\n");
    } catch (e) {
      throw e;
    }
  }
  async getInterfacesList() {
    return [];
  }
  async setDns(nameServers) {
    try {
      const dnsServers = nameServers.join(" ");
      await execPromise(`networksetup -setdnsservers Wi-Fi ${dnsServers}`);
      try {
        await execPromise(`networksetup -setdnsservers Ethernet ${dnsServers}`);
      } catch (e) {
      }
    } catch (e) {
      throw e;
    }
  }
  async flushDns() {
    try {
      await execPromise("sudo killall -HUP mDNSResponder");
    } catch (e) {
      throw e;
    }
  }
}
let platform;
switch (os.platform()) {
  case "win32":
    platform = new WindowsPlatform();
    break;
  case "linux":
    platform = new LinuxPlatform();
    break;
  case "darwin":
    platform = new MacPlatform();
    break;
  default:
    throw new Error("INVALID_PLATFORM");
}
const dnsService = new DnsService(platform);
const autoLauncher = new AutoLaunch({
  name: electron.app.getName(),
  isHidden: false,
  // show the app on startup
  mac: {
    useLaunchAgent: true
    // use a launch agent instead of a launch daemon (macOS only)
  }
});
electron.ipcMain.handle(EventsKeys.SAVE_SETTINGS, function(event, data) {
  store.set("settings", data);
  return { success: true, data };
});
electron.ipcMain.handle(EventsKeys.TOGGLE_START_UP, async () => {
  let startUp = await autoLauncher.isEnabled();
  if (startUp) {
    await autoLauncher.disable();
    startUp = false;
  } else {
    await autoLauncher.enable();
    startUp = true;
  }
  return startUp;
});
electron.ipcMain.handle(EventsKeys.GET_SETTINGS, async () => {
  const settings = {
    startUp: false,
    ...store.get("settings")
  };
  settings.startUp = await autoLauncher.isEnabled();
  return settings;
});
electron.ipcMain.handle(EventsKeys.TOGGLE_THEME, (_event, data) => {
  electron.nativeTheme.themeSource = data;
  return electron.nativeTheme.shouldUseDarkColors;
});
electron.ipcMain.on(EventsKeys.NOTIFICATION, (_event, data) => {
  notfi("Dock Studio", data);
});
function notfi(title, message) {
  const icon2 = electron.nativeImage.createFromPath(getIconPath());
  new electron.Notification({ title, body: message, icon: icon2 }).show();
}
function isValidDnsAddress(value) {
  return net.isIPv4(value);
}
const locales = [
  "eng",
  "fa",
  "ru"
];
const loadedLocales = {};
const loadedFormatters = {};
const i18n = () => typesafeI18n.i18n(loadedLocales, loadedFormatters);
const initFormatters = (locale) => {
  const formatters = {
    // add your formatter functions here
  };
  return formatters;
};
const eng = {
  pages: {
    home: {
      homeTitle: "Dock Studio",
      connectedHTML: "Connected to <u>{currentActive}</u>",
      connected: "Connected to {currentActive}",
      disconnected: "Disconnected",
      unknownServer: "connected to an unknown server."
    },
    settings: {
      title: "Settings",
      autoRunningTitle: "Automatic execution of the program when the system is turned on",
      langChanger: "Language Changer",
      themeChanger: "Theme"
    },
    addCustomDns: {
      NameOfServer: "Server name",
      serverAddr: "Server address"
    }
  },
  themeChanger: {
    dark: "Dark",
    light: "Light"
  },
  buttons: {
    update: "Update the list",
    favDnsServer: "Adding a custom (DNS) server",
    add: "Add",
    flushDns: "Flush",
    ping: "Ping"
  },
  waiting: "Please wait...",
  disconnecting: "disconnecting...",
  connecting: "connecting...",
  successful: "successful",
  help_connect: "Click to connect",
  help_disconnect: "Click to disconnect",
  dialogs: {
    fetching_data_from_repo: "fetching data from repository...",
    removed_server: "{serverName} was successfully removed from the list.",
    added_server: "Server {serverName} successfully added.",
    flush_successful: "The flush was successful.",
    flush_failure: "The flush failed."
  },
  errors: {
    error_fetching_data: "Error in receiving data from the {target}"
  },
  validator: {
    invalid_dns1: "DNS value 1 is not valid.",
    invalid_dns2: "DNS value 2 is not valid.",
    dns1_dns2_duplicates: "DNS 1 and DNS 2 values must not be duplicates."
  },
  version: "version"
};
const fa = {
  pages: {
    home: {
      homeTitle: "بهترین های رفع تحریم",
      connectedHTML: "شما به  <u>{currentActive}</u> متصل شدید",
      connected: "شما به  {currentActive} متصل شدید",
      disconnected: "قطع شد.",
      unknownServer: "به یک سرور  ناشناخته متصل هستید."
    },
    settings: {
      title: "تنظیمات",
      autoRunningTitle: "اجرا شدن خودکار برنامه با روشن شدن سیستم",
      langChanger: "تغییر زبـان",
      themeChanger: "تغییر پوسته"
    },
    addCustomDns: {
      NameOfServer: "نام سرور",
      serverAddr: "آدرس سرور"
    }
  },
  themeChanger: {
    dark: "تاریک",
    light: "روشـن"
  },
  buttons: {
    update: "بروز رسانی لیست",
    favDnsServer: "افزودن سرور (DNS) دلخواه",
    add: "افزودن",
    flushDns: "پاکسازی (Flush)",
    ping: "پیـنگ سرورها"
  },
  dialogs: {
    fetching_data_from_repo: "درحال دریافت دیتا از مخزن",
    added_server: "سرور {serverName} با موفقیت اضافه شد.",
    removed_server: "سرور {serverName} با موفقیت حذف شد.",
    flush_successful: "پاکسازی با موفقیت انجام شد.",
    flush_failure: "پاکسازی ناموفق بود."
  },
  errors: {
    error_fetching_data: "خطا در دریافت دیتا از {target}"
  },
  connecting: "درحال اتصال...",
  disconnecting: "قطع شدن...",
  waiting: "کمی صبر کنید...",
  successful: "موفقیت آمیز",
  help_connect: "برای اتصال کلیک کنید",
  help_disconnect: "برای قطع اتصال کلیک کنید",
  validator: {
    invalid_dns1: "آدرس سرور 1 نامعتبر است.",
    invalid_dns2: "آدرس سرور 2 نامعتبر است.",
    dns1_dns2_duplicates: "آدرس سرورهای 1 و 2 نباید تکراری باشند."
  },
  version: "نسخه"
};
const ru = {
  pages: {
    home: {
      homeTitle: "Лучшее снятие санкций",
      connectedHTML: "Вы подключены к <u>{currentActive}</u> ",
      connected: "Вы подключены к {currentActive}",
      disconnected: "Прервано",
      unknownServer: "Вы подключены к неизвестному серверу"
    },
    settings: {
      title: "Настройки",
      autoRunningTitle: "Автоматическое выполнение программы при включении системы",
      langChanger: "Изменить язык",
      themeChanger: "менять тему"
    },
    addCustomDns: {
      NameOfServer: "имя сервера",
      serverAddr: "адрес сервера"
    }
  },
  themeChanger: {
    dark: "темный",
    light: "свет"
  },
  buttons: {
    update: "список обновлений",
    favDnsServer: "добавить собственный (DNS) сервер",
    add: "добавлять",
    flushDns: "очистить (Flush)",
    ping: "серверы пингуются"
  },
  dialogs: {
    fetching_data_from_repo: "получение данных из репозитория",
    added_server: "{serverName} сервер успешно добавлен",
    removed_server: "{serverName} сервер успешно удален",
    flush_successful: "очистка успешно завершена",
    flush_failure: "очистка не удалась"
  },
  errors: {
    error_fetching_data: "Ошибка при получении данных от {target}"
  },
  connecting: "подключение...",
  disconnecting: "отключение...",
  waiting: "пожалуйста, подождите...",
  successful: "успешный",
  help_connect: "нажмите, чтобы подключиться",
  help_disconnect: "нажмите, чтобы отключить",
  validator: {
    invalid_dns1: "DNS-значение 1 недопустимо.",
    invalid_dns2: "DNS-значение 2 недопустимо.",
    dns1_dns2_duplicates: "Значения DNS 1 и DNS 2 не должны совпадать."
  },
  version: "версия"
};
const localeTranslations = {
  eng,
  fa,
  ru
};
const loadLocale = (locale) => {
  if (loadedLocales[locale])
    return;
  loadedLocales[locale] = localeTranslations[locale];
  loadFormatters(locale);
};
const loadAllLocales = () => locales.forEach(loadLocale);
const loadFormatters = (locale) => void (loadedFormatters[locale] = initFormatters());
loadAllLocales();
const L = i18n();
function createLogger(logId) {
  return electronLog.create({ logId });
}
const userLogger = createLogger("user");
function updateOverlayIcon(win2, filePath, description) {
  const icon2 = filePath ? electron.nativeImage.createFromPath(filePath) : null;
  win2.setOverlayIcon(icon2, description);
}
electron.ipcMain.handle(EventsKeys.SET_DNS, async (event, server) => {
  try {
    await dnsService.setDns(server.servers);
    const currentLng = L[getCurrentLng()];
    const win2 = electron.BrowserWindow.getAllWindows()[0];
    const filepath = await getOverlayIcon(server);
    updateOverlayIcon(win2, filepath, "connected");
    if (store.get("settings").use_analytic)
      I(`USE_DNS:${server.name}`, {
        servers: server.servers.toString()
      }).catch();
    return {
      server,
      success: true,
      message: currentLng.pages.home.connected({
        currentActive: server.name
      })
    };
  } catch (e) {
    userLogger.error(e.stack, e.message);
    return {
      server,
      success: false,
      message: "Unknown error while connecting"
    };
  }
});
electron.ipcMain.handle(EventsKeys.CLEAR_DNS, async (event, server) => {
  try {
    await dnsService.clearDns();
    const currentLng = L[getCurrentLng()];
    const win2 = electron.BrowserWindow.getAllWindows()[0];
    updateOverlayIcon(win2, null, "disconnect");
    return {
      server,
      success: true,
      message: currentLng.pages.home.disconnected()
    };
  } catch (e) {
    userLogger.error(e.stack, e.message);
    return { server, success: false, message: "Unknown error while clear DNS" };
  }
});
electron.ipcMain.handle(EventsKeys.ADD_DNS, async (event, data) => {
  const nameServer1 = data.servers[0];
  const nameServer2 = data.servers[1];
  const currentLng = L[getCurrentLng()];
  if (!isValidDnsAddress(nameServer1))
    return { success: false, message: currentLng.validator.invalid_dns1 };
  if (nameServer2 && !isValidDnsAddress(nameServer2))
    return { success: false, message: currentLng.validator.invalid_dns2 };
  if (nameServer1.toString() == nameServer2.toString())
    return {
      success: false,
      message: currentLng.validator.dns1_dns2_duplicates
    };
  const newServer = {
    key: data.key || uuid.v4(),
    name: data.name,
    avatar: data.avatar,
    servers: data.servers,
    rate: data.rate || 0,
    tags: data.tags || [],
    isPin: false
  };
  const list = store.get("dnsList") || [];
  const isDupKey = list.find((s) => s.key == newServer.key);
  if (isDupKey)
    newServer.key = uuid.v4();
  list.push(newServer);
  store.set("dnsList", list);
  return { success: true, server: newServer, servers: list };
});
electron.ipcMain.handle(EventsKeys.DELETE_DNS, (ev, server) => {
  const dnsList = store.get("dnsList");
  _$1.remove(dnsList, (dns) => dns.key === server.key);
  store.set("dnsList", dnsList);
  return {
    success: true,
    servers: dnsList
  };
});
electron.ipcMain.handle(
  EventsKeys.RELOAD_SERVER_LIST,
  async (event, servers) => {
    store.set("dnsList", servers);
    return { success: true };
  }
);
electron.ipcMain.handle(EventsKeys.FETCH_DNS_LIST, () => {
  const servers = store.get("dnsList") || [];
  return { success: true, servers };
});
electron.ipcMain.on(EventsKeys.GET_CURRENT_ACTIVE, getCurrentActive);
electron.ipcMain.handle(EventsKeys.GET_CURRENT_ACTIVE, getCurrentActive);
electron.ipcMain.on(EventsKeys.OPEN_BROWSER, (ev, url2) => {
  electron.shell.openExternal(url2);
});
electron.ipcMain.on(
  EventsKeys.DIALOG_ERROR,
  (ev, title, message) => {
    electron.dialog.showErrorBox(title, message);
  }
);
electron.ipcMain.handle(EventsKeys.FLUSHDNS, async function(evet, _2) {
  try {
    await dnsService.flushDns();
    return { success: true };
  } catch {
    return { success: false };
  }
});
electron.ipcMain.handle(EventsKeys.PING, async function(event, server) {
  try {
    const result = await pingLib.promise.probe(server.servers[0], {
      timeout: 10
    });
    return {
      success: true,
      data: {
        alive: result.alive,
        time: result.time
      }
    };
  } catch {
    return {
      success: false
    };
  }
});
electron.ipcMain.handle(EventsKeys.TOGGLE_PIN, async function(event, server) {
  const dnsList = store.get("dnsList");
  const serverStore = dnsList.find((ser) => ser.key === server.key);
  if (serverStore) {
    serverStore.isPin = !serverStore.isPin;
    store.set("dnsList", dnsList);
    return {
      success: true,
      servers: dnsList
    };
  }
});
electron.ipcMain.handle(EventsKeys.GET_NETWORK_INTERFACE_LIST, () => {
  return dnsService.getInterfacesList();
});
function getCurrentLng() {
  return store.get("settings").lng;
}
async function getCurrentActive() {
  try {
    const dns = await dnsService.getActiveDns();
    if (!dns.length)
      return { success: false, server: null };
    const servers = store.get("dnsList") || [];
    const server = servers.find(
      (server2) => server2.servers.toString() == dns.toString()
    );
    if (!server)
      return {
        success: true,
        server: {
          key: "unknown",
          servers: dns,
          names: {
            eng: "unknown",
            fa: "unknown"
          },
          avatar: "",
          isPin: false
        }
      };
    else {
      const win2 = electron.BrowserWindow.getAllWindows()[0];
      const filepath = await getOverlayIcon(server);
      updateOverlayIcon(win2, filepath, "connected");
      return { success: true, server };
    }
  } catch (e) {
    userLogger.error(e.stack, e.message);
    return { success: false, message: "Unknown error while clear DNS" };
  }
}
dotenv.config();
if (isDev)
  Object.defineProperty(electron.app, "isPackaged", {
    get() {
      return true;
    }
  });
process.env.DIST_ELECTRON = node_path.join(__dirname, "../");
process.env.DIST = node_path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL ? node_path.join(process.env.DIST_ELECTRON, "../public") : process.env.DIST;
if (node_os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
let win = null;
const preload = node_path.join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = node_path.join(process.env.DIST, "index.html");
const icon = electron.nativeImage.createFromPath(getIconPath());
R("A-EU-0537046370");
async function createWindow() {
  win = new electron.BrowserWindow({
    title: "Dock Studio",
    icon,
    height: 483,
    width: 743,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: true,
      devTools: isDev
    },
    darkTheme: true,
    resizable: false,
    //center: !isDev, // => false
    show: true,
    alwaysOnTop: isDev,
    movable: true,
    frame: false,
    titleBarStyle: "hidden"
  });
  if (os.platform() == "darwin")
    win.setWindowButtonVisibility(false);
  win.setMenu(null);
  if (url) {
    await win.loadURL(url);
  } else {
    await win.loadFile(indexHtml);
  }
  if (isDev)
    win.webContents.openDevTools();
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.webContents.setWindowOpenHandler(({ url: url2 }) => {
    if (url2.startsWith("https:"))
      electron.shell.openExternal(url2);
    return { action: "deny" };
  });
  let tray = null;
  electron.ipcMain.on("close", function(event) {
    if (!store.get("settings").minimize_tray)
      return electron.app.exit(0);
    event.preventDefault();
    win.setSkipTaskbar(false);
    if (!tray)
      tray = createTray();
    win.hide();
  });
  update(win, electron.app);
  await I(`app_started__${electron.app.getVersion()}`);
  return win;
}
electron.ipcMain.on(EventsKeys.MINIMIZE, () => {
  electron.app.focus();
  win.isMinimized() ? win.focus() : win.minimize();
});
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
electron.ipcMain.handle("open-win", (_2, arg) => {
  const childWindow = new electron.BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
function createTray() {
  const appIcon = new electron.Tray(icon);
  const showIcon = electron.nativeImage.createFromPath(
    getPublicFilePath("icons/show.png")
  );
  const powerIcon = electron.nativeImage.createFromPath(
    getPublicFilePath("icons/power.png")
  );
  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: "Dock Studio",
      enabled: false,
      icon: icon.resize({ height: 19, width: 19 })
    },
    {
      label: "Show",
      icon: showIcon,
      click: function() {
        win.show();
        electron.ipcMain.emit(EventsKeys.GET_CURRENT_ACTIVE);
      }
    },
    {
      label: "Quit Dock Studio",
      icon: powerIcon,
      click: function() {
        electron.app.exit(1);
      }
    }
  ]);
  appIcon.on("double-click", function(event) {
    win.show();
    electron.ipcMain.emit(EventsKeys.GET_CURRENT_ACTIVE);
  });
  appIcon.setToolTip("Dock Studio");
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}
//# sourceMappingURL=index.js.map
