import electron from 'electron';

export default class ElectronHelper {
  static chooseDirectory = async () => new Promise((resolve) => {
    const { dialog } = electron.remote;
    dialog.showOpenDialog({
      properties: [
        'openDirectory',
      ],
    }, (res) => {
      resolve(res && res[0]); // 我这个是打开单个文件的
    });
  })

  static chooseFile = async () => new Promise((resolve) => {
    const { dialog } = electron.remote;
    dialog.showOpenDialog({
      properties: [
        'openFile',
      ],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      ],
    }, (res) => {
      resolve(res && res[0]); // 我这个是打开单个文件的
    });
  })
}

