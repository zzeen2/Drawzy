import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'

const useToken = (wallet) => {
    const { contract, account } = wallet
    const [balance, setBalance] = useState('0')
    const [loading, setLoading] = useState(false)
    const [hasClaimed, setHasClaimed] = useState(false)

    // 잔액 조회
    const updateBalance = useCallback(async () => {
        if (!contract || !account) return
        try {
            const balance = await contract.balanceOf(account)
            setBalance(ethers.formatEther(balance))
        } catch (error) {
            console.error("잔액 조회 실패:", error)
        }
    }, [contract, account])

    // 가입 토큰 받았는지 확인
    const checkClaimed = useCallback(async () => {
        if (!contract || !account) return
        try {
            const claimed = await contract.hasClaimedToken(account)
            setHasClaimed(claimed)
        } catch (error) {
            console.error("가입 토큰 확인 실패:", error)
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