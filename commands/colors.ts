import { readFileSync } from "fs";
import { join } from "path";

// Create the language color based on the language
// passed in as the parameter, data is retrieved from
// [__dirname]/json/data.json
export function createLanguageColor(language:string | null):string | undefined {
    if(!language){
        return undefined
    }
    const path:string = join(__dirname, 'json', "colors.json")
    const data:Buffer = readFileSync(path)
    const json:any = JSON.parse(data.toString())
    const map:Map<string, string> = new Map<string, string>()
    for(const value in json){
        map.set(String(value), json[String(value)])
    }
    return map.get(language)
}