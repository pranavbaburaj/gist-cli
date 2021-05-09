import {existsSync, mkdir, readFileSync, statSync, writeFileSync} from 'fs';
import {join} from 'path';

export class KeyStorage {
  public static readonly directory: string = join(
    __dirname,
    'secrets',
    'secrets.json'
  );

  public retriveApiKey = (): string | null => {
    const exists = this.checkFileExistence(KeyStorage.directory);
    if (!exists) {
      mkdir(
        join(__dirname, 'secrets'),
        (error: NodeJS.ErrnoException | null) => {
          if (error) {
            throw error;
          }
        }
      );
      writeFileSync(KeyStorage.directory, JSON.stringify({}));
      return null;
    }
    const data: Buffer = readFileSync(KeyStorage.directory);
    try {
      const json: any = JSON.parse(data.toString());
      return json.key;
    } catch (error: any) {
      return null;
    }
  };

  private checkFileExistence = (path: string, file: boolean = true) => {
    try {
      const exists = existsSync(path);
      if (file) {
        const isFile: boolean = statSync(path).isFile();
        return exists && isFile;
      }
      return exists;
    } catch (exception: any) {
      return false;
    }
  };
}
