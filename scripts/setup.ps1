<#
Clone the github repository and get into the 
directory to install dependencies and build
the node js program into an executable
#>
git clone https://github.com/pranavbaburaj/gist-cli.git gist-cli
cd gist-cli

# Install all the packages used in the project
npm install

<#
Install some packages
pkg - For converting a node js application into an executable
based on the operating system

typescript-The typescript package consists of the tsc compiler
used for compiling typescript into javascript
#>
npm install pkg typescript -g

# Compile the source
tsc index.ts --outDir=dist

# Build the source
pkg node/index.js