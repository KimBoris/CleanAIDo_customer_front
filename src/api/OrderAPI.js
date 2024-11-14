import axios from 'axios';

const host = 'http://localhost:8080/api/v1/order';

export const createOrder = (orderData) => {
    return axios.post(`${host}/create`, orderData);
};

export const fetchOrders = (customerId) => {
    return axios.get(`${host}/list`, {
        params: { customerId }
    });
};

export const updateOrderStatus = (orderNumber, status) => {
    return axios.patch(`${host}/${orderNumber}/status`, null, {
        params: { status }
    });
};
