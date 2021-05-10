import { Octokit } from "@octokit/core";
import axios from "axios";
import { yellow } from "chalk";
import { table } from "table";
import { GithubCliException } from "../exception";
import { GithubRepo } from "./interface";

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
            const output:Array<Array<string>> = [
                ["Name", "private", "Stars", "Language", "License"]
            ]
            const repos:any = data.data
            for(let index=0; index<repos.length; index++){
                const currentRepo = repos[index] as GithubRepo
                output.push([
                    currentRepo.name,
                    yellow(currentRepo.private ? "Yeah" : "No"),
                    currentRepo.stargazers_count,
                    currentRepo.language,
                    currentRepo.license? currentRepo.license.name : "None"
                ])
            }
            console.log(table(output))
        }).catch((exception:any) => {
            const error = new GithubCliException({
                message : exception.message
            }).throwException(true)
        })
    }
}