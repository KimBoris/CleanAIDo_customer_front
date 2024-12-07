import useOrderStore from '../../store/useOrderStore.js';
import { createOrder } from '../../api/OrderAPI.js';
import { useNavigate } from 'react-router-dom';
import React from "react";

const OrderCompleteComponent = () => {
    const navigate = useNavigate();

    // Zustand 상태 선택 및 확인
    const purchasedDTO = useOrderStore((state) => {
        console.log("---------------------------")
        console.log("=======================")
        console.log(state)
        return state.purchasedDTO
    });

    const handleCreateOrder = async () => {
        try {
            if (purchasedDTO) {
                console.log('현재 purchasedDTO:', purchasedDTO);
                await createOrder(purchasedDTO);
                console.log('주문이 성공적으로 생성되었습니다');
            } else {
                console.error('purchaseDTO가 없습니다.');
                // 필요하다면 이전 페이지나 홈으로 리다이렉트
                navigate('/');
            }
        } catch (error) {
            console.error('주문 생성 중 오류 발생:', error.message);
        }
    };

    React.useEffect(() => {
        console.log("completepage에 들어왔습니다.");
        console.log('초기 purchasedDTO:', purchasedDTO);

        (async () => {
            await handleCreateOrder();
        })();
    }, []);

    return (
        <div className="text-center mt-6">
            <p className="text-bara_gray-5 font-medium mb-4">주문이 성공적으로 완료되었습니다!</p>
            <div className="flex space-x-4">
                <button
                    onClick={() => navigate('/mypage/order/list')}
                    className="w-full py-4 bg-bara_light_blue text-white rounded-[0.5rem] text-sm font-medium"
                >
                    주문 내역 보러가기
                </button>
                <button
                    onClick={() => navigate('/product/list')}
                    className="w-full py-4 bg-bara_sky_blue text-white rounded-[0.5rem] text-sm font-medium"
                >
                    상품 보러가기
                </button>
            </div>
        </div>
    );
};

export default OrderCompleteComponent;