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
            if(KeySetup.validateKey(solutions.key)){
                writeFileSync(this.filename, JSON.stringify({
                    key : solutions.key
                }))
            }
        })
    }

    public static validateKey = (key:string):any => {
        const kit = new Octokit({ auth : key})
        const data = kit.request("/user").then((data) => {
        }).catch((error:any) => {
            process.exit()
        })
        return true
    }
}