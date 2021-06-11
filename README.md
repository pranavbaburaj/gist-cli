# Gist CLI
> The project is no longer developed

Create gists from the command line

## How to get started

```sh
# clone the github repository
git clone https://github.com/pranavbaburaj/gist-cli.git gist-cli

# get into the folder
cd gist-cli
npm install
npm install pkg typescript -g
tsc index.ts --outDir=dist
pkg node/index.js
```

## Commands

Run the `gist-cli` to run the setup. Create a new token from the developer settings and pass in as the key

```
gist-cli
```

```sh
# --user is optional. The user parameter
# is set to your current username by default
gist-cli repos --user=<username>
# or
gist-cli user --org=<orgname>
```

```sh
# for users
gist-cli user --user=<username(optional)>
```

### Create a new gist

Create a json file with all the information about the gist

```json
{
  "files": [
  ],
  "directory": [
  ]
}
```

```sh
gist-cli new
```

And pass in the json filename in the prompt
