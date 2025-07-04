import React, {useCallback, useEffect, useState} from 'react'
import {BrowserProvider, Contract, ethers} from "ethers"
import LuckyDrawTokenJson from "../../abi/LuckyDrawToken.json"

const NETWORK = {
    chainId : "0xaa36a7",
    name : "sepolia"
}

const useWallet = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [isNetwork, setIsNetwork] = useState(false); 

   const connectWallet = useCallback(async () => {
        if(!window.ethereum) return;
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            const _provider = new BrowserProvider(window.ethereum)
            const _signer = await _provider.getSigner()
            const _account = await _signer.getAddress()

            const _contract = new Contract("0xB9Cb016db7dAd372f104440166D90baBe44EA0DD",LuckyDrawTokenJson.abi, _signer )

            const {chainId} = await _provider.getNetwork();
            const currentChainId = `0x${chainId.toString(16)}`;
            const isCorrectNetwork = currentChainId === NETWORK.chainId;
            setIsNetwork(isCorrectNetwork)

            setProvider(_provider); 
            setSigner(_signer)
            setContract(_contract)
            setAccount(_account)
        } catch (error) {
        }
    },[])

    const checkConnection = useCallback(async () => {
        if (!window.ethereum) return;
        
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await connectWallet();
            }
        } catch (error) {
        }
    }, [connectWallet]);

    useEffect(() => {
        if(!window.ethereum) return;
        
        checkConnection();
        
        const accountsChanged = async (accounts) => {
            if (accounts.length > 0) {
                try {
                    const _provider = new BrowserProvider(window.ethereum);
                    const _signer = await _provider.getSigner();
                    const _account = await _signer.getAddress();
                    
                    const _contract = new Contract("0xB9Cb016db7dAd372f104440166D90baBe44EA0DD", LuckyDrawTokenJson.abi, _signer);
                    
                    const {chainId} = await _provider.getNetwork();
                    const currentChainId = `0x${chainId.toString(16)}`;
                    const isCorrectNetwork = currentChainId === NETWORK.chainId;
                    
                    setProvider(_provider);
                    setSigner(_signer);
                    setContract(_contract);
                    setAccount(_account);
                    setIsNetwork(isCorrectNetwork);
                } catch (error) {
                    setAccount(null);
                    setProvider(null);
                    setSigner(null);
                    setContract(null);
                    setIsNetwork(false);
                }
            } else {
                setAccount(null);
                setProvider(null);
                setSigner(null);
                setContract(null);
                setIsNetwork(false);
            }
        }
        
        const chainChanged = () => {
            window.location.reload();
        }
        
        window.ethereum.on("accountsChanged", accountsChanged)
        window.ethereum.on("chainChanged", chainChanged)
        
        return () => {
            window.ethereum.removeListener("accountsChanged", accountsChanged)
            window.ethereum.removeListener("chainChanged", chainChanged)
        }
    }, [checkConnection])

    const returnValue = {provider, signer, contract, account, isNetwork, connectWallet}
    return returnValue
}

export default useWallet 