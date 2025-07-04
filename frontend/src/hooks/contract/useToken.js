import { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'

const useToken = (wallet) => {
    const { contract, account } = wallet
    const [balance, setBalance] = useState('0')
    const [loading, setLoading] = useState(false)
    const [hasClaimed, setHasClaimed] = useState(false)

    const updateBalance = useCallback(async () => {
        if (!contract || !account) {
            return
        }
        
        try {
            const balanceWei = await contract.balanceOf(account)
            const balanceEther = ethers.formatEther(balanceWei)
            setBalance(balanceEther)
        } catch (error) {
            setBalance('0')
        }
    }, [contract, account])

    const checkClaimed = useCallback(async () => {
        if (!contract || !account) {
            return
        }
        
        try {
            const claimed = await contract.hasClaimedToken(account)
            setHasClaimed(claimed)
        } catch (error) {
            setHasClaimed(false)
        }
    }, [contract, account])

    const getInitialTokens = async () => {
        if (!contract || !account) return
        setLoading(true)
        try {
            const tx = await contract.claimDefaultToken()
            await tx.wait()
            alert("3 LDT를 받았습니다!")
            updateBalance()
            checkClaimed()
        } catch (error) {
            alert("토큰 받기 실패: " + error.message)
        }
        setLoading(false)
    }

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