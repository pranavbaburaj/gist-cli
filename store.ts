import {existsSync, mkdir, readFileSync, statSync, writeFileSync} from 'fs';
import {join} from 'path';

export class KeyStorage {
  // the location of the secrets file containing
  // the github user tokens
  public static readonly directory: string = join(
    __dirname,
    'secrets',
    'secrets.json'
  );

  /**
   * @public
   * 
   * Get the api key from teh json file fit exists
   * else, return null
   * 
   * @returns {string | null} Returns the key if it exists, else returns null
   */
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

  /**
   * @private
   * 
   * Checks if the path exists and if the path exists,
   * Check if the path is a file based on the
   * parameters and return teh results
   * 
   * @param {string} path The path to check if exists or not
   * @param {boolean} file Whether to check if the path is an actual file
   * @returns {boolean}
   */
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
