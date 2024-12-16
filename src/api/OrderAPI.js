import axios from 'axios';
import useAuthStore from "../store/authStore.js";

const host = 'http://localhost:8080/api/v1/mypage/order';

// 고객 주문 목록 조회 API
export const fetchOrders = (customerId) => {
    const { accessToken } = useAuthStore.getState();
    return axios.get(`${host}/list`, {
        params: { customerId },
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
        },
    });
};

// 주문 상태 업데이트 API
export const updateOrderStatus = (orderNumber, status) => {
    const { accessToken } = useAuthStore.getState();
    return axios.patch(`${host}/${orderNumber}/status`, null, {
        params: { status },
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
        },
    });
};

// 주문 생성 API
export const createOrder = (orderData) => {
    const { accessToken } = useAuthStore.getState();
    return axios.post(`${host}/create`, orderData, {
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
        },
    });
};

export const preParePayment = (totalPrice) => {
    const { accessToken } = useAuthStore.getState();
    console.log("Access Token:", accessToken); // 토큰 확인

    return axios.post(`${host}/pay/ready`, null, {
        params: { totalPrice },
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
        },
    });
};



