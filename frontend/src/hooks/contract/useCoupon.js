import { useState, useCallback } from 'react'

const useCoupon = (wallet) => {
    const { contract, account } = wallet
    const [myCoupons, setMyCoupons] = useState([])
    const [loading, setLoading] = useState(false)

    // 쿠폰 등록
    const addCoupon = async (name, code, description, price) => {
        if (!contract || !account) return false
        setLoading(true)
        try {
            const tx = await contract.addCoupon(name, code, description, price)
            console.log("쿠폰 등록 트랜잭션:", tx.hash)
            await tx.wait()
            alert("쿠폰이 등록되었습니다!")
            return true
        } catch (error) {
            console.error("쿠폰 등록 실패:", error)
            alert("쿠폰 등록 실패: " + error.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    // 내 쿠폰 조회
    const getMyCoupons = useCallback(async () => {
        if (!contract || !account) return
        setLoading(true)
        try {
            const coupons = await contract.getMyCoupons()
            setMyCoupons(coupons)
        } catch (error) {
            console.error("쿠폰 조회 실패:", error)
        }
        setLoading(false)
    }, [contract, account])

    return {
        myCoupons,
        loading,
        addCoupon,
        getMyCoupons
    }
}

export default useCoupon 