'use client'
import { Button } from '@/components/ui/button'
import { getMnemonic } from '@/utils/index'
import { mnemonicToSeedSync } from 'bip39';
import React, { useState } from 'react'
import { derivePath } from "ed25519-hd-key";
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from "bs58"
import { Wallet } from '@/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import SOL from "../assets/sol.svg";
import ETH from "../assets/eth.svg";
import Image from 'next/image';


export default function GenerateWallet() {
    const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);
    const [paths, setPaths] = useState<any>({
        '501': 'solana',
        '60': 'etherum'
    });

    const [selectedPath, setSelectedPath] = useState('')
    const [init, setInit] = useState(false)

    const [walletDetails, setWalletDetails] = useState<Wallet[]>([]);

    const handleGenerateWallet = () => {
        let mnemonic: string[] = [];
        if (mnemonicWords.length === 0) {
            mnemonic = getMnemonic();
            setMnemonicWords(mnemonic);
        }

        const wallet = getWalletFromMnemonic(mnemonic.join(" "), walletDetails.length);

        if (wallet) {
            setWalletDetails([...walletDetails, {
                publicKey: wallet.publicKey,
                privateKey: wallet.privateKey,
                mnemonic: mnemonicWords,
            }])
        } else {
            setWalletDetails([]);
        }
    }


    const handleAddNewWallet = () => {
        if (mnemonicWords.length === 0) {
            return;
        } else {
            const wallet = getWalletFromMnemonic(mnemonicWords.join(" "), walletDetails.length);

            if (wallet) {
                setWalletDetails([...walletDetails, {
                    publicKey: wallet.publicKey,
                    privateKey: wallet.privateKey,
                    mnemonic: mnemonicWords,
                }])
            } else {
                setWalletDetails([]);
            }
        }
    }

    const getWalletFromMnemonic = (mnemonicString: string, walletIndex: number) => {
        const seed = mnemonicToSeedSync(mnemonicString);
        const path = `m/44'/${selectedPath}'/0'/${walletIndex}'`; // This is the derivation path
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

        return {
            publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
            privateKey: bs58.encode(secret)
        }
    }

    return (
        <div className='h-full no-scrollbar'>
            {
                !(selectedPath && init) &&
                <div className='h-full w-full flex flex-col items-center pt-[5rem] '>
                    <div className='w-full sm:w-[60%] text-2xl md:text-4xl font-bold text-center'>Khata is a wallet management tool which works on multiple blockchains</div>
                    <div className='w-full sm:w-[60%] text-center text-xs sm:text-base py-[2rem]'>Select the blockchain</div>

                    <Select onValueChange={(value) => setSelectedPath(value)}>
                        <SelectTrigger className="w-full md:w-[380px]">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="501">
                                <div className='flex w-full items-center justify-between gap-2'>
                                    {/* <Image className='w-[2rem] h-[2rem]' src={'../assets/sol.svg'} width={500} height={500} alt={'solana'} /> */}
                                    <Image className='w-[1.5rem] h-[1.5rem]' src={SOL} width={500} height={500} alt={'solana'} />
                                    <span>Solana</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="60">
                                <div className='flex w-full items-center justify-between gap-2'>
                                    <Image className='w-[1.5rem] h-[1.5rem]' src={ETH} width={500} height={500} alt={'solana'} />
                                    <span>Ethereum</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>


                    <Button onClick={() => setInit(true)} className='w-[10rem] mt-[6rem]'>Let&apos;s Go</Button>
                </div>
            }


            {
                (selectedPath && init) &&
                <div>

                    <div>
                        
                        <Button onClick={handleGenerateWallet}>Generate Wallet</Button>
                    </div>
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

                        <div className='my-4 w-full flex items-center justify-between'>
                            <span className='text-xl md:text-3xl font-semibold '>
                                {selectedPath === '501' ? 'Solana ':'Ethereum '} Wallet</span>
                            <Button onClick={handleAddNewWallet}>Add more Wallet</Button>
                        </div>

                        <div className='grid grid-cols-1 h-fit gap-6 md:grid-cols-3'>
                            {
                                walletDetails.map((wallet: Wallet, index: number) => {
                                    return (
                                        <div key={index} className='flex h-fit  rounded-xl border-2 flex-col gap-5' >
                                            <div className='text-3xl font-semibold p-6 border-b-2'>Wallet {index + 1}</div>
                                            <div className='flex flex-col gap-4 px-6 pt-2 pb-6'>
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-base'>Public Key</p>
                                                    <p className='text-gray-500 text-sm'>{wallet.publicKey.slice(0, 30)}...</p>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-base'>Private Key</p>
                                                    <p className='text-gray-500 text-sm'>{wallet.privateKey.slice(0, 35)}...</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            }

        </div >
    )
}
