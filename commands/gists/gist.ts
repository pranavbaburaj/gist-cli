import { Octokit } from "@octokit/core";

function createGistPrompt() {
    console.log(":)")
}

export class GithubGists {
    private client:Octokit;

    constructor(params:Map<string, string>, client:Octokit){
        this.client = client

        createGistPrompt()
    }
}