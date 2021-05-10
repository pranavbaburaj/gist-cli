import { Octokit } from "@octokit/core";
import inquirer from "inquirer";
import { GithubCliException } from "../../exception";
import { CreateGists } from "./new";

const commands:Map<string, Function> = new Map<string,Function>([
   ["Create a new gist", (client:Octokit) => {
       const create = new CreateGists(client)
   }] 
])

function createGistPrompt(queries:any, client:Octokit) {
    inquirer.prompt(queries).then((solutions:any) => {
        const func:Function | undefined = commands.get(solutions.create)
        if(func){
            func(client)
        }
    }).catch((error) => {
        const exception = new GithubCliException({
            message : error.message || error.info
        }).throwException(true)
    })
}

export class GithubGists {
    private client:Octokit;
    private query:any = [
        {
            type : "list",
            name : "create",
            message : "Select one",
            choices : [
                "Create a new gist"
            ]
        }
    ]

    constructor(params:Map<string, string>, client:Octokit){
        this.client = client

        createGistPrompt(this.query, this.client)
    }
}