import { Octokit } from '@octokit/core';
import {platform} from 'os';
import { GithubUserRepos } from '../commands/repos';

// the list of all the cli commands
// along with the list of flags associated
// with the command
export const commands: Map<string, Array<string>> = new Map<
  string,
  Array<string>
>([
    ["repos", ["user"]]
]);

/**
 * @param command The command to execute
 * @param params The params passed in
 */
export const performCommand = (
  command: string,
  params: Map<string, string>,
  client:Octokit
) => {
  if(command == "repos"){
      const repos = new GithubUserRepos(params, client)
  }
};