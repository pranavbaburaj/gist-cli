import { KeySetup } from "./setup";
import { KeyStorage } from "./store";

function createApiKey() {
    let key = new KeyStorage().retriveApiKey()
    if(!key){
        const setup = new KeySetup(KeyStorage.directory)
        key = new KeyStorage().retriveApiKey()
    }

    return key
}

const key = createApiKey()
console.log(key)