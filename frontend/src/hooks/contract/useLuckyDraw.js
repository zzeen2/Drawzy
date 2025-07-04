import { useState, useCallback } from 'react'

const useLuckyDraw = (wallet) => {
    const { contract, account } = wallet
    const [categoryCounts, setCategoryCounts] = useState([0, 0, 0, 0, 0, 0])
    const [loading, setLoading] = useState(false)
    const [allCoupons, setAllCoupons] = useState([])
    const [totalCouponsCount, setTotalCouponsCount] = useState(0)
    const [totalCouponsValue, setTotalCouponsValue] = useState(0)
    const [remainingCouponsCount, setRemainingCouponsCount] = useState(0)
    const [remainingCouponsValue, setRemainingCouponsValue] = useState(0)
    const [recentEvents, setRecentEvents] = useState([])

    // 뽑기 실행
    const drawCoupon = async (category) => {
        if (!contract || !account) return null
        setLoading(true)
        try {
            const tx = await contract.drawCoupon(category)
            const receipt = await tx.wait()
            
            let couponWonEvent = null
            
            if (receipt.events) {
                couponWonEvent = receipt.events.find(event => event.event === 'CouponWon')
            }
            
            if (!couponWonEvent && receipt.logs) {
                for (const log of receipt.logs) {
                    try {
                        const parsedLog = contract.interface.parseLog(log)
                        if (parsedLog && parsedLog.name === 'CouponWon') {
                            couponWonEvent = {
                                event: parsedLog.name,
                                args: parsedLog.args
                            }
                            break
                        }
                    } catch (parseError) {
                    }
                }
            }
            
            if (couponWonEvent) {
                const { couponCode, name, category: wonCategory } = couponWonEvent.args
                
                addDrawActivity(Number(wonCategory), name)
                
                const myCoupons = await contract.getMyCoupons()
                const lastCoupon = myCoupons[myCoupons.length - 1]
                
                setTimeout(() => {
                    getRecentEvents()
                }, 2000)
                
                return {
                    name: lastCoupon.name,
                    code: lastCoupon.couponCode,
                    description: lastCoupon.description,
                    category: Number(lastCoupon.category),
                    realPrice: Number(lastCoupon.realPrice)
                }
            }
            
            alert("뽑기 완료! 내 쿠폰에서 확인하세요!")
            return null
        } catch (error) {
            alert("뽑기 실패: " + error.message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    // 카테고리별 상품 개수 조회
    const getAllCategoryCounts = useCallback(async () => {
        if (!contract) {
            return
        }
        
        try {
            const result = await contract.getAllCategoryCount()
            
            const counts = [
                Number(result[0]),
                Number(result[1]),
                Number(result[2]),
                Number(result[3]),
                Number(result[4]),
                Number(result[5])
            ]
            
            setCategoryCounts(counts)
        } catch (error) {
            setCategoryCounts([0, 0, 0, 0, 0, 0])
        }
    }, [contract])

    // 전체 플랫폼 쿠폰 데이터 조회 (모든 카테고리)
    const getAllPlatformCoupons = useCallback(async () => {
        if (!contract) {
            return
        }
        
        try {
            const allRegisteredCoupons = await contract.getAllRegisteredCoupons()
            const [totalCount, totalValue] = await contract.getTotalStats()
            
            const formattedCoupons = allRegisteredCoupons.map(item => ({
                name: item.name,
                couponCode: item.couponCode,
                description: item.description,
                realPrice: Number(item.realPrice),
                category: Number(item.category),
                seller: item.seller,
                timestamp: Number(item.timestamp) * 1000
            }))
            
            setAllCoupons(formattedCoupons)
            setTotalCouponsCount(Number(totalCount))
            setTotalCouponsValue(Number(totalValue))
            
            return {
                coupons: formattedCoupons,
                totalCount: Number(totalCount),
                totalValue: Number(totalValue)
            }
        } catch (error) {
            setAllCoupons([])
            setTotalCouponsCount(0)
            setTotalCouponsValue(0)
        }
    }, [contract])

    // 남아있는 쿠폰들의 가치 계산
    const getRemainingCouponsStats = useCallback(async () => {
        if (!contract) {
            return
        }
        
        try {
            let remainingCount = 0
            let remainingValue = 0
            
            for (let category = 1; category <= 6; category++) {
                try {
                    const categoryItems = await contract.getCategoryItems(category)
                    remainingCount += categoryItems.length
                    
                    for (const item of categoryItems) {
                        remainingValue += Number(item.realPrice)
                    }
                } catch (categoryError) {
                }
            }
            
            setRemainingCouponsCount(remainingCount)
            setRemainingCouponsValue(remainingValue)
            
            return { remainingCount, remainingValue }
        } catch (error) {
            setRemainingCouponsCount(0)
            setRemainingCouponsValue(0)
        }
    }, [contract])

    // 수동으로 뽑기 활동 추가
    const addDrawActivity = useCallback((category, name) => {
        const newActivity = {
            type: 'draw',
            text: `누군가 ${category} LDT 쿠폰을 뽑았습니다!`,
            name: name,
            category: Number(category),
            timestamp: Date.now(),
            blockNumber: 'latest'
        }
        
        setRecentEvents(prev => [newActivity, ...prev])
    }, [])

    // 최근 이벤트 조회 (등록 + 뽑기)
    const getRecentEvents = useCallback(async () => {
        if (!contract) {
            return []
        }
        
        const provider = contract.provider || contract.runner?.provider
        if (!provider) {
            return []
        }
        
        try {
            let currentBlock, fromBlock
            
            try {
                currentBlock = await provider.getBlockNumber()
                fromBlock = Math.max(0, currentBlock - 5000)
            } catch (blockError) {
                fromBlock = 'earliest'
            }
            
            const allEvents = []
            
            try {
                const couponAddedFilter = contract.filters.CouponAdded()
                const couponAddedEvents = await contract.queryFilter(couponAddedFilter, fromBlock)
                
                for (const event of couponAddedEvents) {
                    try {
                        const block = await event.getBlock()
                        allEvents.push({
                            type: 'register',
                            text: `새로운 ${event.args.category} LDT 쿠폰이 등록되었습니다!`,
                            name: event.args.name,
                            category: Number(event.args.category),
                            timestamp: block.timestamp * 1000,
                            blockNumber: event.blockNumber
                        })
                    } catch (blockError) {
                        allEvents.push({
                            type: 'register',
                            text: `새로운 ${event.args.category} LDT 쿠폰이 등록되었습니다!`,
                            name: event.args.name,
                            category: Number(event.args.category),
                            timestamp: Date.now(),
                            blockNumber: event.blockNumber
                        })
                    }
                }
            } catch (addedError) {
            }
            
            try {
                const couponWonFilter = contract.filters.CouponWon()
                const couponWonEvents = await contract.queryFilter(couponWonFilter, fromBlock)
                
                for (const event of couponWonEvents) {
                    try {
                        const block = await event.getBlock()
                        const eventData = {
                            type: 'draw',
                            text: `누군가 ${event.args.category} LDT 쿠폰을 뽑았습니다!`,
                            name: event.args.name,
                            category: Number(event.args.category),
                            timestamp: block.timestamp * 1000,
                            blockNumber: event.blockNumber
                        }
                        
                        allEvents.push(eventData)
                    } catch (blockError) {
                        const eventData = {
                            type: 'draw',
                            text: `누군가 ${event.args.category} LDT 쿠폰을 뽑았습니다!`,
                            name: event.args.name,
                            category: Number(event.args.category),
                            timestamp: Date.now(),
                            blockNumber: event.blockNumber
                        }
                        allEvents.push(eventData)
                    }
                }
            } catch (wonError) {
            }
            
            const sortedEvents = allEvents.sort((a, b) => b.timestamp - a.timestamp)
            
            setRecentEvents(sortedEvents)
            return sortedEvents
        } catch (error) {
            return []
        }
    }, [contract])

    return {
        categoryCounts,
        loading,
        allCoupons,
        totalCouponsCount,
        totalCouponsValue,
        remainingCouponsCount,
        remainingCouponsValue,
        recentEvents,
        drawCoupon,
        getAllCategoryCounts,
        getAllPlatformCoupons,
        getRemainingCouponsStats,
        getRecentEvents,
        addDrawActivity
    }
}

export default useLuckyDraw 