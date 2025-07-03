import React, { useState } from 'react'
import { useWallet, useToken, useCoupon, useLuckyDraw } from './hooks'

function App() {
    const wallet = useWallet()
    const { account, connectWallet, isNetwork } = wallet
    const { balance, loading: tokenLoading, hasClaimed, getInitialTokens, updateBalance } = useToken(wallet)
    const { myCoupons, loading: couponLoading, addCoupon, getMyCoupons } = useCoupon(wallet)
    const { categoryCounts, loading: drawLoading, drawCoupon, getAllCategoryCounts } = useLuckyDraw(wallet)

    // 쿠폰 등록 폼 상태
    const [couponForm, setCouponForm] = useState({
        name: '',
        code: '',
        description: '',
        price: ''
    })

    const handleInputChange = (e) => {
        setCouponForm({
            ...couponForm,
            [e.target.name]: e.target.value
        })
    }

    const handleAddCoupon = async () => {
        const success = await addCoupon(
            couponForm.name,
            couponForm.code,
            couponForm.description,
            couponForm.price
        )

        if (success) {
            getAllCategoryCounts()
        }

        setCouponForm({ name: '', code: '', description: '', price: '' })
    }

    const handleDraw = (category) => {
        drawCoupon(category)
    }

    return (
        <div style={{padding: '20px', fontFamily: 'Arial'}}>
            <h1>🎲 LuckyDraw Token 테스트</h1>
            
            {/* 지갑 연결 */}
            <div style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
                <h2> 지갑</h2>
                {account ? (
                    <div>
                        <p> 연결됨: {account}</p>
                        <p> 네트워크: {isNetwork ? 'Sepolia' : '❌ 잘못된 네트워크'}</p>
                        <p> 잔액: {balance} LDT</p>
                        <button onClick={updateBalance}>잔액 새로고침</button>
                    </div>
                ) : (
                    <div>
                        <p> 지갑이 연결되지 않음</p>
                        <button onClick={connectWallet}>지갑 연결</button>
                    </div>
                )}
            </div>

            {/* 토큰 받기 */}
            <div style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
                <h2> 토큰 받기</h2>
                <button 
                    onClick={getInitialTokens} 
                    disabled={tokenLoading || !account || hasClaimed}
                >
                    {tokenLoading 
                        ? '처리중...' 
                        : hasClaimed 
                            ? '이미 수령함' 
                            : '3 LDT 받기'}
                </button>
            </div>

            {/* 쿠폰 등록 */}
            <div style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
                <h2>쿠폰 등록</h2>
                <div>
                    <input 
                        name="name"
                        placeholder="쿠폰명" 
                        value={couponForm.name}
                        onChange={handleInputChange}
                    />
                    <input 
                        name="code"
                        placeholder="쿠폰코드" 
                        value={couponForm.code}
                        onChange={handleInputChange}
                    />
                    <input 
                        name="description"
                        placeholder="설명" 
                        value={couponForm.description}
                        onChange={handleInputChange}
                    />
                    <input 
                        name="price"
                        type="number"
                        placeholder="가격(원)" 
                        value={couponForm.price}
                        onChange={handleInputChange}
                    />
                    <button 
                        onClick={handleAddCoupon}
                        disabled={couponLoading || !account}
                    >
                        {couponLoading ? '등록중...' : '쿠폰 등록'}
                    </button>
                </div>
            </div>

            {/* 카테고리 현황 */}
            <div style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
                <h2> 카테고리 현황</h2>
                <button onClick={getAllCategoryCounts}>현황 새로고침</button>
                <div>
                    {[1,2,3,4,5,6].map(category => (
                        <p key={category}>
                            카테고리 {category}: {categoryCounts[category-1] || 0}개
                        </p>
                    ))}
                </div>
            </div>

            {/* 랜덤 뽑기 */}
            <div style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
                <h2> 랜덤 뽑기</h2>
                <div>
                    {[1,2,3,4,5,6].map(category => (
                        <div key={category} style={{margin: '5px 0'}}>
                            <button 
                                onClick={() => handleDraw(category)}
                                disabled={drawLoading || !account}
                            >
                                {drawLoading ? '뽑는중...' : `${category} LDT 뽑기`}
                            </button>
                            <span> (가격대: {category === 1 ? '~5천원' : category === 2 ? '5-1만원' : category === 3 ? '1-1.5만원' : category === 4 ? '1.5-2만원' : category === 5 ? '2-2.5만원' : '2.5만원+'})</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 내 쿠폰 */}
            <div style={{border: '1px solid #ccc', padding: '10px', margin: '10px 0'}}>
                <h2> 내 쿠폰</h2>
                <button onClick={getMyCoupons}>내 쿠폰 조회</button>
                <div>
                    {myCoupons.length > 0 ? (
                        myCoupons.map((coupon, index) => (
                            <div key={index} style={{border: '1px solid #eee', padding: '5px', margin: '5px 0'}}>
                                <h4>{coupon.name}</h4>
                                <p>코드: {coupon.couponCode}</p>
                                <p>설명: {coupon.description}</p>
                                <p>가격: {coupon.realPrice}원</p>
                            </div>
                        ))
                    ) : (
                        <p>보유한 쿠폰이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
