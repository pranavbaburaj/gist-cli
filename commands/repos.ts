import { Octokit } from "@octokit/core";
import axios from "axios";
import { GithubCliException } from "../exception";

export class GithubUserRepos {
    private username:undefined | string;
    private client:Octokit;

    constructor(params:Map<string, string>, octokit:Octokit){
        this.username = params.get("user")
        this.client = octokit

        this.assignUserParameter(this.username)
    }

    private assignUserParameter = async (username:string | undefined):Promise<null | void> => {
        if(username){
            return null
        }

        const { data } = await this.client.request("/user")
        const name = this.username || data.login
        const url = `https://api.github.com/users/${name}/repos`
        axios.get(url).then((data) => {
            const output:Array<Array<string>> = [["Name"]]
            // TODO: Implement the output table
            // TODO: Implement the same functionality for orgs
        }).catch((exception:any) => {
            const error = new GithubCliException({
                message : exception.message
            }).throwException(true)
        })
    }
}