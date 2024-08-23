import { generateMnemonic, mnemonicToSeedSync } from "bip39";

export const getMnemonic = (): string[] => {

    const mnemonic = generateMnemonic();
    console.log("Generated Mnemonic:", mnemonic);
    const seed = mnemonicToSeedSync(mnemonic); // convert the mnemonic to seed phrase 
    return mnemonic.split(" ");
}