import axios from 'axios';

const host = 'http://localhost:8080/api/v1/mypage/order';

// 고객 주문 목록 조회 API
export const fetchOrders = (customerId) => {
    return axios.get(`${host}/list`, {
        params: { customerId }
    });
};

// 주문 상태 업데이트 API
export const updateOrderStatus = (orderNumber, status) => {
    return axios.patch(`${host}/${orderNumber}/status`, null, {
        params: { status }
    });
};

// 주문 생성 API
export const createOrder = (orderData) => {
    return axios.post(`${host}/create`, orderData);
};
