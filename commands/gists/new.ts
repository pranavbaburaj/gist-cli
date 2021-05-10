import { Octokit } from "@octokit/core";
import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import inquirer from "inquirer";
import { join } from "path";
import { GithubCliException } from "../../exception";

interface GistData {
    files : Array<string>,
    directory : Array<string>,
    exclude : Array<string>
}

export function checkFileExistence(path:string, file:boolean = true) {
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
}

function validateGistFiles(files:GistData):Array<Map<string, string>>{
    const includes:Array<Map<string, string>> = new Array<Map<string, string>>()
    for(let index=0; index<files.files.length; index++){
        const filename = files.files[index]
        if(checkFileExistence(filename, true)){
            includes.push(new Map<string, string>([
                [filename, readFileSync(filename).toString()]
            ]))
        } else {
            const error = new GithubCliException({
                message : `${filename} does not exist`
            }).throwException(true)
        }
    }

    // TODO: Correct the directory includes
    for(let idx=0; idx<files.directory.length; idx++){
        const directory = files.directory[idx]
        if(checkFileExistence(directory, false)){
            const directoryContent:Array<string> = readdirSync(directory)
            for(let contentIndex=0; contentIndex<directoryContent.length; contentIndex++){
                if(statSync(join(
                    directory, directoryContent[contentIndex]
                )).isFile()){
                    console.log(directoryContent)
                    includes.push(new Map<string, string>([
                        [directoryContent[contentIndex], readFileSync(directoryContent[contentIndex]).toString()]
                    ]))
                }
            }
        } else {
            const error = new GithubCliException({
                message : `${directory} does not exist`
            }).throwException(true)
        }
    }

    // TODO: Exclude files
    return includes
}

export class CreateGists {
    private readonly options:Array<any> = [
        {type:"input", name:"config", message:"Config file path"}
    ]

    private client:Octokit
    constructor(client:Octokit){
        this.client = client
        this.createQueryPrompt()
    }

    private createQueryPrompt = ():void => {
        inquirer.prompt(this.options).then((response:any) => {
            const filename = response.config
            const exists = checkFileExistence(filename)
            if(exists){
                const data = readFileSync(filename).toString()
                try {
                    const json:GistData = JSON.parse(data) as GistData
                    const validate:Array<Map<string, string>> = validateGistFiles(json)
                    console.log(validate)
                } catch(exception){
                    const error = new GithubCliException({
                        message : exception.info || exception.message
                    }).throwException(true)
                }
            } else {
                const error = new GithubCliException({
                    message : `${filename} does not exist`
                }).throwException(true)
            }
        }).catch((error) => {
            const exception = new GithubCliException({
                message : error
            }).throwException(true)
        })
    }
}