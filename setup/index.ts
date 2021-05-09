import { Octokit } from "@octokit/core";
import { writeFileSync } from "fs";
import { prompt, QuestionCollection } from "inquirer";

interface InquirerQueryType {
    type : string,
    name : string
    defualt? : string
    message : string;
}

export class KeySetup {
    private static readonly questions:QuestionCollection<any> = new Array(
        {type:"password", name:"key", message:"Enter the api key"}
    )
    private readonly filename:string;

    constructor(readonly file:string){
        this.filename = file
        this.createQueryPrompt()
    }

    private createQueryPrompt = ():void => {
        prompt(KeySetup.questions).then((solutions) => {
            KeySetup.validateKey(solutions.key, (key:string) => {
                writeFileSync(this.filename, JSON.stringify({
                    key : solutions.key
                }))
            })
        })
    }

    public static validateKey = (key:string, callback:Function):any => {
        const kit = new Octokit({ auth : key})
        const data = kit.request("/user").then((data) => {
            callback(key)
        }).catch((error:any) => {
            console.log("NO")
            process.exit()
        })
    }
}