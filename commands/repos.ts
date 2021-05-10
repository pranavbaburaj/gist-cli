import { Octokit } from "@octokit/core";
import axios from "axios";
import { hex, italic, yellow, yellowBright } from "chalk";
import { table } from "table";
import { GithubCliException } from "../exception";
import { createLanguageColor } from "./colors";
import { GithubRepo } from "./interface";

export class GithubUserRepos {
    private username:undefined | string;
    private organization? : string
    private client:Octokit;

    constructor(params:Map<string, string>, octokit:Octokit){
        this.username = params.get("user")
        this.organization = params.get("org")
        this.client = octokit

        if(this.username && this.organization){
            console.log(yellowBright(
                `Cannot search for user and organization at the same time.
                 Searching for organization repos`
            ))
        }

        this.assignUserParameter(this.username)
    }

    private assignUserParameter = async (username:string | undefined):Promise<null | void> => {
        const { data } = await this.client.request("/user")
        const name = this.organization || this.username || data.login
        const scope:string  = this.organization? "orgs" : "users"
        const url = `https://api.github.com/${scope}/${name}/repos`
        axios.get(url).then((data) => {
            const output:Array<Array<string>> = [
                ["Name", "private", "Stars", "Language", "License"]
            ]
            const repos:any = data.data
            for(let index=0; index<repos.length; index++){
                const currentRepo = repos[index] as GithubRepo
                let language:string = createLanguageColor(currentRepo.language) || "#FFFFF"
                output.push([
                    italic(currentRepo.name),
                    currentRepo.private ? "Yeah" : "No",
                    currentRepo.stargazers_count,
                    hex(language).bold(currentRepo.language || "Unknown"),
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