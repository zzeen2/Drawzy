import { useState, useCallback } from 'react'

const useLuckyDraw = (wallet) => {
    const { contract, account } = wallet
    const [categoryCounts, setCategoryCounts] = useState([0, 0, 0, 0, 0, 0])
    const [loading, setLoading] = useState(false)

    // 뽑기 실행
    const drawCoupon = async (category) => {
        if (!contract || !account) return
        setLoading(true)
        try {
            const tx = await contract.drawCoupon(category)
            console.log("뽑기 트랜잭션:", tx.hash)
            await tx.wait()
            alert("뽑기 완료! 내 쿠폰에서 확인하세요!")
        } catch (error) {
            console.error("뽑기 실패:", error)
            alert("뽑기 실패: " + error.message)
        }
        setLoading(false)
    }

    // 카테고리별 상품 개수 조회
    const getAllCategoryCounts = useCallback(async () => {
        if (!contract) return
        try {
            const counts = await contract.getAllCategoryCount()
            setCategoryCounts(counts.map(count => Number(count)))
        } catch (error) {
            console.error("카테고리 개수 조회 실패:", error)
        }
    }, [contract])

    return {
        categoryCounts,
        loading,
        drawCoupon,
        getAllCategoryCounts
    }
}

export default useLuckyDraw 