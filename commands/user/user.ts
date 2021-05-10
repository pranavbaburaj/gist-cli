import { Octokit } from "@octokit/core";
import axios, { AxiosResponse } from "axios";
import boxen from "boxen";
import { bold, cyan } from "chalk";
import { GithubCliException } from "../../exception";

interface User {
    // The login or the username
    login : string
    // the id of the user
    id : number
    // The url of the user avatar
    avatar_url : string
    html_url : string
    // the name of the user
    name : string | null
    // the user company
    company : string | null
    // wensite url 
    blog : string | null
    // user location
    location : string | null
    email : string | null
    hireable : boolean | null
    bio : string | null
    twitter_username : string | null,
    public_repos : number
    public_gists : number
    followers : number
    following : number
}

export class GithubUserData {
    private username?:string
    private client:Octokit

    constructor(params:Map<string, string>, client:Octokit){
        this.username = params.get("user")
        this.client = client

        this.createUserCards()
    }

    private createUserCards = async ():Promise<void> => {
        const { data } = await this.client.request("/user")
        const username = this.username || data.login
        axios.get(`https://api.github.com/users/${username}`).then((response:AxiosResponse<any>) => {
            const data = response.data as User
            const output:string = boxen([
                `${cyan("User")}     : ${bold(data.login)}`,
                `${cyan("Name")}     : ${bold(data.name || '[No Name]')}`,
                `${cyan("Company")}  : ${bold(data.company || "None")}`,
                `${cyan("Bio")}      : ${bold(data.bio || "")}`,
                `${cyan("Location")} : ${bold(data.location || "")}`,
                `${cyan("Website")}  : ${bold(data.blog)}`,
                `${cyan("Email")}    : ${bold(data.email || "[No email]")}`,
                `${cyan("Twitter")}  : ${bold(data.twitter_username || "None")}`,
                `${cyan("Hireable")} : ${bold(data.hireable || "[Not mentioned]")}`,
                `${cyan("Repos")}    : ${bold(data.public_repos)}`,
                `${cyan("Gists")}    : ${bold(data.public_gists)}`,
                `${cyan("Followers")}: ${bold(data.followers)}`,
                `${cyan("Following")}: ${bold(data.following)}`
            ].join("\n"), {
                margin: 1,
                float: 'center',
                padding: 1,
                borderStyle: 'single',
                borderColor: 'cyan',
              })
            console.log(output)
        }).catch((exception:any) => {
            const error = new GithubCliException({
                message : exception.message || exception.info
            }).throwException(true)
        })
    }
}