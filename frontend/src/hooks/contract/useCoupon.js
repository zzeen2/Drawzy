import { useState, useCallback } from 'react'

const useCoupon = (wallet) => {
    const { contract, account } = wallet
    const [myCoupons, setMyCoupons] = useState([])
    const [loading, setLoading] = useState(false)

    const addCoupon = async (name, code, description, price) => {
        if (!contract || !account) return false
        setLoading(true)
        try {
            const tx = await contract.addCoupon(name, code, description, price)
            await tx.wait()
            alert("쿠폰이 등록되었습니다!")
            return true
        } catch (error) {
            alert("쿠폰 등록 실패: " + error.message)
            return false
        } finally {
            setLoading(false)
        }
    }

    const registerCoupon = async (name, description, category, code, value) => {
        return await addCoupon(name, code, description, value)
    }

    const getMyCoupons = useCallback(async () => {
        if (!contract || !account) {
            return
        }
        
        setLoading(true)
        try {
            const coupons = await contract.getMyCoupons()
            
            const safeCoupons = coupons.map(coupon => ({
                name: coupon.name,
                code: coupon.couponCode,
                description: coupon.description,
                realPrice: typeof coupon.realPrice === 'bigint' 
                    ? Number(coupon.realPrice) 
                    : coupon.realPrice || 0,
                category: typeof coupon.category === 'bigint'
                    ? Number(coupon.category)
                    : coupon.category || 1,
                drawDate: Date.now()
            }))
            
            setMyCoupons(safeCoupons)
            
            if (safeCoupons.length === 0) {
                setMyCoupons([])
            }
        } catch (error) {
            setMyCoupons([])
        }
        setLoading(false)
    }, [contract, account])

    const useCoupon = useCallback(async (couponIndex) => {
        if (!contract || !account) {
            throw new Error('지갑이 연결되지 않았습니다.')
        }

        try {
            const tx = await contract.useCoupon(couponIndex)
            await tx.wait()
        } catch (error) {
            throw error
        }
    }, [contract, account])

    return {
        myCoupons,
        loading,
        addCoupon,
        registerCoupon,
        getMyCoupons,
        useCoupon
    }
}

export default useCoupon 