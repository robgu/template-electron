import fs from 'fs';
import path from 'path';
import url from 'url';

import electron from 'electron';

const {
  app, BrowserWindow, Menu,
} = electron;

const initMenus = () => {
  const template = [];
  if (process.platform === 'darwin') {
    template.push({
      label: 'Electron',
      submenu: [
        {
          role: 'about',
        },
        {
          type: 'separator',
        },
        {
          role: 'services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          role: 'hide',
        },
        {
          role: 'hideothers',
        },
        {
          role: 'unhide',
        },
        {
          type: 'separator',
        },
        {
          role: 'quit',
        },
      ],
    });
  }

  template.push({
    label: 'File',
    submenu: [
      {
        role: 'reload',
      },
      {
        role: 'forcereload',
      },
      {
        role: 'toggledevtools',
      },
      {
        type: 'separator',
      },
      {
        role: 'resetzoom',
      },
      {
        role: 'zoomin',
      },
      {
        role: 'zoomout',
      },
      {
        type: 'separator',
      },
      {
        role: 'togglefullscreen',
      },
      {
        role: 'minimize',
      },
      {
        role: 'close',
      },
    ],
  });

  const pageRoot = path.resolve(__dirname, 'pages');
  const customItems = [];
  for (const item of fs.readdirSync(pageRoot)) {
    const file = path.resolve(pageRoot, item);
    if (fs.statSync(file).isDirectory()) {
      customItems.unshift({
        label: item,
        click(index, focusedWindow) {
          focusedWindow.loadURL(url.format({
            pathname: path.join(pageRoot, item, 'index.html'),
            protocol: 'file:',
            slashes: true,
          }));
        },
      });
    }
  }

  template.push({
    label: 'Tools',
    submenu: customItems,
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

let mainWindow;
const createWindow = () => {
  if (mainWindow != null) {
    return;
  }

  // Create the browser window.
  mainWindow = new BrowserWindow();

  initMenus();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
app.on('activate', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});
