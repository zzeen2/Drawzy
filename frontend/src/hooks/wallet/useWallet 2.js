import React, {useCallback, useEffect, useState} from 'react'
import {BrowserProvider, Contract, ethers} from "ethers"
import LuckyDrawTokenJson from "../../abi/LuckyDrawToken.json"

const NETWORK = {
    chainId : "0xaa36a7",
    name : "sepolia"
}

const useWallet = () => {
    // 상태변수
    const [provider, setProvider] = useState(null); // 이더리움 네트워크 연결
    const [signer, setSigner] = useState(null); // 지갑 서명자
    const [contract, setContract] = useState(null); // 스마트 컨트랙트 인스턴스 
    const [account, setAccount] = useState(null); // 현재 연결된 계정
    const [isNetwork, setIsNetwork] = useState(false); // 올바른 네트워크인지 확인 

    const connectWallet = useCallback(async () => {
        if(!window.ethereum) return;
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            // 메타마스크 연결
            const _provider = new BrowserProvider(window.ethereum)
            const _signer = await _provider.getSigner()
            const _account = await _signer.getAddress()
            console.log("ABI", LuckyDrawTokenJson.abi) //1
            

            // 컨트랙트 연결
            const _contract = new Contract("0x98b0218E9e398545255340f23e8A09264B981806",LuckyDrawTokenJson.abi, _signer )
            
            console.log("생성된 컨트랙트", _contract) //2

            // 네트워크 확인
            const {chainId} = await _provider.getNetwork();
            setIsNetwork(`0x${chainId.toString(16)}` === NETWORK.chainId)

            // 상태 업데이트
            setProvider(_provider); 
            setSigner(_signer)
            setContract(_contract)
            setAccount(_account)
            console.log("지갑 연결 상태", { _provider, _signer, _account, _contract }) //3 
            // 지갑연결할때 자동 기본 토큰 지급
            // try {
            //     const tx = await _contract.claimDefaultToken()
            //     console.log("자동 토큰 지급", tx.hash)
            //     await tx.wait()
            //     alert("지갑 연결 완료! 3 LDT를 받았습니다!")
            // } catch (tokenError) {
            //     console.log("토큰 지급 건너뜀:", tokenError)
            //     alert(" 지갑 연결 완료!")
            // }
        } catch (error) {
            console.error("지갑 연결 실패:", error)
        }
    },[])

    useEffect(() => {
        if(!window.ethereum) return;
        
        // 계정 변경 이벤트
        const accountsChanged = (accounts) => {
            setAccount(accounts[0] || null);
        }
        // 네트워크 변경 감지
        const chainChanged = () => {
            window.location.reload(); // 새로고침 그냥 계정 연결 프로세스를 다시 실행시킬수있게.
        }
        
        // 이벤트 리스너 등록
        window.ethereum.on("accountsChanged", accountsChanged)
        // 체인이 변경되면
        window.ethereum.on("chainChanged", chainChanged)
        // 정리
        return () => { // 컴포넌트가 사라질때 이벤트 리스너도 제거
            window.ethereum.removeListener("accountsChanged", accountsChanged)
            window.ethereum.removeListener("chainChanged", chainChanged)
        }
        }, [])

    const returnValue = {provider, signer, contract, account, isNetwork, connectWallet}
    console.log("returnValue", returnValue)
    return returnValue
}



export default useWallet