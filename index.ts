import { Octokit } from "@octokit/core";
import { GithubCli } from "./arguments/parser";
import { KeySetup } from "./setup";
import { KeyStorage } from "./store";

export function createApiKey() {
    let key = new KeyStorage().retriveApiKey()
    if(!key){
        const setup = new KeySetup(KeyStorage.directory)
        key = new KeyStorage().retriveApiKey()
    }

    return key
}

export const github = new Octokit({auth : createApiKey()})
const parser = new GithubCli(github)
