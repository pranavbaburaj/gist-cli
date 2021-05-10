import {Octokit} from '@octokit/core';
import {argv} from 'process';
import {GithubCliException} from '../exception';
import {commands, performCommand} from './constants';

export class GithubCli {
  private readonly arguments: Array<string>;
  private readonly length: number;
  private command: string;

  private position: number = 0;
  private client: Octokit;

  /**
   * @constructor
   * @param {Array<string> | undefined} args The list of command arguments
   */
  constructor(github: Octokit, args?: Array<string>) {
    this.arguments = args == undefined ? argv : args;
    this.length = this.arguments.length;
    this.client = github;

    if (this.length > 0) {
      this.arguments = this.arguments.slice(2);
      this.command = this.arguments[0];
      this.arguments = this.arguments.slice(1);
      this.length = this.arguments.length;

      this.parseCommandArguments();
    } else {
      process.exit();
    }
  }

  /**
   * @public
   *
   * parse all the command arguments and
   * gather all the params by parsing through
   * the flags and values
   */
  public parseCommandArguments = (): void | null => {
    console.log(this.arguments);
    let current: string | null = this.currentArgument();
    let commandParams: Map<string, string> = new Map<string, string>();
    while (current != null) {
      if (!current.startsWith('--')) {
        const exception = new GithubCliException({
          message: `Invalid flag - ${current} ❎`,
          suggestion: 'User -- in the beginning of the option',
        }).throwException(true);
      }

      const commandArguments = current.split('=');
      if (commandArguments.length != 2) {
        const exception = new GithubCliException({
          message: 'Expected assignment 😦',
          suggestion: 'Try assigning values : --<flag>=<value>',
        }).throwException(true);
      }

      commandArguments[0] = commandArguments[0].slice(2);
      commandParams.set(commandArguments[0], commandArguments[1]);
      this.position += 1;
      current = this.currentArgument();
    }

    this.validateParameters(this.command, commandParams);
  };

  /**
   * @private
   *
   * Validate all the parameters and run the command
   * with the parameters :slight_smile:
   *
   * @param command The command
   * @param params The params
   * @returns
   */
  private validateParameters = (
    command: string,
    params: Map<string, string>
  ): void | null => {
    if (!Array.from(commands.keys()).includes(command)) {
      const exception = new GithubCliException({
        message: `Invalid command - ${command}`,
      }).throwException(true);

      return null;
    }

    const flags = commands.get(command);
    if (flags) {
      const paramKeys = Array.from(params.keys());
      for (let paramIndex = 0; paramIndex < paramKeys.length; paramIndex++) {
        if (!flags.includes(paramKeys[paramIndex])) {
          const exception = new GithubCliException({
            message: `Invalid flag ${paramKeys[paramIndex]} for ${command}`,
            suggestion: `Valid flags - ${flags.join(', ')}`,
          }).throwException(true);
          return null;
        }
      }

      performCommand(command, params, this.client);
    } else {
      process.exit();
    }
  };

  /**
   * @private
   *
   * Get the current character or return null
   * if reached the end of the array
   *
   * @returns {string | null} Current character or null
   */
  private currentArgument = (): string | null => {
    if (this.length == this.position) {
      return null;
    } else {
      return this.arguments[this.position];
    }
  };
}
