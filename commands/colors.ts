import axios from "axios"

export async function createTextColors(language:string) {
    const url = "https://gist.githubusercontent.com/robertpeteuil/bb2dc86f3b3e25d203664d61410bfa30/raw/bdee444dc2c4a2a5cb4421f3bd0c2e51ac3fd382/github-lang-colors.json"
    const data = await (await axios.get(url)).data
    console.log(data)
}