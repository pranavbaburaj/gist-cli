import { basename, dirname, join, sep } from "path";

console.log(dirname(__filename).split(sep).pop())
console.log(join(basename("E:\dev-cli\test\path.ts"), "hehe"))