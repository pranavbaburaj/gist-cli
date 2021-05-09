import { existsSync } from "fs";
import { join } from "path";

export class KeyStorage {
    private static readonly directory:string = join(__dirname, "secrets", "secrets.json")

    public retriveApiKey = ():string | null => {
        return null
    }

    private checkFileExistence = (path:string, file:boolean = true) => {
        try {
            const exists = existsSync(path)
            if(file)
        } catch(exception:any) {
            return false
        }
    }
}