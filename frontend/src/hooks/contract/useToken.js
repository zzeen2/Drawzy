import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'

const useToken = (wallet) => {
    const { contract, account } = wallet
    const [balance, setBalance] = useState('0')
    const [loading, setLoading] = useState(false)
    const [hasClaimed, setHasClaimed] = useState(false)

    // 잔액 조회
    const updateBalance = useCallback(async () => {
        if (!contract || !account) {
            console.log("잔액 조회 불가: contract 또는 account 없음", { contract: !!contract, account: !!account })
            return
        }
        
        try {
            console.log("잔액 조회 시작:", { contract: contract.target, account })
            const balanceWei = await contract.balanceOf(account)
            console.log("잔액 조회 성공 (Wei):", balanceWei.toString())
            
            // Wei를 Ether로 변환 (LDT는 18 decimals)
            const balanceEther = ethers.formatEther(balanceWei)
            console.log("잔액 조회 성공 (Ether):", balanceEther)
            
            setBalance(balanceEther)
        } catch (error) {
            console.error("잔액 조회 실패:", error)
            setBalance('0')
        }
    }, [contract, account])

    // 가입 토큰 받았는지 확인
    const checkClaimed = useCallback(async () => {
        if (!contract || !account) {
            console.log("가입 토큰 확인 불가: contract 또는 account 없음")
            return
        }
        
        try {
            console.log("가입 토큰 확인 시작:", account)
            const claimed = await contract.hasClaimedToken(account)
            console.log("가입 토큰 확인 결과:", claimed)
            setHasClaimed(claimed)
        } catch (error) {
            console.error("가입 토큰 확인 실패:", error)
            setHasClaimed(false)
        }
    }, [contract, account])

    // 가입 토큰 받기
    const getInitialTokens = async () => {
        if (!contract || !account) return
        setLoading(true)
        try {
            const tx = await contract.claimDefaultToken()
            console.log("토큰 받기 트랜잭션:", tx.hash)
            await tx.wait()
            alert("3 LDT를 받았습니다!")
            updateBalance()
            checkClaimed()
        } catch (error) {
            console.error("토큰 받기 실패:", error)
            alert("토큰 받기 실패: " + error.message)
        }
        setLoading(false)
    }

    // 지갑이 연결되면 자동으로 잔액과 상태 확인
    useEffect(() => {
        if (contract && account) {
            updateBalance()
            checkClaimed()
        }
    }, [contract, account, updateBalance, checkClaimed])

    return {
        balance,
        loading,
        hasClaimed,
        getInitialTokens,
        updateBalance
    }
}

export default useToken 