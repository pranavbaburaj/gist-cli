
export interface GithubUser {
    login : string,
    id : number,
    node_id : string,
    type : string,
}

export interface GithubRepo {
    id : number,
    description : string,
    node_id : string,
    name : string,
    private : boolean,
    owner : GithubUser,
    stargazers_count : number,
    watchers_count: number,
    language : string | null,
    license : any
}