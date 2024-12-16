import axios from "axios";
import useAuthStore from "../store/authStore.js";

const API_URL = "http://localhost:8080/api/v1/cart";

// 장바구니 목록 조회
export const getCartList = async () => {
    const { accessToken } = useAuthStore.getState();
    const response = await axios.get(`${API_URL}/list`, {
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    });
    return response.data;
};

// 장바구니 항목 삭제
export const deleteCart = async (cdno) => {
    const { accessToken } = useAuthStore.getState();
    const response = await axios.delete(`${API_URL}/${cdno}`, {
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    });
    return response.data;
};

// 장바구니 수량 업데이트
export const updateQty = async (cdno, quantity) => {
    const { accessToken } = useAuthStore.getState();
    const response = await axios.patch(
        `${API_URL}/${cdno}/quantity`,
        null,
        {
            params: { quantity },
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
        }
    );
    return response.data;
};

// 장바구니 항목 추가

export const addCartItem = async (productId, quantity) => {
    const { accessToken } = useAuthStore.getState();
    const response = await axios.post(
        `${API_URL}/add`,
        null,
        {
            params: { productId, quantity },
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
        }
    );
    return response.data;
};
