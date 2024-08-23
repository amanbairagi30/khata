'use client'
import { Button } from '@/components/ui/button'
import { getMnemonic } from '@/utils/index'
import { mnemonicToSeedSync } from 'bip39';
import React, { useState } from 'react'
import { derivePath } from "ed25519-hd-key";
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from "bs58"

export default function GenerateWallet() {
    const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
    const [publicKey, setPublicKey] = useState<string>('');
    const [privateKey, setPrivateKey] = useState<string>('');

    const handleGenerateWallet = () => {
        const mnemonic = getMnemonic();
        setMnemonicWords(mnemonic);

        const seed = mnemonicToSeedSync(mnemonic.join(" "));
        // for (let i = 0; i < 4; i++) {
        const path = `m/44'/501'/0'/0'`; // This is the derivation path
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        console.log(derivedSeed);
        setPrivateKey(bs58.encode(secret));
        setPublicKey(Keypair.fromSecretKey(secret).publicKey.toBase58());
        // setPublicKey(secret);
        // }
    }

    return (
        <div>
            <Button onClick={handleGenerateWallet}>Generate Wallet</Button>
            <div className='flex flex-col gap-4 '>
                <div className='grid border-2 mt-4 rounded-md cursor-pointer p-4 grid-cols-2 lg:grid-cols-4 gap-4'>
                    {
                        mnemonicWords.map((item: string, index: number) => {
                            return (
                                <div key={index} className='border-2 rounded-lg h-[4rem] flex items-center justify-center'>{item}</div>
                            )
                        })
                    }
                </div>

                <div className='my-4'>
                    <span className='text-3xl font-semibold '>Solana Wallet</span>
                    {/* <div>Add</div> */}
                </div>

                <div className='flex flex-col gap-5'>
                    <p>Public key : {publicKey}</p>
                    <p>Private key : {privateKey}</p>
                </div>
            </div>
        </div>
    )
}
