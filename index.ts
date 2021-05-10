import {Octokit} from '@octokit/core';
import {GithubCli} from './arguments/parser';
import {KeySetup} from './setup';
import {KeyStorage} from './store';

/**
 * @exports
 * @function
 * 
 * Returns the api key and if the key doesn't
 * exist, run the setup again
 * 
 * @returns {string} The api key
 */
export function createApiKey() {
  let key = new KeyStorage().retriveApiKey();
  if (!key) {
    const setup = new KeySetup(KeyStorage.directory);
    key = new KeyStorage().retriveApiKey();
  }

  return key;
}

export const github = new Octokit({auth: createApiKey()});
const parser = new GithubCli(github);
