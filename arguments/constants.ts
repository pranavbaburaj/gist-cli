import {Octokit} from '@octokit/core';
import {platform} from 'os';
import { GithubGists } from '../commands/gists/gist';
import {GithubUserRepos} from '../commands/repos';
import {GithubUserData} from '../commands/user/user';

// the list of all the cli commands
// along with the list of flags associated
// with the command
export const commands: Map<string, Array<string>> = new Map<
  string,
  Array<string>
>([
  ['repos', ['user', 'org']],
  ['user', ['user']],
  ["gists", []]
]);

/**
 * @param command The command to execute
 * @param params The params passed in
 */
export const performCommand = (
  command: string,
  params: Map<string, string>,
  client: Octokit
) => {
  if (command == 'repos') {
    const repos = new GithubUserRepos(params, client);
  } else if (command == 'user') {
    const user = new GithubUserData(params, client);
  } else if(command == "gists"){
    const gists = new GithubGists(params, client)
  }
};
