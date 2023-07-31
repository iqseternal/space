import * as fs from 'fs';

export class FileService {
  static mkDir(dir: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, { recursive: true }, err => {
        if (err) {
          reject(false);
          return;
        }

        resolve(true);
      });
    });
  }

  static copyFile(sourceSrc: string, distSrc: string): Promise<{
    ok: boolean; // 状态
    descriptor: string; // 描述
  }> {
    return new Promise(async (resolve, reject) => {
      const distDir = distSrc.substring(0, distSrc.lastIndexOf('\\'));

      if (!fs.existsSync(distDir) && !await FileService.mkDir(distDir)) {
        reject({
          ok: false,
          descriptor: '自动创建目标文件夹失败'
        });

        return;
      }

      if (fs.existsSync(distSrc)) {
        reject({
          ok: false,
          descriptor: '目标文件已经存在'
        });

        return;
      }

      fs.copyFile(sourceSrc, distSrc, (error) => {
        if (error) {
          reject({
            ok: false,
            descriptor: '复制文件出现临时错误'
          });
          return;
        }

        resolve({
          ok: true,
          descriptor: 'ok'
        });
      });
    });
  }

  static saveFile(distSrc: string, bin: BinaryData) {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(distSrc, {
        encoding: 'binary'
      });

      writeStream.write(bin);

      writeStream.on('error', () => {
        writeStream.close();
        reject();
      });

      writeStream.on('finish', () => {
        writeStream.close();
        resolve(distSrc);
      });
    });
  }

  static moveFile() {

  }

  static deleteFile() {

  }

  static findFile() {

  }
}
